#
ui-comment-box

## 综述

* 版本：1.0.0
* 浏览器支持：h5所有浏览器
* demo: 

## 安装

```
<script src="comment-box.js"></script>
window.CommentBox;
// or webpack
var CommentBox= require('ui-comment-box');
```

## 使用方法

```
var option = {
	title: '评论',
	submitBtn: '发送',
	placeholder: '写评论...',
	enableFace: true, // 是否使用表情功能
	onSubmit: function (data) {
	// 点击发送按钮触发
	},
	onHide: function () {
	// 点击隐藏评论框按钮
	}
	faceImgUrl: 'http://changyan.sohu.com/mdevp/extensions/mobile-cmt-box/041/imgs/face.png', // 是否自定义表情，不填使用默认表情
	faceList: [ // 每个表情的样式
		{
		code: '[微笑/]',
		position: '0 20px',
		size: '20px 0'
		}
	]
};

var comment = new CommentBox(option); // 初始化评论框

comment.show(); // 显示评论框

comment.hide(); // 隐藏评论框

comment.destory(); // 销毁评论框句柄
```

## option

## APi

### .show\(\)

显示评论框

### .hide\(\)

隐藏评论框

### .destory\(\)

销毁评论框


## 待解决问题

* svg需要替换为iconfont以兼容华为手机原生浏览器
* body-lock需要
