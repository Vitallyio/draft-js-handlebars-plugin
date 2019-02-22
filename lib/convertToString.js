"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _draftJs = require("draft-js");

var _default = function _default(editorState) {
  var raw = (0, _draftJs.convertToRaw)(editorState.getCurrentContent());
  return raw.blocks.reduce(function (acc, block) {
    var text = block.text;
    var chars = 0;
    block.entityRanges.forEach(function (entityRange) {
      var key = entityRange.key,
          length = entityRange.length;
      var data = raw.entityMap[key].data;
      var offset = entityRange.offset + chars;
      var before = text.slice(0, offset);
      var after = text.slice(offset + length);
      text = before + data.placeholder + after; // console.log(before, 0, data.placeholder, 0, after)

      chars += 4; // we've added for chars '{{}}'
    });
    return acc + text;
  }, '');
};

exports.default = _default;