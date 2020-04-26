const client = require('scp2');
const uploadConfig = require('./upload.test.conf');
function uploadCallBack(err){
    if(err){
        console.log(err);
    }else{
        console.log('测试环境文件上传完毕!\n')
    }
}
client.scp(uploadConfig.STATIC_DEV_PATH,uploadConfig.STATIC_DEST,uploadCallBack);
client.scp(uploadConfig.NUXT_DEV_PATH,uploadConfig.NUXT_DEST,uploadCallBack);
client.scp(uploadConfig.PACKAGE_DEV_PATH,uploadConfig.PACKAGE_DEST,uploadCallBack);
client.scp(uploadConfig.CONFIG_DEV_PATH,uploadConfig.CONFIG_DEST,uploadCallBack);
