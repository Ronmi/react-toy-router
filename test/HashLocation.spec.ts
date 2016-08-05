/// <reference path="../typings/globals/mocha/index.d.ts" />
/// <reference path="../typings/globals/chai/index.d.ts" />

import { HashLocation } from "../src/HashLocation";
import { LPSpec } from "./LocationProvider.helper";

const expect = chai.expect;

describe("class HashLocation", () => {
    LPSpec(HashLocation);
});
