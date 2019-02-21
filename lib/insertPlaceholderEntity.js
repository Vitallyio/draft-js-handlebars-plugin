"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = insertPlaceholderEntity;

var _draftJs = require("draft-js");

var _Placeholder = require("./Placeholder");

function insertEntity(contentState, selection, entityData, inlineStyle) {
  var newContentState = contentState.createEntity('PLACEHOLDER', 'IMMUTABLE', entityData);
  var entityKey = newContentState.getLastCreatedEntityKey();
  return _draftJs.Modifier.replaceText(newContentState, selection, entityData.display, inlineStyle, entityKey);
}
/**
 * Returns a new ContentState with the placeholder entity created on the selection specified if provided, if not is added at the end of the editor.
 *
 * @param {ContentState} currentContent
 * @param {String} placeholderText
 * @param {SelectionState} selection
 * @param {DraftInlineStyle} inlineStyle
 * @param {String} link
 */


function insertPlaceholderEntity(currentContent, placeholderText, selection, inlineStyle, link) {
  var analisedPlaceholder = (0, _Placeholder.analizePlaceholder)(placeholderText);
  analisedPlaceholder.url = link;
  return insertEntity(currentContent, selection, analisedPlaceholder, inlineStyle);
}