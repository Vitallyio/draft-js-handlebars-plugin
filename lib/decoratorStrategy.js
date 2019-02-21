"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Decorator strategy defines how we are finding elements a decorator should be applied to
 * In this case, we are taking all entities of type PLACEHOLDER
 *
 * @param contentBlock
 * @param callback
 * @param contentState
 */
var _default = function _default(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'PLACEHOLDER';
  }, callback);
};

exports.default = _default;