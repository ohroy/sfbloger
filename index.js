var superagent = require('superagent');
var tager = require('./tags');
var post = require('./post');
var config = require('./config.json');
/*
1.  `_`的值必须与之下的Cookie对应，否则服务端返回404
2. 以下的http请求头是必须的，其他无所谓，不然就是404
*/
var token = '7ef046ad4f224034d7b51655238bd870';
var cookies = 'PHPSESSID=web1~395mahoqliohh5kclv894ibpr3; _gat=1; _ga=GA1.2.1234754628.1465797373;' +
    'Hm_lvt_e23800c454aa573c0ccb16b52665ac26=1465797373; Hm_lpvt_e23800c454aa573c0ccb16b52665ac26=1465797538';

//logic start============
var post = post();

// fetchdata
entry();



//登陆后发表.异步链入口
function entry() {
    sf_post('https://segmentfault.com/api/user/login')
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
                    post_blog(post.title, post.content, post.tag)
                } else {
                    console.log('登陆出错:%o', res.body);
                }

            }
        });
}

//发表博客接口，依赖登陆.
//parm_tag：字符串数组，因为可能涉及到多个tag
function post_blog(parm_title, parm_text, parm_tag) {
    sf_post('https://segmentfault.com/api/articles/add')
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
                    console.log('地址是:https://segmentfault.com', res.body.data.url);
                } else {
                    console.log('发表失败!');
                    console.log(res.body.data);
                }
            }
        });
}








//功能函数
function sf_post(url) {
    return superagent.post(url + '?_=' + token)
        .set('Referer', 'https://segmentfault.com/user/login')
        .set('X-Requested-With', 'XMLHttpRequest')
        .set('Cookie', cookies)
        .type('form');
}
