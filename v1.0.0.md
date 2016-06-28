# sfbloger|沙发博客客户端（第三方）

## 前言

当我混迹与[segmentfault](https://segmentfault.com/blogs)的时候，我就在想，能不能给我自己发博客的时候，捎带上它。然而一直很忙，抽不出来空，趁着今天这个周末，准备动手实现它。  
然而实际上，它是对上次的[segmentfault_loginer](https://github.com/Rozbo/segmentfault_loginer)项目的一个延续，扩展和补充，登陆已经实现了，发表博客还远吗？

## 原理

原理非常简单

1. 本地获取`markdown with front matter`格式的博文
2. 解析`front matter`，提取出博客的标题、标签、内容
3. 模拟登陆
4. 然后模拟提交发表博客而已。

呐，真的非常简单！`nodejs`的初学者都可以做到。当然，我也是个初学者。

## 使用

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
然后就可以愉快的使用啦

```bash
node index "我的第一篇博文"
```

## 补充

上文也提到开发这个东西的本意是为了我自己同步hexo博客方便而使用的，如果你使用的博客程序也是`hexo`则可以直接使用，否则，当做简单修改如下：
```markdown
title: Hello World
tag:
  - php
  - linux
---

博客示例
```
即在`markdown`格式的头部加入了`yaml`格式的配置头，并以`---`和正文分割。

## 小心！

* 如果你使用了`沙发`不支持的`tag`,将会自动替换为`windows`，因为它没有`other`这样的。
* 如果你每天发表博文超过十篇将无法发表，这是由于网站限制的。
* 如果你的博文中含有`html标签`，将会被去除。

## 贡献
由于我的能力和时间有限，本项目暂时没有`test`，也没有进行`架构`,如果你有任何想法或代码贡献，请发`is`或`pr`。
 
