"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getI18nInstance = getI18nInstance;

var _i18next = _interopRequireDefault(require("i18next"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var languages = require('../locale/all.json');

var i18nInstance = null;

function getI18nInstance() {
  if (!i18nInstance) {
    i18nInstance = _i18next.default.createInstance();
    i18nInstance.init({
      fallbackLng: 'eng',
      resources: languages,
      ns: ['placeholders'],
      defaultNS: 'placeholders',
      debug: false,
      interpolation: {
        escapeValue: false // not needed for react!!

      },
      react: {
        wait: true
      }
    });
  }

  return i18nInstance;
}