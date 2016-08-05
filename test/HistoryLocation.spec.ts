/// <reference path="../typings/globals/mocha/index.d.ts" />
/// <reference path="../typings/globals/chai/index.d.ts" />

import { HistoryLocation } from "../src/HistoryLocation";
import { LPSpec } from "./LocationProvider.helper";

const expect = chai.expect;

describe("class HistoryLocation", () => {
    LPSpec(HistoryLocation);
});
