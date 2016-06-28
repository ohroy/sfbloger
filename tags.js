'use strict';

var obj_tag = require('./tag.json')



function tag(str) {
    var ret = '';
    if (typeof str !== 'string') throw new TypeError('str must be a string!');
    for (var p in obj_tag) {

        var tag_type = obj_tag[p];
        for (var tag_i in tag_type) {
            if (tag_type[tag_i].name == str) {
                ret = tag_type[tag_i].id;
                break;
            }
        }
    }
    return ret;
}

function tags(strs) {
    var tagIds = ['1040000000493572']; //other
    for (var i in strs) {
        let tmpStr = strs[i];
        if (tmpStr == 'nodejs') {
            tmpStr = 'node.js';
        }
        var tmpId = tag(tmpStr);
        if (tagIds.indexOf(tmpId) == -1 && tmpId != '') {
            tagIds.push(tmpId);
        }
    }
    return tagIds;
}

module.exports = tags;
