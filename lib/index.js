'use strict'

const emailAddresses = require('email-addresses')

class ParseEmails {
  constructor(opts) {
    this.opts = opts instanceof Object ? opts : {}
    this.pattern = /(?:"[^"]{2, 32}")?<?[a-zA-Z0-9\.\-\+]{1,50}@[a-zA-Z0-9\-]{2,50}(?:\.[a-zA-Z0-9\-]{2,20})?(?:\.[a-zA-Z0-9\-]{2,20})?(?:\.[a-zA-Z]{2,20})>?/gi
  }

  // opts are not used yet
  parse(input, opts) {

    if (typeof opts === 'undefined') {
      opts = {}
    }
    let text = ""
    if (typeof input === 'string') {
      text = input
    } else if (typeof input.text === 'string') {
      text = input.text
    } else {
      return Promise.reject(new Error(`input is not text but ${typeof input}`))
    }

    this.pattern.lastIndex = 0
    const matches = text.match(this.pattern)

    if (!Array.isArray(matches) || matches.length === 0) {
      return Promise.resolve([])
    }

    return Promise.resolve(
      matches.map(m => emailAddresses(m).addresses[0]).filter(_ => _).map(mail => ({
        id: `email-${mail.domain}-${mail.local}`,
        label: {
          en: mail.address
        },
        email: mail.address,
        local: mail.local,
        domain: mail.domain,
        keywords: {
          en: [
            'mail',
            'email',
            'address'
          ],
          fr: [
            'email',
            'courrier'
          ]
        }
      })
      )
    )
  }
}


const singletonInstance = new ParseEmails()
const singletonMethod = function() {
  return singletonInstance.parse.apply(singletonInstance, arguments)
}

module.exports = singletonMethod
module.exports.default = singletonMethod
module.exports.parseEmails = singletonInstance
module.exports.ParseEmails = ParseEmails
