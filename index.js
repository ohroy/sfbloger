var superagent = require('superagent');
var post = require('./post');
var user = require('./user');
var config = require('./config.json');
var articles = require('./articles');

//logic start============
//获取当前博文信息
let objPost = post();
//1.获取token
//2.获取seesion
user.init(entry);
//1.登陆
//2.发表博文
function entry() {
    user.login(function() {
        //发表后退出
        articles.add(objPost.title, objPost.content, objPost.tag, clear);
    })
}



function clear() {
    user.logout()
}
