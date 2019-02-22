export const convertToString = (editorState) => {
  const raw = convertToRaw(editorState.getCurrentContent());

  return raw.blocks.reduce((acc, block) => {
    let text = block.text;
    let chars = 0;

    block.entityRanges.forEach((entityRange) => {
      const { key, length } = entityRange;
      let { offset } = entityRange;
      offset = offset + chars;
      const entity = raw.entityMap[key];
      const data = entity.data;
      const before = text.slice(0, offset)
      const after = text.slice(offset + length)
      text = before + data.placeholder + after;
      console.log(before, 0, data.placeholder, 0, after)
      chars += 4; // we've added for chars '{{}}'
    });
    return acc + text;
  }, '');
};
