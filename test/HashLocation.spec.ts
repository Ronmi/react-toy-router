/// <reference path="../typings/globals/mocha/index.d.ts" />
/// <reference path="../typings/globals/chai/index.d.ts" />

import { HashLocation as l } from "../src/HashLocation";
import { LPSpec } from "./LocationProvider.helper";
import * as _ from "lodash";

const expect = chai.expect;

describe("class HashLocation", () => {
    LPSpec(l);
    it("modifies only hash part", () => {
        const w = window.location;
        let old  = _.merge<typeof w>({}, w);
        l.go("qq");
        expect(w.origin).to.equal(old.origin);
        expect(w.pathname).to.equal(old.pathname);
        expect(w.search).to.equal(old.search);
        expect(w.hash).to.equal("#qq");
    });
});
