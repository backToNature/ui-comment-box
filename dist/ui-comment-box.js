!(function (win) {
    'use strict';
    var $$util = {
        execStyle: function (cssText) {
            var document = window.document;
            var styleTag = document.createElement('style');
            styleTag.setAttribute('type', 'text/css');
            if (document.all) {
                styleTag.styleSheet.cssText = cssText;
            } else {
                styleTag.innerHTML = cssText;
            }
            document.getElementsByTagName("head").item(0).appendChild(styleTag);
        },
        isFunction: function (obj) {
            if (typeof /./ != 'function' && typeof Int8Array != 'object') {
                return typeof obj == 'function' || false;
            } else {
                return toString.call(obj) === '[object Function]';
            }
        },
        isString: function (obj) {
            return toString.call(obj) === '[object String]';
        },
        isBoolean: function (obj) {
            return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
        },
        isObject: function (obj) {
            var type = typeof obj;
            return type === 'function' || type === 'object' && !!obj;
        },
        isArray: Array.isArray || function (obj) {
            return toString.call(obj) === '[object Array]';
        },
        htmlFormat: function (str, context) {
            var key;
            for (key in context) {
                str = str.replace(new RegExp('{{' + key + '}}', 'g'), context[key]);
            }
            return str;
        },
        bodyLock: (function () {
            var originScrollTop, originCssText, win = window, doc = win.document;
            var forbidFunc = function (e) {
                e.preventDefault();
                return false;
            };
            var fixedBody = {
                lock: function () {
                    win.addEventListener('touchmove', forbidFunc);
                    win.addEventListener('MSPointerMove', forbidFunc);
                    win.addEventListener('pointermove', forbidFunc);
                    originScrollTop = win.pageYOffset;
                    originCssText = doc.body.style.cssText;
                    doc.body.style.cssText = 'height: 100vh;background-color: #f5f5f5;position: fixed;top: -999999px;'
                },
                unlock: function () {
                    win.removeEventListener('touchmove', forbidFunc);
                    win.removeEventListener('MSPointerMove', forbidFunc);
                    win.removeEventListener('pointermove', forbidFunc);
                    doc.body.style.cssText = originCssText;
                    win.scrollTo(win.pageXOffset, originScrollTop);
                }
            };
            return fixedBody;
        }())
    };

    var html = '<div class="ui-comment-box">    <div class="ui-comment-box-header">        <svg class="ui-comment-box-back" width="30" height="24" t="1487843679514" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2379" xmlns:xlink="http://www.w3.org/1999/xlink">            <defs><style type="text/css"></style></defs>            <path fill="#000000" d="M363.840919 472.978737C336.938714 497.358861 337.301807 537.486138 364.730379 561.486138L673.951902 832.05497C682.818816 839.813519 696.296418 838.915012 704.05497 830.048098 711.813519 821.181184 710.915012 807.703582 702.048098 799.94503L392.826577 529.376198C384.59578 522.174253 384.502227 511.835287 392.492414 504.59418L702.325747 223.807723C711.056111 215.895829 711.719614 202.404616 703.807723 193.674252 695.895829 184.943889 682.404617 184.280386 673.674253 192.192278L363.840919 472.978737Z" p-id="2380" class="selected"></path>        </svg>        <h3 class="ui-comment-box-title">评论</h3>        <div class="ui-comment-box-submit-btn">发送</div>    </div>    <div class="ui-comment-box-textarea">        <textarea class="ui-comment-box-text" name="" id="" placeholder="写评论..."></textarea>    </div>    <div class="ui-comment-box-tool-bar ">        <div class="ui-comment-box-item ui-comment-box-face-item">            <svg class="ui-comment-box-face" width="30" height="30" t="1487903122149" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1025" xmlns:xlink="http://www.w3.org/1999/xlink">                <path fill="#999999" d="M637.829 328.46c30.744 0 55.665 24.921 55.665 55.671 0 30.738-24.921 55.66-55.665 55.66s-55.671-24.921-55.671-55.66c0.001-30.749 24.928-55.671 55.671-55.671zM386.173 328.46c30.744 0 55.665 24.921 55.665 55.671 0 30.738-24.921 55.66-55.665 55.66s-55.66-24.921-55.66-55.66c0.001-30.749 24.917-55.671 55.66-55.671z" p-id="1026"></path>                <path fill="#999999" d="M511.991 733.71c-113.023 0-179.337-55.968-234.182-116.448-5.78-6.378-5.309-16.234 1.069-22.014 6.396-5.798 16.234-5.291 22.014 1.069 68.416 75.446 129.566 106.229 211.099 106.229 79.395 0 140.618-30.838 211.298-106.41 5.87-6.287 15.745-6.595 22.032-0.725 6.269 5.87 6.613 15.745 0.725 22.032C692.27 674.934 622.423 733.71 511.991 733.71z" p-id="1027"></path>                <path fill="#999999" d="M511.991 959.558c-246.956 0-447.872-200.917-447.872-447.872S265.035 63.814 511.991 63.814c246.974 0 447.89 200.917 447.89 447.872s-200.916 447.872-447.89 447.872z m0-858.638c-226.5 0-410.765 184.266-410.765 410.765S285.492 922.45 511.991 922.45s410.784-184.266 410.784-410.765S738.491 100.92 511.991 100.92z" p-id="1028"></path>            </svg>        </div>    </div>    <div class="ui-comment-face-list hide">        <div class="ui-comment-arrow"></div>        <ul class="ui-comment-face-w ui-comment-clearfix"></ul>    </div></div>';

    var cssText = ".ui-comment-box .ui-comment-clearfix:after {    display:block;    content:'';    clear:both;    visibility:hidden;}.ui-comment-box {    background: #fff;    position: fixed;    width: 100%;    height: 100%;    top: 0;    left: 0;    margin: 0;    padding: 0;    font-family: Helvetica, sans-serif;    z-index: 9999999999999;}.ui-comment-box .ui-comment-box-back {    position: absolute;    top: 0;    left: 0;    padding: 9px 3px 10px;}.ui-comment-box .ui-comment-box-header {    position: relative;    text-align: center;    padding: 8px 0;    border-bottom: 1px solid #e5e5e5;}.ui-comment-box .ui-comment-box-title {    font-size: 18px;    font-weight: bold;    color: #000;    padding: 0;    margin: 0;}.ui-comment-box .ui-comment-box-submit-btn {    position: absolute;    right: 0;    top: 0;    font-size: 15px;    color: #4ebe85;    padding: 10px 15px 11px 10px;}.ui-comment-box .ui-comment-box-text {    -webkit-appearance: normal;    width: 100%;    height: 100%;    box-sizing: border-box;    padding: 10px 15px;    border: none;    font-size: 15px;    font-family: Helvetica, sans-serif;    resize: none;    outline: none;    height: 268px;}.ui-comment-box .ui-comment-box-tool-bar {    padding: 0 25px;    border-bottom: 1px solid #d9d9d9;    background: #f4f4f4;    height: 45px;}.ui-comment-box .ui-comment-box-face {    padding: 7px;    margin: 0 0 0 -9px;}.ui-comment-box .ui-comment-box-item {    display: inline-block;    position: relative;}.ui-comment-box .ui-comment-box-face-item {    display: none;}.ui-comment-box .ui-comment-box-item svg.active path {    fill: #e43;}.ui-comment-box .ui-comment-face-list {    width: 100%;    height: 140px;    padding: 10px;    -webkit-box-sizing: border-box;    box-sizing: border-box;    position: relative;}.ui-comment-box .hide {    display: none;}.ui-comment-box .ui-comment-face-w {    text-decoration: none;    list-style: none;    margin: 0;    padding: 0;    -webkit-box-sizing: border-box;    box-sizing: border-box;    border: 1px solid #d9d9d9;}.ui-comment-box .ui-comment-face-list-item {    text-align: center;    float: left;    width: 17%;    padding: 5px 1.5%;}.ui-comment-box .ui-comment-face-item {    display: block;    width: 35px;    height: 35px;    margin: 0 auto;}";

    $$util.execStyle(cssText);

    var CommentBox = (function () {
        var CommentBox_id = 0;

        var doc = win.document;

        function CommentBox(option) {
            if (!$$util.isObject(option)) {
                option = {};
            }

            this.option = {};

            this.option._cid = CommentBox_id;
            this.option.title = $$util.isString(option.title) ? option.title : '评论';
            this.option.submitBtn = $$util.isString(option.submitBtn) ? option.submitBtn : '发送';
            this.option.placeholder = $$util.isString(option.placeholder) ? option.placeholder : '写评论...';
            this.option.onSubmit = $$util.isFunction(option.onSubmit) ? option.onSubmit : null;
            this.option.onHide = $$util.isString(option.onHide) ? option.onHide : null;
            this.option.enableFace = $$util.isBoolean(option.enableFace) ? option.enableFace : false;
            this.option.faceImgUrl = $$util.isString(option.faceImgUrl) ? option.faceImgUrl : '';
            this.option.faceList = $$util.isArray(option.faceList) ? option.faceList : [];

            var wrapper = doc.createElement('div');
            this.el = wrapper;
            wrapper.className = 'ui-comment-box';
            wrapper.id = 'ui-comment-box-' + CommentBox_id;
            wrapper.style.display = 'none';
            wrapper.innerHTML = $$util.htmlFormat(html, this.option);
            
            if (this.option.enableFace) {
                if (!this.option.faceList.length) {
                    this.option.faceList = [
                        {
                            code: '[/奋斗]',
                            position: '0 0',
                            size: '70px'
                        },
                        {
                            code: '[/鼓掌]',
                            position: '0 -35px',
                            size: '70px'
                        },
                        {
                            code: '[/发怒]',
                            position: '0 -70px',
                            size: '70px'
                        },
                        {
                            code: '[/色]',
                            position: '0 -105px',
                            size: '70px'
                        },
                        {
                            code: '[/给力]',
                            position: '0 -140px',
                            size: '70px'
                        },
                        {
                            code: '[/憨笑]',
                            position: '0 -175px',
                            size: '70px'
                        },
                        {
                            code: '[/可爱]',
                            position: '0 -210px',
                            size: '70px'
                        },
                        {
                            code: '[/抓狂]',
                            position: '0 -245px',
                            size: '70px'
                        },
                        {
                            code: '[/流汗]',
                            position: '0 -280px',
                            size: '70px'
                        },
                        {
                            code: '[/强]',
                            position: '0 -315px',
                            size: '70px'
                        },
                        {
                            code: '[/弱]',
                            position: '0 -350px',
                            size: '70px'
                        },
                        {
                            code: '[/玫瑰]',
                            position: '0 -385px',
                            size: '70px'
                        },
                        {
                            code: '[/大哭]',
                            position: '-35px 0',
                            size: '70px'
                        },
                        {
                            code: '[/疑问]',
                            position: '-35px -35px',
                            size: '70px'
                        },
                        {
                            code: '[/鄙视]',
                            position: '-35px -70px',
                            size: '70px'
                        },
                        {
                            code: '[/钱]',
                            position: '-35px -105px',
                            size: '70px'
                        },
                        {
                            code: '[/闭嘴]',
                            position: '-35px -140px',
                            size: '70px'
                        },
                        {
                            code: '[/可怜]',
                            position: '-35px -175px',
                            size: '70px'
                        },
                        {
                            code: '[/惊讶]',
                            position: '-35px -210px',
                            size: '70px'
                        },
                        {
                            code: '[/浮云]',
                            position: '-35px -245px',
                            size: '70px'
                        },
                        {
                            code: '[/打酱油]',
                            position: '-35px -280px',
                            size: '70px'
                        },
                        {
                            code: '[/握手]',
                            position: '-35px -315px',
                            size: '70px'
                        },
                        {
                            code: '[/拳头]',
                            position: '-35px -350px',
                            size: '70px'
                        },
                        {
                            code: '[/酒]',
                            position: '-35px -385px',
                            size: '70px'
                        }
                    ];
                    this.option.faceImgUrl = 'http://changyan.sohu.com/mdevp/extensions/mobile-cmt-box/041/imgs/face.png';
                }
                wrapper.querySelector('.ui-comment-box-face-item').style.display = 'block';
                var faceTpl = '<li class="ui-comment-face-list-item" data-code="{{code}}">\
                    <span class="ui-comment-face-item" data-code="{{code}}" style="background-size:{{size}};background-position:{{position}};"></span>\
                </li>';
                $$util.execStyle('.ui-comment-box .ui-comment-face-item {background: url(\''+ this.option.faceImgUrl +'\');}');
                var faceContent = '';
                this.option.faceList.forEach(function (item) {
                    faceContent += $$util.htmlFormat(faceTpl, item);
                });
                wrapper.querySelector('.ui-comment-face-w').innerHTML = faceContent;
            
            }

            doc.body.appendChild(wrapper);
            var _this = this;

            var submitBtn = wrapper.querySelector('.ui-comment-box-submit-btn');
            var backBtn = wrapper.querySelector('.ui-comment-box-back');
            var textarea = wrapper.querySelector('.ui-comment-box-text');
            var faceIcon = wrapper.querySelector('.ui-comment-box-face');
            var faceList = wrapper.querySelector('.ui-comment-face-list');

            submitBtn.addEventListener('click', function () {
                if ($$util.isFunction(_this.option.onSubmit)) {
                    _this.option.onSubmit(textarea.value);
                }
            });

            backBtn.addEventListener('click', function () {
                _this.hide();
            });

            var func = function () {
                faceIcon.classList.remove('active');
                faceList.classList.remove('hide');
                doc.removeEventListener('');
            };

            faceIcon.addEventListener('click', function (e) {
                e.stopPropagation();
                faceIcon.classList.toggle('active');
                faceList.classList.toggle('hide');
                var func = function () {
                    faceIcon.classList.remove('active');
                    faceList.classList.add('hide');
                    doc.body.removeEventListener('click', func);
                };
                doc.body.addEventListener('click', func);
            });

            faceList.addEventListener('click', function (e) {
                e.stopPropagation();
                var target = e.target,
                    code = target.getAttribute('data-code');
                if (code) {
                    textarea.value = textarea.value + code;
                }
            });

            CommentBox_id++;
        };

        CommentBox.prototype.show = function () {
            this.el.style.display = 'block';
            this.el.querySelector('.ui-comment-box-text').value = '';
            $$util.bodyLock.lock();
        };

        CommentBox.prototype.hide = function () {
            this.el.style.display = 'none';
            $$util.bodyLock.unlock();
        };

        CommentBox.prototype.destory = function () {
            doc.body.removeChild(this.el);
        };

        return CommentBox;
    }());

    if (typeof define === 'function') {
        define(function() {
            return CommentBox;
        });
    } else if (typeof exports !== 'undefined') {
        module.exports = CommentBox;
    } else {
        window.CommentBox = CommentBox;
    }
}(window));