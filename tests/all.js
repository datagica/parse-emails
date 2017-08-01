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
							"id": "email-very-fancy.tld-specimen",
							"label": {
								"en": "specimen@very-fancy.tld"
							},
							"email": "specimen@very-fancy.tld",
              "domain": "very-fancy.tld",
              "local": "specimen",
							keywords: {
								en: [
									'mail', 'email', 'address'
								],
								fr: ['email', 'courrier']
							}
						}
					]
				}, {
					input: "fake.email+0@fake-company.co.hk",
					output: [
						{
							"id": "email-fake-company.co.hk-fake.email+0",
							"label": {
								"en": "fake.email+0@fake-company.co.hk"
							},
							"email": "fake.email+0@fake-company.co.hk",
              "domain": "fake-company.co.hk",
              "local": "fake.email+0",
							keywords: {
								en: [
									'mail', 'email', 'address'
								],
								fr: ['email', 'courrier']
							}
						}
					]
				}, {
					input: "hello@famouscompany.someexpensivetld",
					output: [
						{
							"id": "email-famouscompany.someexpensivetld-hello",
							"label": {
								"en": "hello@famouscompany.someexpensivetld"
							},
							"email": "hello@famouscompany.someexpensivetld",
              "domain": "famouscompany.someexpensivetld",
              "local": "hello",
							keywords: {
								en: [
									'mail', 'email', 'address'
								],
								fr: ['email', 'courrier']
							}
						}
					]
				}
			]

			Promise.all(emails.map(test => {
				return parseEmails(test.input).then(output => {
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
							"id": "email-very-fancy.tld-specimen",
							"label": {
								"en": "specimen@very-fancy.tld"
							},
							"email": "specimen@very-fancy.tld",
              "domain": "very-fancy.tld",
              "local": "specimen",
							keywords: {
								en: [
									'mail', 'email', 'address'
								],
								fr: ['email', 'courrier']
							}
						}
					]
				}, {
					input: "lorem ipsum fake.email+0@fake-company.co.hk sit amet",
					output: [
						{
							"id": "email-fake-company.co.hk-fake.email+0",
							"label": {
								"en": "fake.email+0@fake-company.co.hk"
							},
							"email": "fake.email+0@fake-company.co.hk",
              "domain": "fake-company.co.hk",
              "local": "fake.email+0",
							keywords: {
								en: [
									'mail', 'email', 'address'
								],
								fr: ['email', 'courrier']
							}
						}
					]
				}, {
					input: "you can contact me at hello@famouscompany.someexpensivetld, thanks!",
					output: [
						{
							"id": "email-famouscompany.someexpensivetld-hello",
							"label": {
								"en": "hello@famouscompany.someexpensivetld"
							},
							"email": "hello@famouscompany.someexpensivetld",
              "domain": "famouscompany.someexpensivetld",
              "local": "hello",
							keywords: {
								en: [
									'mail', 'email', 'address'
								],
								fr: ['email', 'courrier']
							}
						}
					]
				}, {
					input: "you can contact me at weird.mail@aaa.bbb.ac.il, thanks!",
					output: [
						{
							"id": "email-aaa.bbb.ac.il-weird.mail",
							"label": {
								"en": "weird.mail@aaa.bbb.ac.il"
							},
							"email": "weird.mail@aaa.bbb.ac.il",
              "domain": "aaa.bbb.ac.il",
              "local": "weird.mail",
							keywords: {
								en: [
									'mail', 'email', 'address'
								],
								fr: ['email', 'courrier']
							}
						}
					]
				},, {
					input: `you can contact me at <weird.mail@aaa.bbb.ac.il>, thanks!`,
					output: [
						{
							"id": "email-aaa.bbb.ac.il-weird.mail",
							"label": {
								"en": "weird.mail@aaa.bbb.ac.il"
							},
							"email": "weird.mail@aaa.bbb.ac.il",
              "domain": "aaa.bbb.ac.il",
              "local": "weird.mail",
							keywords: {
								en: [
									'mail', 'email', 'address'
								],
								fr: ['email', 'courrier']
							}
						}
					]
				}, {
					input: `you can contact me at "John Doe" <weird.mail@aaa.bbb.ac.il>, thanks!`,
					output: [
						{
							"id": "email-aaa.bbb.ac.il-weird.mail",
							"label": {
								"en": "weird.mail@aaa.bbb.ac.il"
							},
							"email": "weird.mail@aaa.bbb.ac.il",
              "domain": "aaa.bbb.ac.il",
              "local": "weird.mail",
							keywords: {
								en: [
									'mail', 'email', 'address'
								],
								fr: ['email', 'courrier']
							}
						}
					]
				},, {
					// this syntax is not supported, since we are in a sentence mixed with
					// words it is too ambiguous
					input: `you can contact me at John Doe <weird.mail@aaa.bbb.ac.il>, thanks!`,
					output: [
						{
							"id": "email-aaa.bbb.ac.il-weird.mail",
							"label": {
								"en": "weird.mail@aaa.bbb.ac.il"
							},
							"email": "weird.mail@aaa.bbb.ac.il",
              "domain": "aaa.bbb.ac.il",
              "local": "weird.mail",
							keywords: {
								en: [
									'mail', 'email', 'address'
								],
								fr: ['email', 'courrier']
							}
						}
					]
				}, {
					// should we support this syntax? maybe not..
					input: `you can contact me at "John Doe" weird.mail@aaa.bbb.ac.il, thanks!`,
					output: [
						{
							"id": "email-aaa.bbb.ac.il-weird.mail",
							"label": {
								"en": "weird.mail@aaa.bbb.ac.il"
							},
							"email": "weird.mail@aaa.bbb.ac.il",
              "domain": "aaa.bbb.ac.il",
              "local": "weird.mail",
							keywords: {
								en: [
									'mail', 'email', 'address'
								],
								fr: ['email', 'courrier']
							}
						}
					]
				}
			]

			Promise.all(emails.map(test => {
				return parseEmails(test.input).then(output => {
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
