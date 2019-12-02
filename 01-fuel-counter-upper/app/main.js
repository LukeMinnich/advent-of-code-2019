'use strict';

let requiredFuel = mass => Math.floor(mass / 3) - 2;

let allRequiredFuel = mass => {
  let requiredAdditionalFuel = requiredFuel(mass);
  return requiredAdditionalFuel > 0 ?
    requiredAdditionalFuel + allRequiredFuel(requiredAdditionalFuel) :
    0;
};

let tests = _ => {
  console.log(`Required fuel for mass of 12: ${allRequiredFuel(12)}`);
  console.log(`Required fuel for mass of 14: ${allRequiredFuel(14)}`);
  console.log(`Required fuel for mass of 1969: ${allRequiredFuel(1969)}`);
  console.log(`Required fuel for mass of a 100756: ${allRequiredFuel(100756)}`);
};

define(function (require) {

  tests();

  let masses = require('./masses');

  let total = masses.data.reduce((sum, mass) => sum + allRequiredFuel(mass), 0);
  console.log(`Total fuel required: ${total}`)
});
