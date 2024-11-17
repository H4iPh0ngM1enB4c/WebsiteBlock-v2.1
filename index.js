const fs = require('fs');
const readline = require('readline');
const chalk = require('chalk');

// Tạo interface để nhận đầu vào từ người dùng
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Đường dẫn tới tệp hosts trên Windows
const hostsFilePath = 'C:/Windows/System32/drivers/etc/hosts';

// Hàm chặn trang web
function blockWebsite(website) {
  // Kiểm tra nếu tên trang web hợp lệ
  if (!website) {
    console.log(chalk.red('Vui lòng nhập tên trang web.'));
    return;
  }

  // Đọc tệp hosts để kiểm tra nếu trang web đã có
  fs.readFile(hostsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.log(chalk.red('Lỗi khi đọc tệp hosts. Bạn cần quyền Administrator.'));
      return;
    }

    // Kiểm tra nếu trang web đã bị chặn
    if (data.includes(website)) {
      console.log(chalk.green(`Trang web "${website}" đã bị chặn.`));
    } else {
      // Thêm dòng vào tệp hosts để chặn trang web
      const lineToAdd = `127.0.0.1 ${website}\n`;

      fs.appendFile(hostsFilePath, lineToAdd, (err) => {
        if (err) {
          console.log(chalk.red('Lỗi khi thêm trang web vào tệp hosts. Bạn cần quyền Administrator.'));
        } else {
          console.log(chalk.green(`Đã chặn trang web: ${website}`));
        }
      });
    }
  });
}

// Hàm gỡ chặn trang web
function unblockWebsite(website) {
  // Kiểm tra nếu tên trang web hợp lệ
  if (!website) {
    console.log(chalk.red('Vui lòng nhập tên trang web.'));
    return;
  }

  // Đọc tệp hosts để kiểm tra nếu trang web có trong đó
  fs.readFile(hostsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.log(chalk.red('Lỗi khi đọc tệp hosts. Bạn cần quyền Administrator.'));
      return;
    }

    // Kiểm tra nếu trang web đã bị chặn
    if (!data.includes(website)) {
      console.log(chalk.yellow(`Trang web "${website}" chưa bị chặn.`));
    } else {
      // Xóa dòng khỏi tệp hosts để gỡ chặn trang web
      const newData = data.replace(`127.0.0.1 ${website}\n`, '');
      
      fs.writeFile(hostsFilePath, newData, (err) => {
        if (err) {
          console.log(chalk.red('Lỗi khi gỡ chặn trang web từ tệp hosts. Bạn cần quyền Administrator.'));
        } else {
          console.log(chalk.green(`Đã gỡ chặn trang web: ${website}`));
        }
      });
    }
  });
}

// Hàm hiển thị menu cho người dùng lựa chọn
function showMenu() {
console.log(chalk.cyan('------------------------------------------------------------------------------------------------------------------------'));
console.log(chalk.blue('                       App được phát triển bởi @Slowmotion.0 | info: guns.lol/slowmotion.0                          ')); 
console.log(chalk.cyan('------------------------------------------------------------------------------------------------------------------------'));
console.log('');
  console.log(chalk.bgBlue.white('--- Ứng dụng Chặn Trang Web/Gỡ Chặn Trang Web ---\n'));
  console.log(chalk.bgBlue.white('---             Theo Yêu Cầu Của Bạn          ---\n'));

  rl.question(chalk.cyan("Bạn muốn thực hiện thao tác nào? (1 - Chặn, 2 - Gỡ chặn): "), (action) => {
    if (action === '1' || action.toLowerCase() === 'chặn') {
      rl.question(chalk.cyan("Nhập tên trang web bạn muốn chặn: "), (website) => {
        blockWebsite(website);  // Gọi hàm chặn trang web
      });
    } else if (action === '2' || action.toLowerCase() === 'gỡ chặn') {
      rl.question(chalk.cyan("Nhập tên trang web bạn muốn gỡ chặn: "), (website) => {
        unblockWebsite(website);  // Gọi hàm gỡ chặn trang web
      });
    } else {
      console.log(chalk.red("Lựa chọn không hợp lệ. Vui lòng chọn 1 hoặc 2."));
    }
  });
}
// Yêu cầu người dùng nhấn một phím bất kỳ để thoát
function waitForExit() {
  rl.question(chalk.magenta('Nhấn Enter để thoát...'), () => {
    rl.close();
  });
}

// Gọi hàm để hiển thị menu khi bắt đầu
showMenu();
waitForExit();  // Thêm yêu cầu nhấn Enter để thoát