var express = require('express');
// Helper libraries are supplied if needed
// const _ = require('lodash')
// const r = require('ramda')
const router = express.Router()

// Same state uses the base rate on the weight;
// Different state shipments have a fixed 20% cost increase on top of the previous value (rate on weight);
// Packages can have distinct weight units, either pounds or kilograms.
// Weight needs to be validated on pounds, thus requiring conversion from kg;
// Weight rate is tiered:
// Shipments up to 2 pounds are free;
// When pounds are > 2, each pound will be 1 dollar;
// When pounds are > 20, each pound will be 2 dollars;
// Examples:
// 1 pound shipment will be free;
// 3 pound shipment will be 3 dollars;
// 8 pound shipment will be 8 dollars;
// 25 pound shipment will be 50 dollars;

router.post('/request-shipment', function (req, res, next) {
	// TODO implement based on README

	const shipmentRequest = req.body;
	console.log(`shipmentRequest object is: ${JSON.stringify(shipmentRequest)}`);

	const sameStatePackage = shipmentRequest.shippingAddress.state === shipmentRequest.receivingAddress.state;

	// Iterate packages
	shipmentRequest.packages.forEach(parcel => {
		// Check unit of measurement for weight
		if (parcel.unit === 'KG') {
			// Then convert weight to LB
			// 1 KG = 2.2 LB
			parcel.weight = parcel.weight * 2.2
		}

		if (parcel.weight <= 2) {
			return res.status(200).send({ shipment: { cost: 0 } });
		} else if (parcel.weight > 2 && parcel.weight < 20) {
			let cost = parcel.weight;
			if (!sameStatePackage) {
				cost = outerStatePackageCost(cost);
			}
			return res.status(200).send({ shipment: { cost: cost } });
		} else if (parcel.weight > 20) { // be explicit and declarative for readibility
			const cost = parcel.weight * 2;
			if (!sameStatePackage) {
				cost = outerStatePackageCost(cost);;
			}
			return res.status(200).send({ shipment: { cost: cost } });
		}
	});
});

const outerStatePackageCost = originalCost => originalCost * 1.2;

module.exports = router;
