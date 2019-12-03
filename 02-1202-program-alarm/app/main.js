'use strict';

let code1Operation = (arr, a, b) => arr[a] + arr[b];
let code2Operation = (arr, a, b) => arr[a] * arr[b];

let gravityAssistRestore = arr => {

  let reachedExitCode = false, i = 0;
  
  while (!reachedExitCode) {
    let firstFour = arr.slice(4 * i, 4 * i + 4);
    i++;

    switch (firstFour[0]) {
      case 1:
        arr[firstFour[3]] = code1Operation(arr, firstFour[1], firstFour[2])
        break;
      case 2:
        arr[firstFour[3]] = code2Operation(arr, firstFour[1], firstFour[2])
        break;
      case 99:
      default:
        reachedExitCode = true;
    }
  }
  return arr[0];
};

let getOutputCode = (arr, noun, verb) => {
  arr[1] = noun;
  arr[2] = verb;
  return gravityAssistRestore(arr)
}

let tests = _ => {
  console.log(gravityAssistRestore([1,0,0,0,99]));
  console.log(gravityAssistRestore([2,3,0,3,99]));
  console.log(gravityAssistRestore([2,4,4,5,99,0]));
  console.log(gravityAssistRestore([1,1,1,4,99,5,6,0,99]));
};

define(function (require) {

  let programState = require('./program-state');

  outermostLoop:
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      let copy = [...programState.data];
      if (getOutputCode(copy, i, j) === 19690720){
        console.log(`found match at i=${i}\tj=${j}`);
        console.log(100 * i + j);
        break outermostLoop;
      }
    }
  }

  console.log(`reached end`)
});
