/*
 * @Author: linjian
 * @Date: 2019-12-25 17:44:41
 * @LastEditors  : linjian
 * @Description: file content
 * @email: linjian@szkingdom.com
 */
const config = {
    redis: {
        port: 6379,          // Redis port
        host: '10.60.69.142',   // Redis host
        prefix: 'kingdom:', //存诸前缀
        ttl: 60 * 60 * 23,  //过期时间   
        family: 4,
        db: 0,
        password: 'kingdom'
    }
}
module.exports = config;