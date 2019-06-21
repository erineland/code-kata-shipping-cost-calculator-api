const request = require('supertest')
const app = require('../app')

describe('Express app', () => {
	it('should respond to a get', async () => {
		const response = await request(app).get('/')
		expect(response.statusCode).toEqual(200)
	})
})
