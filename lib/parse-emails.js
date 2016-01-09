"use strict";

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ParseEmails = (function () {
  function ParseEmails() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, ParseEmails);

    this.opts = opts;
    this.pattern = new RegExp("[a-zA-Z0-9\\.\\-\\+]{1,50}@[a-zA-Z0-9\\-]{2,50}(?:\\.[a-zA-Z0-9\\-]{2,20})?(?:\\.[a-zA-Z0-9\\-]{2,20})?(?:\\.[a-zA-Z]{2,20})", "g");
  }

  // opts are not used yet

  (0, _createClass3.default)(ParseEmails, [{
    key: "parse",
    value: function parse(input) {
      var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var text = "";
      if (typeof input === 'string') {
        text = input;
      } else if (typeof input.text === 'string') {
        text = input.text;
      } else {
        return _promise2.default.reject(new Error("input is not text but " + (typeof input === "undefined" ? "undefined" : (0, _typeof3.default)(input))));
      }

      var matches = text.match(this.pattern);
      if (typeof matches === 'undefined' || matches === null || typeof matches.length === 'undefined' || matches.length == 0) {
        return _promise2.default.resolve([]);
      }

      return _promise2.default.resolve(matches.map(function (m) {
        var clean = m.trim().toLowerCase();
        return clean;
      }).filter(function (x) {
        return typeof x !== 'undefined';
      }));
    }
  }]);
  return ParseEmails;
})();

var singletonInstance = new ParseEmails({});
var singletonMethod = function singletonMethod(input, opts) {
  return singletonInstance.parse(input, opts);
};

module.exports = singletonMethod;
module.exports.default = singletonMethod;
module.exports.parseEmails = singletonInstance;
module.exports.ParseEmails = ParseEmails;