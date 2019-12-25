/*
 * @Author: linjian
 * @Date: 2019-12-25 17:40:25
 * @LastEditors  : linjian
 * @Description: file content
 * @email: linjian@szkingdom.com
 */
const Redis = require('ioredis')
const config = require('../config')

const redisTools= {
    connectRedis: () => {
        return new Redis(config.redis)
    }
}

module.exports = redisTools;