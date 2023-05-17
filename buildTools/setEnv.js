const fs = require('fs');
const chalk = require('chalk');

var arg = process.argv.splice(2)[0];
const getParams = require('./util');
const file = fs.readFileSync(`./buildTools/env.${arg}`, 'utf-8');
const content = `${getParams(file)}`;
fs.writeFileSync('./src/config/envVariable.ts', content);

if (arg === 'production') {
  console.log(chalk.greenBright('已将接口地址设置为正式环境地址!'));
  console.log(
    chalk.bgGreenBright(
      '如果打包,请注意 iOS的环境!!!!!!!!iOS的环境!!!!!!!!iOS的环境!!!!!!!!',
    ),
  );
}
