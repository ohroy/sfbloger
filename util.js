var superagent = require('superagent');
var config = require('./config.json');
/*
1.  `_`的值必须与之下的Cookie对应，否则服务端返回404
2. 以下的http请求头是必须的，其他无所谓，不然就是404
*/
// config.token = ; //;
// config.cookies = ; //;

//功能函数
function post(url) {
    //console.log(config);
    return superagent.post('https://segmentfault.com' + url + '?_=' + config.token)
        .set('Referer', 'https://segmentfault.com/')
        .set('X-Requested-With', 'XMLHttpRequest')
        .set('Cookie', config.cookies)
        .type('form');
}

function get(url) {
    let _url = config.token == '' ? '' : '?_=' + config.token;
    _url = 'https://segmentfault.com' + url + _url;
    return superagent.get(_url)
        .set('Referer', 'https://segmentfault.com/')
        .set('X-Requested-With', 'XMLHttpRequest')
        .set('Cookie', config.cookies)
}

//导出
exports = module.exports;
exports.get = get;
exports.post = post;
