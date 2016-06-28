'use strict';

var util = require('./util');
var config = require('./config.json');
var fs = require('fs');




function _getToken() {}
//1.获取cookie
//2.获取token
function init(callback) {
    console.info("正在申请token...");
    config.token = '';
    config.cookies = '';
    util.get('/').end(function(err, res) {
        if (err) throw err;
        //取出cookie
        let cookRet = res.header['set-cookie'][0];
        cookRet = cookRet.split(';')[0];

        config.cookies = cookRet + '; _gat=1;';
        //console.log(config.cookies);
        //正则取出shell code
        var text = res.text.match(/(token = \(function \(\)[\s\S]+?;);/g)[0];
        //拼装shell code
        text = text.slice(0, -4) + ';';
        //执行shell code
        var token;
        eval(text);
        //取得shell code 执行结果
        config.token = token();
        //保存新的配置
        // fs.writeFileSync('./config.json', JSON.stringify(config), {
        //     encoding: 'utf-8'
        // });
        console.info("token申请成功...");
        callback();
    })
}

//登陆成功会执行无参数回调
function login(callback) {
    console.info("开始登陆...");
    util.post('/api/user/login')
        .send({
            mail: config.user_email,
            password: config.user_password
        })
        .end(function(err, res) {
            if (err || !res.ok) {
                console.log(err.status);
            } else {
                if (res.body.status == 0 ||
                    res.redirects[0] == "https://segmentfault.com/") {
                    console.log('登陆成功,开始发表.');
                    callback();
                    //post_blog(post.title, post.content, post.tag);
                } else {
                    console.log('登陆出错:%o', res.body);
                }

            }
        });
}

//退出
function logout() {
    util.get('/api/user/logout')
        .end(function(err, res) {
            if (err || !res.ok) {
                console.log(err.status);
            } else {
                console.log('安全退出..');
                console.log(res.body);
            }
        });
}


exports = module.exports;
exports.init = init;
exports.login = login;
exports.logout = logout;
