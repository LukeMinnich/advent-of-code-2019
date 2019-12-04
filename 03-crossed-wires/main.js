'use strict';

let Coordinate = require('./coordinate.js');
let PathIntersection = require('./path-intersection.js');
let pathA = require('./path-a');
let pathB = require('./path-b');

function getLastValue(set) {
  let value;
  for (value of set);
  return value;
}

function generatePath(start, dist, x, y) {
  let path = [];
  for (let i = 1; i <= dist; i++) {
    path.push(new Coordinate(start.x + i * x, start.y + i * y));
  }
  return path;
}

function pathSegmentDirection(pathSegment) {
  return pathSegment.substr(0, 1).toUpperCase();
}

function pathSegmentLength(pathSegment) {
  return parseInt(pathSegment.substr(1));
}

function pickPath(start, dir, length) {
  switch (dir) {
    case 'U':
      return generatePath(start, length, 0, 1)
    case 'D':
      return generatePath(start, length, 0, -1)
    case 'L':
      return generatePath(start, length, -1, 0)
    case 'R':
      return generatePath(start, length, 1, 0)
    default:
      console.error(`unexpected direction: ${dir}`);
  }
}

function addPathToSet(set, pathSegment) {

  let start = Coordinate.fromString(getLastValue(set));
  let dir = pathSegmentDirection(pathSegment);
  let length = pathSegmentLength(pathSegment);

  let generatedPath = pickPath(start, dir, length);

  generatedPath.forEach(coordinate => set.add(coordinate.toString()));
}

function traverseAllPaths(pathData) {
  let set = new Set();
  set.add(new Coordinate(0, 0).toString());
  pathData.forEach(pathSegment => addPathToSet(set, pathSegment));
  return set;
}

function traverseToIntersections(pathData, intersections) {
  let pathIntersections = [];
  let distanceTraveled = 0;
  let start = new Coordinate(0, 0);
  for (let pathSegment of pathData) {

    let dir = pathSegmentDirection(pathSegment);
    let length = pathSegmentLength(pathSegment);

    let generatedPath = pickPath(start, dir, length);
    let coordStrings = generatedPath.map(coord => coord.toString());

    coordStrings.forEach(str => {
      if (intersections.has(str)) {
        let intersection = Coordinate.fromString(str);
        let distance = distanceTraveled + Math.abs(intersection.x - start.x) + Math.abs(intersection.y - start.y);
        pathIntersections.push(new PathIntersection(str, distance));
      }
    });

    distanceTraveled += length;
    start = generatedPath.slice(-1)[0];
  }

  return pathIntersections;
}

let tests = _ => {
  let test01 = ["R75", "D30", "R83", "U83", "L12", "D49", "R71", "U7", "L72", "U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"];
  let set01 = traverseAllPaths(test01);
};

tests();

// Part 01
let setA = traverseAllPaths(pathA.data);
let setB = traverseAllPaths(pathB.data);

let intersectionsArr = Array.from([...setA].filter(x => setB.has(x)));

let orderedIntersections = intersectionsArr
  .map(i => Coordinate.fromString(i).taxiDistance())
  .sort((a, b) => a <= b ? -1 : 1)

console.log(`Nearest intersection: ${orderedIntersections[1]}`);

// Part 02
let intersectionsSet = new Set(intersectionsArr);

let pathAIntersections = traverseToIntersections(pathA.data, intersectionsSet);
let pathBIntersections = traverseToIntersections(pathB.data, intersectionsSet);

let sortedA = pathAIntersections.sort((a, b) => a.coordinateString <= b.coordinateString ? -1 : 1);
let sortedB = pathBIntersections.sort((a, b) => a.coordinateString <= b.coordinateString ? -1 : 1);

let shortest = Infinity;

for (let i = 1; i < sortedA.length; i++) {
  let a = sortedA[i];
  let b = sortedB[i];

  if (a.steps + b.steps < shortest) shortest = a.steps + b.steps;  
}

console.log(`Shortest path to intersection: ${shortest}`);
