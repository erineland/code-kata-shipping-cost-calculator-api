# Shipping System
Your goal is to implement a basic shipping system with a NodeJS backend.
You'll be given requirements along with a pre-made project skeleton.
Implementation details are mostly up to you but a few choices and suggestions were made in order to help you in your goal.

The shipping system should be able to create shipments. For this test, no storage needs to be created.
Instead, we'll focus on creating and testing the response only.

# Goals
The main goal is to realize the idea of a system that can generate and handle the shipment creation process.

## Shipment Creation
The focus of this task is finding out the **correct cost** of a shipment. Aspects such as "time of delivery", surcharges and others are out of scope.

#### Cost business rules
* Same state uses the base rate on the weight;
* Different state shipments have a fixed 20% cost increase on top of the previous value (rate on weight);
* Packages can have distinct weight units, either pounds or kilograms.
* Weight needs to be validated on pounds, thus requiring conversion from kg;
* Weight rate is tiered:
  * Shipments up to 2 pounds are free;
  * When pounds are > 2, each pound will be 1 dollar;
  * When pounds are > 20, each pound will be 2 dollars;
  * Examples:
      * 1 pound shipment will be free;
      * 3 pound shipment will be 3 dollars;
      * 8 pound shipment will be 8 dollars;
      * 25 pound shipment will be 50 dollars;

## Models
Example models expected in the application, in pseudo-code.
```
Address = {
  addressName: String
  state: String
  name: String
}

Package = {
  name: String
  weight: Number
  unit: String, either LB or KG
}

ShipmentRequest = {
  shippingAddress: Address, required
  receivingAddress: Address, required
  packages: [ Package... ], required, lenght: >= 1
}

Shipment = {
  cost: Number, required, round to 3 digits
}
```
## Validations
* Validations are reserved for a future task. Focus on the cost calculation algorithm. 

## Inputs and outputs
With the source code, input and output samples are provided to power the tests. These can be used as documentation as well.

After submitting the code to Devskiller, a few other samples will be used, along with the ones provided.

These will contain common edge cases, situations with non-perfect client requests and, most importantly, different permutations of the base input.
Ensure that the implementation is robust beyond the provided tests.