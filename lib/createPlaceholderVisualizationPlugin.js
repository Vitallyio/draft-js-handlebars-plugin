"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _draftJs = require("draft-js");

var _draftjsUtils = require("draftjs-utils");

var _draftjsConductor = require("draftjs-conductor");

var _selectionUtils = _interopRequireDefault(require("./selectionUtils"));

var _insertPlaceholderEntity = _interopRequireDefault(require("./insertPlaceholderEntity"));

var _decoratorStrategy = _interopRequireDefault(require("./decoratorStrategy"));

var _Placeholder = _interopRequireDefault(require("./Placeholder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PLACEHOLDER_REGEX = /[{]?{{[^{}]*}}[}]?/g;
/**
 * This function contains code that makes sure that the overridden functionality (produceNewEditorState)
 * is only invoked when the PLACEHOLDER type entity is selected
 *
 * @param editorState
 * @param setEditorState
 * @param produceNewEditorState The action to that will produce new editor state. This is a function that takes
 *  in selection state as input and produces editor state
 * @returns {*}
 */

function handleInCaseOfPlaceholderEntity(editorState, setEditorState, produceNewEditorState) {
  var state = editorState;
  var selection = state.getSelection();
  var startOffset = selection.getStartOffset();
  var endOffset = selection.getEndOffset();
  var content = state.getCurrentContent();
  var block = content.getBlockForKey(selection.getStartKey());
  var entityStart = block.getEntityAt(startOffset);
  var entityEnd = block.getEntityAt(endOffset);

  var isPlaceholderAt = function isPlaceholderAt(entity) {
    return entity !== null && content.getEntity(entity).getType() === 'PLACEHOLDER';
  };

  if (isPlaceholderAt(entityStart) || isPlaceholderAt(entityEnd)) {
    var rangeStart = (0, _draftjsUtils.getEntityRange)(state, entityStart);

    if (!selection.isCollapsed || rangeStart && startOffset > rangeStart.start) {
      var newEditorState = _selectionUtils.default.moveBehindEntity(entityEnd || entityStart, editorState);

      setEditorState(produceNewEditorState(newEditorState));
      return 'handled';
    }
  }

  return 'not-handled';
}
/**
 * This function is used to find all the matches according to a RegEx
 *
 * @param regex
 * @param contentBlock
 * @param callback
 * @returns {Array}
 */


function findWithRegex(regex, contentBlock) {
  var text = contentBlock.getText();
  var matchArr;
  var start;
  var range = [];

  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    range.push({
      start: start,
      end: start + matchArr[0].length
    });
  }

  return range;
}

var _default = function _default() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    decorators: [{
      strategy: _decoratorStrategy.default,
      component: function component(props) {
        var contentState = props.contentState,
            children = props.children,
            entityKey = props.entityKey;
        var entityData = contentState.getEntity(entityKey).data;
        var data = {
          placeholder: entityData.placeholder,
          url: entityData.url,
          display: children
        };
        return _react.default.createElement(_Placeholder.default, data);
      }
    }],

    /**
     * Overriding the handle return, so that pressing "enter" when the caret is on the placeholder
     * wouldn't split the text in half (wouldn't split the block)
     *
     * @param event
     * @param editorState
     * @param getEditorState
     * @param setEditorState
     * @returns {*}
     */
    handleReturn: function handleReturn(event, editorState, _ref) {
      var getEditorState = _ref.getEditorState,
          setEditorState = _ref.setEditorState;
      return handleInCaseOfPlaceholderEntity(editorState, setEditorState, function (editorState) {
        var newContent = _draftJs.Modifier.splitBlock(editorState.getCurrentContent(), editorState.getSelection());

        return _draftJs.EditorState.push(editorState, newContent, 'split-block');
      });
    },

    /**
     * Overriding handle before input to make sure that PLACEHOLDER entities can't me modified once created.
     *
     * @param chars
     * @param editorState
     * @param getEditorState
     * @param setEditorState
     * @returns {*}
     */
    handleBeforeInput: function handleBeforeInput(chars, editorState, _ref2) {
      var getEditorState = _ref2.getEditorState,
          setEditorState = _ref2.setEditorState;
      return handleInCaseOfPlaceholderEntity(editorState, setEditorState, function (editorState) {
        var content = _draftJs.Modifier.insertText(editorState.getCurrentContent(), editorState.getSelection(), chars, editorState.getCurrentInlineStyle(), null);

        return _draftJs.EditorState.push(editorState, content, 'insert-characters');
      });
    },

    /**
     * It is also required to override paste, to make sure it doesn't split existing placeholder entities
     * @param text
     * @param html
     * @param editorState
     * @param getEditorState
     * @param setEditorState
     * @returns {*}
     */
    handlePastedText: function handlePastedText(text, html, editorState, _ref3) {
      var getEditorState = _ref3.getEditorState,
          setEditorState = _ref3.setEditorState;
      var newState = (0, _draftjsConductor.handleDraftEditorPastedText)(html, editorState);

      if (newState) {
        // handleDraftEditorPastedText detects when the copied text is from a draft js editor with the plugin
        setEditorState(newState);
        return 'handled';
      }

      return handleInCaseOfPlaceholderEntity(editorState, setEditorState, function (editorState) {
        var content = _draftJs.Modifier.insertText(editorState.getCurrentContent(), editorState.getSelection(), text, editorState.getCurrentInlineStyle(), null);

        return _draftJs.EditorState.push(editorState, content, 'insert-characters');
      });
    },

    /**
     * Overriding on change in order to discover new entities of type PLACEHOLDER,
     * especially when the page first loads (but also when the user is typing)
     *
     * @param editorState
     * @param getEditorState
     * @param setEditorState
     * @returns {*}
     */
    onChange: function onChange(editorState) {
      var contentState = editorState.getCurrentContent();
      var newEditorState = editorState;
      contentState.getBlockMap().map(function (originalBlock) {
        var blockKey = originalBlock.getKey();
        var ranges = findWithRegex(PLACEHOLDER_REGEX, originalBlock);
        return ranges.forEach(function () {
          var currentContent = newEditorState.getCurrentContent();
          var currentBlock = currentContent.getBlockForKey(blockKey);
          var range = findWithRegex(PLACEHOLDER_REGEX, currentBlock)[0];
          var start = range.start;
          var end = range.end;
          var entityKey = currentBlock.getEntityAt(start);
          var entity = null;
          var link = null;

          if (entityKey !== null) {
            entity = currentContent.getEntity(entityKey);
            link = entity.data.url;
          }

          if (entity === null || entity.getType() === 'LINK') {
            var text = currentBlock.getText().substring(start, end);
            var selection = new _draftJs.SelectionState({
              anchorKey: blockKey,
              anchorOffset: start,
              focusKey: blockKey,
              focusOffset: end
            });
            newEditorState = _draftJs.EditorState.forceSelection(newEditorState, selection);
            var newContentState = (0, _insertPlaceholderEntity.default)(currentContent, text, selection, newEditorState.getCurrentInlineStyle(), link);
            var newEntity = newContentState.getEntity(newContentState.getLastCreatedEntityKey());
            var cursorOn = start + newEntity.data.display.length;
            newEditorState = _draftJs.EditorState.push(newEditorState, newContentState, 'apply-entity');
            newEditorState = _draftJs.EditorState.forceSelection(newEditorState, selection.merge({
              anchorOffset: cursorOn,
              focusOffset: cursorOn
            }));
          }

          return newEditorState;
        });
      });
      return newEditorState;
    }
  };
};

exports.default = _default;