class ParseEmails {
  constructor(opts = {}) {
    this.opts = opts
    this.pattern = new RegExp(
      "[a-zA-Z0-9\\.\\-\\+]{1,50}@[a-zA-Z0-9\\-]{2,50}(?:\\.[a-zA-Z0-9\\-]{2,20})?(?:\\.[a-zA-Z0-9\\-]{2,20})?(?:\\.[a-zA-Z]{2,20})",
      "g"
    )
  }

  // opts are not used yet
  parse(input, opts = {}) {

    let text = ""
    if (typeof input === 'string') {
      text = input
    } else if (typeof input.text === 'string') {
      text = input.text
    } else {
      throw new Error(`input is not text but ${typeof input}`)
    }

    const matches = text.match(this.pattern)
    if (
      (typeof matches === 'undefined' || matches === null) || (typeof matches.length === 'undefined') || (matches.length == 0)) {
      return Promise.resolve([])
    }

    return Promise.resolve(
      matches
      .map(m => {
        const clean = m.trim().toLowerCase()
        return clean
      })
      .filter(x => (typeof x !== 'undefined'))
    )
  }
}


const singletonInstance = new ParseEmails({})
const singletonMethod = function(input, opts) {
  return singletonInstance.parse(input, opts)
}

module.exports = singletonMethod
module.exports.default = singletonMethod
module.exports.parseEmails = singletonInstance
module.exports.ParseEmails = ParseEmails
