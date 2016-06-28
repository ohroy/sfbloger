'use strict';
var util = require('./util');
var tager = require('./tags');
var config = require('./config.json');

function post_blog(parm_title, parm_text, parm_tag, callback) {
    util.post('/api/articles/add')
        .send({
            title: parm_title,
            text: parm_text,
            id: '',
            blogId: config.blog_id, //博客ID,必须填自己的。
            'tags[]': tager(parm_tag),
            weibo: 0, //是否同步到新浪微博
            license: 1, //是否注明版权信息
            draftId: 0,
            created: ''
        })
        .end(function(err, res) {
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
