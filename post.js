'use strict';
var fs = require('fs');
var front = require('hexo-front-matter');
var config = require('./config.json')

function _getFileStr() {
    var path = process.argv.splice(2)[0];
    if (typeof path !== 'string') throw new TypeError('post path error');
    path = config.evn_path + path;
    //console.log(path);
    if (!fs.existsSync(path)) throw new Error('post not found');
    var post_str = fs.readFileSync(path, 'utf-8');
    return post_str;
}

function _parsePost(post_str) {
    var objPost = front.parse(post_str);
    return {
        title: objPost.title,
        //过滤所有html标签
        content: objPost._content.replace(/<[^>]+>/g, ""),
        tag: objPost.tags||objPost.tag //category
    }
}

function post() {
    var post_str = _getFileStr();
    var objPost = _parsePost(post_str);
    return objPost;
}


module.exports = post;
