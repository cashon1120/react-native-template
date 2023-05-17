const fs = require('fs');
const child_process = require('child_process');
const chalk = require('chalk');
let androidFile = fs.readFileSync('./android/app/build.gradle', {
  encoding: 'utf8',
});
const reg = /versionName ".+"/;

const getSize = async filepath => {
  const info = await fs.promises.stat(filepath);
  const size = info.size;
  return Math.ceil(size / 1024 / 1024);
};

let version = androidFile.match(reg);
if (version) {
  version = version[0].split(' ')[1].replace(/"/g, '');
  const filePath = './android/app/build/outputs/apk/release/';
  fs.rename(
    `${filePath}app-arm64-v8a-release.apk`,
    `${filePath}${version}.apk`,
    err => {
      if (err) {
        console.log(chalk.red('重命名文件出错'));
      } else {
        getSize(`${filePath}${version}.apk`).then(res => {
          console.log(
            chalk.green(`√ 打包成功, 版本号: ${version}, 文件大小: ${res}MB`),
          );
        });
      }
    },
  );
  child_process.exec('open ./android/app/build/outputs/apk/release/');
} else {
  console.log(chalk.red('版本号读取出错,请核对'));
}
