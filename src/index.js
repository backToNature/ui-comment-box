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

    var html = '%s';

    var cssText = "%s";

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