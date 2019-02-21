"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.analizePlaceholder = exports.SUBTYPES = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactComponents = require("@cimpress/react-components");

var _PlaceholderTooltipHelper = _interopRequireDefault(require("./PlaceholderTooltipHelper"));

require("./Placeholders.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SUBTYPES = {
  OPEN: 'open',
  CLOSE: 'close',
  NO_ESCAPE_HTML: 'noEscapeHtml',
  FORMULA: 'formula'
};
exports.SUBTYPES = SUBTYPES;

var removeHandlebarsSyntax = function removeHandlebarsSyntax(placeholder) {
  return placeholder.replace(/[{]{2,3}[#/]?|[}]{2,3}/g, '');
};

var calculateDisplayText = function calculateDisplayText(placeholderText) {
  var openingBracketsCount = (placeholderText.match(/[{]/g) || []).length;
  placeholderText = placeholderText.replace(/}+/g, '}'.repeat(openingBracketsCount));
  var displayText;

  if (placeholderText.includes(' ')) {
    displayText = "".concat(placeholderText.split(' ')[0], "(\u2026)"); // } else if (placeholderText.length > 5 && placeholderText.includes('.')) {
    //   displayText = placeholderText.split('.').slice(-1).pop();
  } else {
    displayText = placeholderText;
  }

  displayText = removeHandlebarsSyntax(displayText);

  if (placeholderText.includes('{{{')) {
    displayText = "\u02C2\u0B75\u02C3 ".concat(displayText);
  }

  return displayText;
};

var analizePlaceholder = function analizePlaceholder(placeholder) {
  var display = calculateDisplayText(placeholder);
  var subTypes = [];

  if (placeholder.includes('{{#')) {
    subTypes.push(SUBTYPES.OPEN);
  } else if (placeholder.includes('{{/')) {
    subTypes.push(SUBTYPES.CLOSE);
  }

  if (placeholder.includes('{{{')) {
    subTypes.push(SUBTYPES.NO_ESCAPE_HTML);
  }

  if (placeholder.includes(' ')) {
    subTypes.push(SUBTYPES.FORMULA);
  }

  return {
    subTypes: subTypes,
    display: display,
    placeholder: placeholder
  };
};

exports.analizePlaceholder = analizePlaceholder;

var Placeholder =
/*#__PURE__*/
function (_Component) {
  _inherits(Placeholder, _Component);

  function Placeholder() {
    _classCallCheck(this, Placeholder);

    return _possibleConstructorReturn(this, _getPrototypeOf(Placeholder).apply(this, arguments));
  }

  _createClass(Placeholder, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          placeholder = _this$props.placeholder,
          url = _this$props.url,
          color = _this$props.color;
      var data = analizePlaceholder(placeholder);
      var display = this.props.display || data.display;
      var subTypes = data.subTypes;
      var auxiliaryClassName = '';
      var showPlaceholder = true;
      var descriptions = [];

      if (!subTypes.length) {
        descriptions.push({
          title: 'placeholders:placeholder',
          description: 'placeholders:explain_placeholders'
        });
      } else if (subTypes.includes(SUBTYPES.OPEN)) {
        descriptions.push({
          title: 'placeholders:block_expression',
          description: 'placeholders:explain_opening_block_expression'
        });
        auxiliaryClassName = 'auxiliaryPlaceholderOpen';
      } else if (subTypes.includes(SUBTYPES.CLOSE)) {
        descriptions.push({
          title: 'placeholders:closing_block_expression'
        });
        auxiliaryClassName = 'auxiliaryPlaceholderClose';
        showPlaceholder = false;
      }

      if (subTypes.includes(SUBTYPES.NO_ESCAPE_HTML) && !subTypes.includes(SUBTYPES.CLOSE)) {
        descriptions.push({
          title: 'placeholders:no_escape_html',
          description: 'placeholders:explain_no_escape_html'
        });
      }

      if (subTypes.includes(SUBTYPES.FORMULA)) {
        descriptions.push({
          title: 'placeholders:formula',
          description: 'placeholders:explain_formula'
        });
      }

      return _react.default.createElement("span", {
        className: "placeholder-wrapper"
      }, _react.default.createElement(_reactComponents.Tooltip, {
        className: 'placeholderContextHelp',
        variety: 'popover',
        direction: 'top',
        contents: _react.default.createElement(_PlaceholderTooltipHelper.default, {
          placeholder: placeholder,
          descriptions: descriptions,
          showPlaceholder: showPlaceholder
        })
      }, _react.default.createElement("div", {
        className: auxiliaryClassName || 'placeholder',
        style: {
          backgroundColor: color
        }
      }, !url ? display : _react.default.createElement("a", {
        href: url
      }, display))));
    }
  }]);

  return Placeholder;
}(_react.Component);

exports.default = Placeholder;
Placeholder.propTypes = {
  placeholder: _propTypes.default.string.isRequired,
  url: _propTypes.default.string,
  display: _propTypes.default.any
};