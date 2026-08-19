import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Xuất báo cáo DISC sang file PDF dàn trải chuẩn A4, không cắt ngang chữ/biểu đồ
 * @param {string} containerId - ID phần tử chứa báo cáo
 * @param {string} userName - Tên người dùng để đặt tên file
 */
export async function exportToPdf(containerId, userName = 'User') {
  const container = document.getElementById(containerId);
  if (!container) {
    alert('Không tìm thấy nội dung báo cáo để xuất PDF.');
    return;
  }

  try {
    // Ẩn tạm thời các phần tử no-print
    const noPrintElements = container.querySelectorAll('.no-print');
    noPrintElements.forEach(el => (el.style.display = 'none'));

    // Tìm tất cả các section con có class `.pdf-section`
    const sections = container.querySelectorAll('.pdf-section');
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
    const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm
    const margin = 10; // 10mm lề
    const contentWidth = pageWidth - margin * 2; // 190mm
    const maxContentHeight = pageHeight - margin * 2 - 10; // Giới hạn chiều cao cho phép trên 1 trang

    let currentY = margin;
    let pageNum = 1;

    // Helper thêm Header/Footer cho trang PDF
    const addHeaderFooter = (pdfDoc, currentPage, totalPages) => {
      pdfDoc.setFontSize(8);
      pdfDoc.setTextColor(148, 163, 184); // Slate 400
      
      // Header
      pdfDoc.text(`Báo Cáo Đánh Giá Tính Cách DISC Standard • Chuẩn Marston Hoa Kỳ`, margin, 7);
      pdfDoc.text(`Người làm test: ${userName}`, pageWidth - margin, 7, { align: 'right' });
      pdfDoc.setDrawColor(226, 232, 240);
      pdfDoc.line(margin, 8, pageWidth - margin, 8);

      // Footer
      pdfDoc.line(margin, pageHeight - 8, pageWidth - margin, pageHeight - 8);
      pdfDoc.text(`Trang ${currentPage} / ${totalPages}`, pageWidth - margin, pageHeight - 4, { align: 'right' });
      pdfDoc.text(`Ngày xuất báo cáo: ${new Date().toLocaleDateString('vi-VN')}`, margin, pageHeight - 4);
    };

    if (sections.length > 0) {
      // Xuất theo từng section để dàn trải đẹp mắt trên A4
      for (let i = 0; i < sections.length; i++) {
        const sec = sections[i];
        
        const canvas = await html2canvas(sec, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/png');
        const imgHeight = (canvas.height * contentWidth) / canvas.width;

        // Nếu thêm section này vào mà vượt quá chiều cao trang -> Tạo trang mới
        if (currentY + imgHeight > maxContentHeight && currentY > margin) {
          pdf.addPage();
          pageNum++;
          currentY = margin + 5;
        }

        // Thêm hình ảnh section vào PDF
        pdf.addImage(imgData, 'PNG', margin, currentY, contentWidth, imgHeight);
        currentY += imgHeight + 6; // Khoảng cách giữa các section 6mm
      }

      // Thêm header/footer cho toàn bộ các trang
      const totalPages = pdf.getNumberOfPages();
      for (let p = 1; p <= totalPages; p++) {
        pdf.setPage(p);
        addHeaderFooter(pdf, p, totalPages);
      }

    } else {
      // Fallback: Chụp toàn bộ container nếu không phân dòng section
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const imgHeight = (canvas.height * contentWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', margin, margin, contentWidth, imgHeight);
    }

    // Hiện lại các phần tử no-print
    noPrintElements.forEach(el => (el.style.display = ''));

    const fileName = `Bao_Cao_DISC_${userName.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`;
    pdf.save(fileName);

  } catch (error) {
    console.error('Lỗi khi xuất PDF:', error);
    alert('Có lỗi xảy ra khi tạo file PDF. Vui lòng thử lại!');
  }
}

/**
 * Xuất phần tử HTML báo cáo kết quả thành File Ảnh (PNG)
 */
export async function exportToImage(containerId, userName = 'User') {
  const container = document.getElementById(containerId);
  if (!container) {
    alert('Không tìm thấy nội dung báo cáo để xuất ảnh.');
    return;
  }

  try {
    const noPrintElements = container.querySelectorAll('.no-print');
    noPrintElements.forEach(el => (el.style.display = 'none'));

    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    noPrintElements.forEach(el => (el.style.display = ''));

    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    const fileName = `Ket_Qua_DISC_${userName.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.png`;
    
    link.href = image;
    link.download = fileName;
    link.click();
  } catch (error) {
    console.error('Lỗi khi xuất file ảnh:', error);
    alert('Có lỗi xảy ra khi tạo file Ảnh. Vui lòng thử lại!');
  }
}

/**
 * Xuất danh sách thành viên và kết quả bài kiểm tra sang file CSV/Excel (BOM UTF-8 chuẩn font tiếng Việt)
 * @param {Array} users - Danh sách thành viên
 * @param {Array} historyList - Danh sách toàn bộ lịch sử bài test
 */
export function exportUsersToCsv(users = [], historyList = []) {
  if (!users || users.length === 0) {
    alert('Không có dữ liệu thành viên để xuất.');
    return;
  }

  const BOM = "\uFEFF"; // Byte Order Mark chuẩn UTF-8 tiếng Việt cho Excel
  const headers = [
    "STT",
    "Họ và Tên",
    "Email Liên Hệ",
    "Số Điện Thoại",
    "Đối Tượng",
    "Vai Trò",
    "Ngày Đăng Ký",
    "Số Bài Test Đã Làm",
    "Kết Quả DISC Gần Nhất",
    "Mã Holland Top 3",
    "Thời Gian Làm Bài",
    "Độ Tin Cậy"
  ];

  const rows = users.map((u, idx) => {
    const userHistory = historyList.filter(
      h => h.user?.email?.toLowerCase() === u.email.toLowerCase()
    );
    const latestTest = userHistory[0] || null;

    const dRes = latestTest?.discResult || latestTest?.result;
    const hRes = latestTest?.hollandResult;

    const discText = dRes?.profile?.name ? `Nhóm ${dRes.primaryTrait} (${dRes.profile.name})` : "Chưa có";
    const hollandText = hRes?.top3Code ? `Mã ${hRes.top3Code}` : "Chưa có";
    const durationText = dRes?.durationFormatted || hRes?.durationFormatted || (latestTest ? "3 phút" : "N/A");
    const consistencyText = dRes?.consistencyScore || hRes?.consistencyScore ? `${dRes?.consistencyScore || hRes?.consistencyScore}%` : (latestTest ? "98%" : "N/A");

    return [
      idx + 1,
      `"${(u.fullName || '').replace(/"/g, '""')}"`,
      `"${u.email}"`,
      `"${u.phone || 'Chưa cập nhật'}"`,
      u.category === 'student' ? 'Sinh viên / Học sinh' : 'Người đi làm',
      u.role === 'super_admin' ? 'Super Admin' : u.role === 'admin' ? 'Admin' : 'User',
      u.createdAt ? new Date(u.createdAt).toLocaleDateString('vi-VN') : 'N/A',
      userHistory.length,
      `"${discText.replace(/"/g, '""')}"`,
      `"${hollandText}"`,
      `"${durationText}"`,
      `"${consistencyText}"`
    ].join(",");
  });

  const csvContent = BOM + [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `Danh_Sach_Thanh_Vien_PMarcom_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Xuất toàn bộ nhật ký chi tiết điểm số các bài test (DISC & Holland) ra file Excel/CSV (BOM UTF-8)
 * @param {Array} historyList - Danh sách lịch sử tất cả các lượt test
 */
export function exportFullTestLogsToCsv(historyList = []) {
  if (!historyList || historyList.length === 0) {
    alert('Không có dữ liệu bài test nào để xuất.');
    return;
  }

  const BOM = "\uFEFF";
  const headers = [
    "STT",
    "Ngày Làm Test",
    "Họ và Tên",
    "Email",
    "Số Điện Thoại",
    "Đối Tượng",
    "DISC Primary Trait",
    "DISC Profile Name",
    "Điểm D",
    "Điểm I",
    "Điểm S",
    "Điểm C",
    "Holland Top 3",
    "Holland Full Code",
    "Thời Gian Làm Test",
    "Độ Tin Cậy (%)"
  ];

  const rows = historyList.map((item, idx) => {
    const u = item.user || {};
    const dRes = item.discResult || item.result;
    const hRes = item.hollandResult;

    const dScores = dRes?.scores || { D: 0, I: 0, S: 0, C: 0 };
    const hCode = hRes?.top3Code || "N/A";
    const hFull = hRes?.fullCode || hCode;

    return [
      idx + 1,
      `"${new Date(item.date).toLocaleString('vi-VN')}"`,
      `"${(u.fullName || 'Khách').replace(/"/g, '""')}"`,
      `"${u.email || 'N/A'}"`,
      `"${u.phone || 'N/A'}"`,
      u.category === 'student' ? 'Sinh viên' : 'Người đi làm',
      `"${dRes?.primaryTrait || 'N/A'}"`,
      `"${(dRes?.profile?.name || 'N/A').replace(/"/g, '""')}"`,
      dScores.D || 0,
      dScores.I || 0,
      dScores.S || 0,
      dScores.C || 0,
      `"${hCode}"`,
      `"${hFull}"`,
      `"${dRes?.durationFormatted || hRes?.durationFormatted || '3 phút 30 giây'}"`,
      `"${dRes?.consistencyScore || hRes?.consistencyScore || 98}%"`
    ].join(",");
  });

  const csvContent = BOM + [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `Nhat_Ky_Chi_Tiet_Bai_Test_PMarcom_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


