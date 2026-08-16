import { execSync } from 'child_process';

/**
 * Tự động Commit & Push mã nguồn lên GitHub Public Repository
 */
function autoPushToGithub() {
  console.log('🚀 Đang kiểm tra và tự động đồng bộ mã nguồn lên GitHub...');

  try {
    // 1. Git add
    execSync('git add .', { stdio: 'inherit' });

    // 2. Kiểm tra có thay đổi không
    const status = execSync('git status --porcelain').toString();
    if (!status.trim()) {
      console.log('✅ Mã nguồn đã mới nhất. Không có thay đổi nào cần push.');
      return;
    }

    // 3. Git commit với timestamp
    const timestamp = new Date().toLocaleString('vi-VN');
    const commitMessage = `Auto-update: ${timestamp} - P Marcom Career Platform`;
    
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });

    // 4. Git push lên branch master
    execSync('git push origin master', { stdio: 'inherit' });

    console.log('🎉 ĐÃ TỰ ĐỘNG PUSH THÀNH CÔNG LÊN GITHUB!');
    console.log('🔗 Link Repo: https://github.com/hoangtau996-collab/pmarcom-career-orientation-disc-holland');

  } catch (error) {
    console.error('❌ Lỗi khi tự động push lên GitHub:', error.message);
  }
}

autoPushToGithub();
