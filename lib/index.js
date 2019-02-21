"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "decoratorStrategy", {
  enumerable: true,
  get: function get() {
    return _decoratorStrategy.default;
  }
});
Object.defineProperty(exports, "Placeholder", {
  enumerable: true,
  get: function get() {
    return _Placeholder.default;
  }
});
Object.defineProperty(exports, "selectionUtils", {
  enumerable: true,
  get: function get() {
    return _selectionUtils.default;
  }
});
Object.defineProperty(exports, "insertPlaceholderEntity", {
  enumerable: true,
  get: function get() {
    return _insertPlaceholderEntity.default;
  }
});
exports.default = void 0;

var _decoratorStrategy = _interopRequireDefault(require("./decoratorStrategy"));

var _Placeholder = _interopRequireDefault(require("./Placeholder"));

var _createPlaceholderVisualizationPlugin = _interopRequireDefault(require("./createPlaceholderVisualizationPlugin"));

var _selectionUtils = _interopRequireDefault(require("./selectionUtils"));

var _insertPlaceholderEntity = _interopRequireDefault(require("./insertPlaceholderEntity"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _createPlaceholderVisualizationPlugin.default;
exports.default = _default;