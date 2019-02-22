"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertToString = void 0;

var convertToString = function convertToString(editorState) {
  var raw = convertToRaw(editorState.getCurrentContent());
  return raw.blocks.reduce(function (acc, block) {
    var text = block.text;
    var chars = 0;
    block.entityRanges.forEach(function (entityRange) {
      var key = entityRange.key,
          length = entityRange.length;
      var offset = entityRange.offset;
      offset = offset + chars;
      var entity = raw.entityMap[key];
      var data = entity.data;
      var before = text.slice(0, offset);
      var after = text.slice(offset + length);
      text = before + data.placeholder + after;
      console.log(before, 0, data.placeholder, 0, after);
      chars += 4; // we've added for chars '{{}}'
    });
    return acc + text;
  }, '');
};

exports.convertToString = convertToString;