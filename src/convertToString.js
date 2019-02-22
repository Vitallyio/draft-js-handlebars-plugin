import { convertToRaw } from 'draft-js';

export default (editorState) => {

  const raw = convertToRaw(editorState.getCurrentContent());

  return raw.blocks.reduce((acc, block) => {
    let text = block.text;
    let chars = 0;

    block.entityRanges.forEach((entityRange) => {
      const { key, length } = entityRange;
      const { data } = raw.entityMap[key];
      const offset = entityRange.offset + chars;
      const before = text.slice(0, offset)
      const after = text.slice(offset + length)
      text = before + data.placeholder + after;
      // console.log(before, 0, data.placeholder, 0, after)
      chars += 4; // we've added for chars '{{}}'
    });
    return acc + text;
  }, '');
};
