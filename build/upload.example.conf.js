const dest ={
  host: '',
  username: '',
  password: '',
};
const staticPath = {path: '/var/www/milesolar/public/static'};//静态目录，包括图片等
const staticDevPath = 'static';//本地开发路径
const nuxtPath = {path: '/var/www/milesolar/public/.nuxt'};
const nuxtDevPath = '.nuxt';//本地开发路径
const packagePath = {path: '/var/www/milesolar/public/package.json'};
const devPackagePath = 'package.json';//本地开发路径
const configPath = {path: '/var/www/milesolar/public/nuxt.config.js'};
const devConfigPath = 'nuxt.config.js';//本地开发路径
const staticDest = {};
const nuxtDest = {};
const packageDest = {};
const configDest = {};
Object.assign(staticDest,dest,staticPath);
Object.assign(nuxtDest,dest,nuxtPath);
Object.assign(packageDest,dest,packagePath);
Object.assign(configDest,dest,configPath);
module.exports={
  STATIC_DEST:staticDest,
  STATIC_DEV_PATH:staticDevPath,
  NUXT_DEST:nuxtDest,
  NUXT_DEV_PATH:nuxtDevPath,
  PACKAGE_DEST:packageDest,
  PACKAGE_DEV_PATH:devPackagePath,
  CONFIG_DEST:configDest,
  CONFIG_DEV_PATH:devConfigPath,
};
