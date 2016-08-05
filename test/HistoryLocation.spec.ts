/// <reference path="../typings/globals/mocha/index.d.ts" />
/// <reference path="../typings/globals/chai/index.d.ts" />

import { HistoryLocation as l } from "../src/HistoryLocation";
import { LPSpec } from "./LocationProvider.helper";
import * as _ from "lodash";

const expect = chai.expect;

describe("class HistoryLocation", () => {
    LPSpec(l);
    it("clears search and hash parts, and changes pathname part", () => {
        const w = window.location;
        let old  = _.merge<typeof w>({}, w);
        l.go("/qq");
        expect(w.origin).to.equal(old.origin);
        expect(w.search).to.be.empty;
        expect(w.hash).to.be.empty;
        expect(w.pathname).to.equal("/qq");
    });
});
