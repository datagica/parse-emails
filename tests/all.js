const chai = require('chai')
chai.use(require('chai-fuzzy'))
const expect = chai.expect

const parseEmails = require("../lib/index");

describe('@datagica/parse-emails', () => {

  describe('matching emails', () => {
    it('should match simple emails', done => {
      const emails = [
        {
          input: "specimen@very-fancy.tld",
          output: [
            {
              "ngram": "specimen@very-fancy.tld",
              "value": {
                "id": "email-very-fancy.tld-specimen",
                "label": {
                  "en": "specimen@very-fancy.tld"
                },
                "email": "specimen@very-fancy.tld",
                "local": "specimen",
                "domain": "very-fancy.tld",
                "keywords": {
                  "en": [
                    "mail", "email", "address"
                  ],
                  "fr": ["email", "courrier"]
                }
              },
              "score": 1,
              "position": {
                "sentence": 0,
                "word": 1,
                "begin": 23,
                "end": 46
              }
            }
          ]
        }, {
          input: "fake.email+0@fake-company.co.hk",
          output: [
            {
              "ngram": "fake.email+0@fake-company.co.hk",
              "value": {
                "id": "email-fake-company.co.hk-fake.email+0",
                "label": {
                  "en": "fake.email+0@fake-company.co.hk"
                },
                "email": "fake.email+0@fake-company.co.hk",
                "local": "fake.email+0",
                "domain": "fake-company.co.hk",
                "keywords": {
                  "en": [
                    "mail", "email", "address"
                  ],
                  "fr": ["email", "courrier"]
                }
              },
              "score": 1,
              "position": {
                "sentence": 0,
                "word": 1,
                "begin": 31,
                "end": 62
              }
            }
          ]
        }, {
          input: "hello@famouscompany.someexpensivetld",
          output: [
            {
              "ngram": "hello@famouscompany.someexpensivetld",
              "value": {
                "id": "email-famouscompany.someexpensivetld-hello",
                "label": {
                  "en": "hello@famouscompany.someexpensivetld"
                },
                "email": "hello@famouscompany.someexpensivetld",
                "local": "hello",
                "domain": "famouscompany.someexpensivetld",
                "keywords": {
                  "en": [
                    "mail", "email", "address"
                  ],
                  "fr": ["email", "courrier"]
                }
              },
              "score": 1,
              "position": {
                "sentence": 0,
                "word": 1,
                "begin": 36,
                "end": 72
              }
            }
          ]
        }
      ]

      Promise.all(emails.map(test => {
        return parseEmails(test.input).then(output => {
          // console.log("OUTPUT: "+JSON.stringify(output, null, 2))
          expect(output).to.be.like(test.output)
          return Promise.resolve(true)
        })
      })).then(ended => {
        // console.log(`test ended`)
        done()
        return true
      }).catch(exc => done(exc))
    })

    it('should match emails mixed with text', done => {
      const emails = [
        {
          input: "email: specimen@very-fancy.tld blabla",
          output: [
            {
              "ngram": "specimen@very-fancy.tld",
              "value": {
                "id": "email-very-fancy.tld-specimen",
                "label": {
                  "en": "specimen@very-fancy.tld"
                },
                "email": "specimen@very-fancy.tld",
                "local": "specimen",
                "domain": "very-fancy.tld",
                "keywords": {
                  "en": [
                    "mail", "email", "address"
                  ],
                  "fr": ["email", "courrier"]
                }
              },
              "score": 1,
              "position": {
                "sentence": 0,
                "word": 2,
                "begin": 30,
                "end": 53
              }
            }
          ]
        }, {
          input: "lorem ipsum fake.email+0@fake-company.co.hk sit amet",
          output: [
            {
              "ngram": "fake.email+0@fake-company.co.hk",
              "value": {
                "id": "email-fake-company.co.hk-fake.email+0",
                "label": {
                  "en": "fake.email+0@fake-company.co.hk"
                },
                "email": "fake.email+0@fake-company.co.hk",
                "local": "fake.email+0",
                "domain": "fake-company.co.hk",
                "keywords": {
                  "en": [
                    "mail", "email", "address"
                  ],
                  "fr": ["email", "courrier"]
                }
              },
              "score": 1,
              "position": {
                "sentence": 0,
                "word": 3,
                "begin": 43,
                "end": 74
              }
            }
          ]
        }, {
          input: "you can contact me at hello@famouscompany.someexpensivetld, thanks!",
          output: [
            {
              "ngram": "hello@famouscompany.someexpensivetld",
              "value": {
                "id": "email-famouscompany.someexpensivetld-hello",
                "label": {
                  "en": "hello@famouscompany.someexpensivetld"
                },
                "email": "hello@famouscompany.someexpensivetld",
                "local": "hello",
                "domain": "famouscompany.someexpensivetld",
                "keywords": {
                  "en": [
                    "mail", "email", "address"
                  ],
                  "fr": ["email", "courrier"]
                }
              },
              "score": 1,
              "position": {
                "sentence": 0,
                "word": 6,
                "begin": 58,
                "end": 94
              }
            }
          ]
        }, {
          input: "you can contact me at weird.mail@aaa.bbb.ac.il, thanks!",
          output: [
            {
              "ngram": "weird.mail@aaa.bbb.ac.il",
              "value": {
                "id": "email-aaa.bbb.ac.il-weird.mail",
                "label": {
                  "en": "weird.mail@aaa.bbb.ac.il"
                },
                "email": "weird.mail@aaa.bbb.ac.il",
                "local": "weird.mail",
                "domain": "aaa.bbb.ac.il",
                "keywords": {
                  "en": [
                    "mail", "email", "address"
                  ],
                  "fr": ["email", "courrier"]
                }
              },
              "score": 1,
              "position": {
                "sentence": 0,
                "word": 6,
                "begin": 46,
                "end": 70
              }
            }
          ]
        }, {
          input: `you can contact me at <weird.mail@aaa.bbb.ac.il>, thanks!`,
          output: [
            {
              "ngram": "<weird.mail@aaa.bbb.ac.il>",
              "value": {
                "id": "email-aaa.bbb.ac.il-weird.mail",
                "label": {
                  "en": "weird.mail@aaa.bbb.ac.il"
                },
                "email": "weird.mail@aaa.bbb.ac.il",
                "local": "weird.mail",
                "domain": "aaa.bbb.ac.il",
                "keywords": {
                  "en": [
                    "mail", "email", "address"
                  ],
                  "fr": ["email", "courrier"]
                }
              },
              "score": 1,
              "position": {
                "sentence": 0,
                "word": 6,
                "begin": 48,
                "end": 74
              }
            }
          ]
        }, {
          input: `you can contact me at "John Doe" <weird.mail@aaa.bbb.ac.il>, thanks!`,
          output: [
            {
              "ngram": "<weird.mail@aaa.bbb.ac.il>",
              "value": {
                "id": "email-aaa.bbb.ac.il-weird.mail",
                "label": {
                  "en": "weird.mail@aaa.bbb.ac.il"
                },
                "email": "weird.mail@aaa.bbb.ac.il",
                "local": "weird.mail",
                "domain": "aaa.bbb.ac.il",
                "keywords": {
                  "en": [
                    "mail", "email", "address"
                  ],
                  "fr": ["email", "courrier"]
                }
              },
              "score": 1,
              "position": {
                "sentence": 0,
                "word": 8,
                "begin": 59,
                "end": 85
              }
            }
          ]
        }, {
          // this syntax is not supported, since we are in a sentence mixed with
          // words it is too ambiguous
          input: `you can contact me at John Doe <weird.mail@aaa.bbb.ac.il>, thanks!`,
          output: [
            {
              "ngram": "<weird.mail@aaa.bbb.ac.il>",
              "value": {
                "id": "email-aaa.bbb.ac.il-weird.mail",
                "label": {
                  "en": "weird.mail@aaa.bbb.ac.il"
                },
                "email": "weird.mail@aaa.bbb.ac.il",
                "local": "weird.mail",
                "domain": "aaa.bbb.ac.il",
                "keywords": {
                  "en": [
                    "mail", "email", "address"
                  ],
                  "fr": ["email", "courrier"]
                }
              },
              "score": 1,
              "position": {
                "sentence": 0,
                "word": 8,
                "begin": 57,
                "end": 83
              }
            }
          ]
        }, {
          // should we support this syntax? maybe not..
          input: `you can contact me at "John Doe" weird.mail@aaa.bbb.ac.il, thanks!`,
          output: [
            {
              "ngram": "weird.mail@aaa.bbb.ac.il",
              "value": {
                "id": "email-aaa.bbb.ac.il-weird.mail",
                "label": {
                  "en": "weird.mail@aaa.bbb.ac.il"
                },
                "email": "weird.mail@aaa.bbb.ac.il",
                "local": "weird.mail",
                "domain": "aaa.bbb.ac.il",
                "keywords": {
                  "en": [
                    "mail", "email", "address"
                  ],
                  "fr": ["email", "courrier"]
                }
              },
              "score": 1,
              "position": {
                "sentence": 0,
                "word": 8,
                "begin": 57,
                "end": 81
              }
            }
          ]
        }
      ]

      Promise.all(emails.map(test => {
        return parseEmails(test.input).then(output => {
          console.log("OUTPUT: " + JSON.stringify(output, null, 2))
          expect(output).to.be.like(test.output)
          return Promise.resolve(true)
        })
      })).then(ended => {
        //console.log(`test ended`)
        done()
        return true
      }).catch(exc => done(exc))
    })
  })

})
