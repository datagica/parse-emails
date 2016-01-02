const chai = require('chai')
chai.use(require('chai-fuzzy'))
const expect = chai.expect

import parseEmails from '../../lib/parse-emails'

describe('@datagica/email-parser', () => {

    describe('matching emails', () => {
      it('should match simple emails', done => {
        const emails = [{
          input: "specimen@very-fancy.tld",
          output: ["specimen@very-fancy.tld"]
        }, {
          input: "fake.email+0@fake-company.co.hk",
          output: ["fake.email+0@fake-company.co.hk"]
        }, {
          input: "hello@famouscompany.someexpensivetld",
          output: ["hello@famouscompany.someexpensivetld"]
        }]

        Promise.all(emails.map(test => {
          return parseEmails(test.input).then(output => {
            expect(output).to.be.like(test.output)
            return Promise.resolve(true)
          })
        })).then(ended => {
          console.log(`test ended`)
          done()
          return true
        }).catch(exc => {
          console.error(exc)
        })
      })

      it('should match emails mixed with text', done => {
        const emails = [{
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
        }]

        Promise.all(emails.map(test => {
          return parseEmails(test.input).then(output => {
            expect(output).to.be.like(test.output)
            return Promise.resolve(true)
          })
        })).then(ended => {
          console.log(`test ended`)
          done()
          return true
        }).catch(exc => {
          console.error(exc)
        })
      })
    })

})
