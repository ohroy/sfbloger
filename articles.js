'use strict';
var util = require('./util');
var tager = require('./tags');
var config = require('./config.json');

function post_blog(parm_title, parm_text, parm_tag, callback) {
    let objTmp = util.post('/api/articles/add')
        .send('title=' + parm_title)
        .send('text=' + parm_text)
        .send('id=')
        .send('blogId=' + config.blog_id)
        .send('weibo=0')
        .send('license=1')
        .send('draftId=0')
        .send('created=');
    //json方式不支持key相同，因为数组param无法提交
    let arrTag = tager(parm_tag);
    for (let i in arrTag) {
        objTmp = objTmp.send('tags[]=' + arrTag[i]);
    }
    console.log(objTmp._data);
    objTmp.end(function(err, res) {
        //console.log(res);
        if (err || !res.ok) {
            console.log(err.status);
        } else {
            if (res.body.status == 0) {
                console.log('发表成功.');
                console.log('地址是:https://segmentfault.com' + res.body.data.url);
            } else {
                console.log('发表失败!');
                console.log(res.body.data);
            }
        }
        callback();
    });
}


exports = module.exports = post_blog;
exports.add = post_blog;
