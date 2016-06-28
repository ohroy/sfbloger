# sfbloger|沙发博客客户端（第三方）

## 作用

用来将`markdown with front matter`发布到[segmentfault](https://segmentfault.com/blogs)。


## 安装

```bash
$ npm install sfbloger -g
```


然后修改`config_example.json`为`config.json`并做如下配置：
```json
{
    "blog_id": "你的博客ID",
    "user_email": "你的沙发账号",
    "user_password": "你的密码，放心本地输入，我偷不走哦",
    "evn_path": "博文存放文件夹"
}

```

## 使用

```bash
sfbloger "我的第一篇博文.md"
```

## 补充

如果你使用的博客程序也是`hexo`则可以直接使用，否则，当做简单修改如下：
```markdown
title: Hello World
tag:
  - php
  - linux
---

博客正文
```
即在`markdown`格式的头部加入了`yaml`格式的配置头，并以`---`和正文分割。


#历史
* [v1.0.0](https://post.zz173.com/detail_XvvfpsxvNNlOHJbeP0GiRA.html)
* [v1.1.0](https://post.zz173.com/detail_FynOo-LCP7IQA-gYPibe4A.html)
## 小心！

* 如果你使用了`沙发`不支持的`tag`,将会自动替换为`other`。
* 如果你每天发表博文超过十篇将无法发表，这是由于网站限制的。
* 如果你的博文中含有`html标签`，将会被去除。

## 贡献
由于我的能力和时间有限，本项目暂时没有`test`，也没有进行`架构`,如果你有任何想法或代码贡献，请发`is`或`pr`。
