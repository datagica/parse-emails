'use strict'

const tokenize  = require('@datagica/tokenize')()
const emailAddresses = require('email-addresses')

function algorithm ({
    sentence,   // the chunk (ie. the actual piece of text)
    positions,  // global positions of sentences, words, characters
    results     // buffer to collect the results
  }) {
    const lastWordPosition = positions.word
    let match

    const pattern = /(?:"[^"]{2, 32}")?<?[a-zA-Z0-9\.\-\+]{1,50}@[a-zA-Z0-9\-]{2,50}(?:\.[a-zA-Z0-9\-]{2,20})?(?:\.[a-zA-Z0-9\-]{2,20})?(?:\.[a-zA-Z]{2,20})>?/gi

    while (match = pattern.exec(sentence)) {

      const ngram = match[0].trim()
      
      const mail = emailAddresses(ngram).addresses[0]
      if (!mail) { continue }

      const entity = {
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
      }

      const nbWords = sentence.slice(0, pattern.lastIndex)
                              .split(/[ \r\n]/g)
                              .length

      results.push({
        ngram: ngram,
        value: entity,
        score: 1,
        position: {
          sentence: positions.sentence,
          word    : lastWordPosition    + nbWords,
          begin   : positions.character + pattern.lastIndex,
          end     : positions.character + pattern.lastIndex + ngram.length
        }
      })
    }
}
function parseEmails(input) {
  return Promise.resolve(tokenize(input, algorithm, []))
}

module.exports = parseEmails.default = parseEmails
