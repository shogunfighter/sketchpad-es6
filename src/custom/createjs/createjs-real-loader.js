let fs = require('fs'),
    path = require('path');

let replaceMarker = '{{source}}';

module.exports = function (source) {
    let wrapperPath = path.resolve(path.join(__dirname, './createjs-wrapper.tpl')),
        content = fs.readFileSync(wrapperPath, {
            encoding: 'utf8'
        });
    this.cacheable();
    return content.replace(replaceMarker, source);
};