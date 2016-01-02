'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _parseEmails = require('../../lib/parse-emails');

var _parseEmails2 = _interopRequireDefault(_parseEmails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chai = require('chai');
chai.use(require('chai-fuzzy'));
var expect = chai.expect;

describe('@datagica/parse-emails', function () {

  describe('matching emails', function () {
    it('should match simple emails', function (done) {
      var emails = [{
        input: "specimen@very-fancy.tld",
        output: ["specimen@very-fancy.tld"]
      }, {
        input: "fake.email+0@fake-company.co.hk",
        output: ["fake.email+0@fake-company.co.hk"]
      }, {
        input: "hello@famouscompany.someexpensivetld",
        output: ["hello@famouscompany.someexpensivetld"]
      }];

      _promise2.default.all(emails.map(function (test) {
        return (0, _parseEmails2.default)(test.input).then(function (output) {
          expect(output).to.be.like(test.output);
          return _promise2.default.resolve(true);
        });
      })).then(function (ended) {
        console.log('test ended');
        done();
        return true;
      }).catch(function (exc) {
        console.error(exc);
      });
    });

    it('should match emails mixed with text', function (done) {
      var emails = [{
        input: "email: specimen@very-fancy.tld blabla",
        output: ["specimen@very-fancy.tld"]
      }, {
        input: "lorem ipsum fake.email+0@fake-company.co.hk sit amet",
        output: ["fake.email+0@fake-company.co.hk"]
      }, {
        input: "you can contact me at hello@famouscompany.someexpensivetld, thanks!",
        output: ["hello@famouscompany.someexpensivetld"]
      }, {
        input: "you can contact me at weird.mail@aaa.bbb.ac.il, thanks!",
        output: ["weird.mail@aaa.bbb.ac.il"]
      }];

      _promise2.default.all(emails.map(function (test) {
        return (0, _parseEmails2.default)(test.input).then(function (output) {
          expect(output).to.be.like(test.output);
          return _promise2.default.resolve(true);
        });
      })).then(function (ended) {
        console.log('test ended');
        done();
        return true;
      }).catch(function (exc) {
        console.error(exc);
      });
    });
  });
});