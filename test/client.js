/*
 * @Author: linjian
 * @Date: 2019-12-25 15:12:28
 * @LastEditors  : linjian
 * @Description: file content
 * @email: linjian@szkingdom.com
 */
const http = require('http');
for (let index = 0; index < 100; index++) {
    http.get({
        host: '127.0.0.1',
        port:'3000',
        path: '/',
        agent: false,
    }, (res) => {
    });
}

