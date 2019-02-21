"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactI18next = require("react-i18next");

var _i18n = require("./utils/i18n");

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

var PlaceholderTooltipHelper =
/*#__PURE__*/
function (_Component) {
  _inherits(PlaceholderTooltipHelper, _Component);

  function PlaceholderTooltipHelper() {
    _classCallCheck(this, PlaceholderTooltipHelper);

    return _possibleConstructorReturn(this, _getPrototypeOf(PlaceholderTooltipHelper).apply(this, arguments));
  }

  _createClass(PlaceholderTooltipHelper, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          placeholder = _this$props.placeholder,
          descriptions = _this$props.descriptions,
          showPlaceholder = _this$props.showPlaceholder;
      var renderedDescriptions = descriptions.map(function (d, i) {
        return _react.default.createElement("div", {
          key: i
        }, _react.default.createElement("h5", null, _react.default.createElement(_reactI18next.Trans, {
          i18nKey: d.title
        })), _react.default.createElement(_reactI18next.Trans, {
          i18nKey: d.description
        }));
      });
      return _react.default.createElement(_reactI18next.I18nextProvider, {
        i18n: (0, _i18n.getI18nInstance)()
      }, _react.default.createElement("div", {
        className: 'placeholderContextHelp'
      }, showPlaceholder ? _react.default.createElement("pre", null, placeholder) : null, renderedDescriptions));
    }
  }]);

  return PlaceholderTooltipHelper;
}(_react.Component);

exports.default = PlaceholderTooltipHelper;