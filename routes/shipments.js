var express = require('express');
// Helper libraries are supplied if needed
// const _ = require('lodash')
// const r = require('ramda')
const router = express.Router()

router.post('/request-shipment', function(req, res, next) {
	// TODO implement based on README
	res.status(200).send({ shipment: { cost: 'Dummy Shipment' } })
});

module.exports = router;
