var fs = require('fs');
var path = require('path');
var util = require('util');

var tplPath = path.join(__dirname, '../src/tpl.html');
var cssPath = path.join(__dirname, '../src/index.css');
var srcJs = path.join(__dirname, '../src/index.js');
var distPath = path.join(__dirname, '../dist');
var distJS = path.join(__dirname, '../dist/ui-comment-box.js');
var distMinJs = path.join(__dirname, '../dist/ui-comment-box.min.js');


var removeBreak = function (str) {
    return str.replace(/\r|\n/g, '');
};

var build = function () {
    if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath);
    }
    var cssText = removeBreak(fs.readFileSync(cssPath, 'utf8'));
    var tplText = removeBreak(fs.readFileSync(tplPath, 'utf8'));
    var jsText = util.format(fs.readFileSync(srcJs, 'utf8'), tplText, cssText);
    fs.writeFileSync(distJS, jsText, 'utf8');
    console.log('build-success');
};

build();

fs.watch(srcJs, function (eventType, filename) {
    if (eventType === 'change') {
        build();
    }
});

fs.watch(tplPath, function (eventType, filename) {
    if (eventType === 'change') {
        build();
    }
});

fs.watch(cssPath, function (eventType, filename) {
    if (eventType === 'change') {
        build();
    }
});
