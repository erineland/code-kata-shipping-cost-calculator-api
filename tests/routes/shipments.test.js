const request = require('supertest')
const app = require('../../app')
const validRequests = require('../requests/requests.json')

const validShipmentsIndex = Object.keys(validRequests)

const createTestsMeta = function(index, map) {
	return index.map(key => {
		return [key, map[key].shipment_request, map[key].shipment]
	})
}

describe('Valid shipment requests', () => {
	it.each(createTestsMeta(validShipmentsIndex, validRequests))(
		'Scenario: %s',
		async (key, shipment_request, shipment) => {
			const response = await request(app).post('/shipments/request-shipment').send(shipment_request)
				.set('Accept', 'application/json')
			expect(response.body).toEqual({ shipment })
	})
})
