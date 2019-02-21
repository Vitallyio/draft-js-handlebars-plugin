"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _draftJs = require("draft-js");

var _draftjsUtils = require("draftjs-utils");

/** *
 * This function moves focus to the end of the entity (outside)
 *
 * @param entityKey
 * @param editorState
 * @returns {*}
 */
var moveBehindEntity = function moveBehindEntity(entityKey, editorState) {
  var selectionState = editorState.getSelection();
  var anchorKey = selectionState.getAnchorKey();
  var range = (0, _draftjsUtils.getEntityRange)(editorState, entityKey);

  if (!range) {
    return editorState;
  }

  var updateSelection = new _draftJs.SelectionState({
    anchorKey: anchorKey,
    anchorOffset: range.end,
    focusKey: anchorKey,
    focusOffset: range.end,
    isBackward: false
  });
  return _draftJs.EditorState.forceSelection(editorState, updateSelection);
};
/**
 *
 * @param getEditorState
 * @param setEditorState
 * @param traversingLeft
 */


var selectWholeEntities = function selectWholeEntities(getEditorState, setEditorState) {
  var traversingLeft = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var editorState = getEditorState();
  var selection = editorState.getSelection();
  var content = editorState.getCurrentContent();
  var blockAnchor = content.getBlockForKey(selection.getAnchorKey());
  var entityAnchor = blockAnchor.getEntityAt(selection.getAnchorOffset());
  var blockFocus = content.getBlockForKey(selection.getFocusKey());
  var entityFocus = blockFocus.getEntityAt(selection.getFocusOffset() + (selection.isBackward && traversingLeft ? -1 : 0));
  var updatedSelection = selection;

  if (entityAnchor) {
    var range = (0, _draftjsUtils.getEntityRange)(editorState, entityAnchor);

    if (range) {
      updatedSelection = updatedSelection.merge({
        anchorKey: blockFocus.getKey(),
        anchorOffset: selection.isBackward && traversingLeft ? range.end : range.start
      });
    }
  }

  if (entityFocus) {
    var _range = (0, _draftjsUtils.getEntityRange)(editorState, entityFocus);

    if (_range) {
      updatedSelection = updatedSelection.merge({
        focusKey: blockAnchor.getKey(),
        focusOffset: selection.isBackward && traversingLeft ? _range.start : _range.end
      });
    }
  }

  setEditorState(_draftJs.EditorState.forceSelection(editorState, updatedSelection));
  return entityAnchor || entityFocus;
};

var _default = {
  selectWholeEntities: selectWholeEntities,
  moveBehindEntity: moveBehindEntity
};
exports.default = _default;