/// <reference path="../typings/globals/mocha/index.d.ts" />
/// <reference path="../typings/globals/chai/index.d.ts" />

import * as _ from "lodash";
import { LocationProvider } from "../src/LocationProvider";

const expect = chai.expect;

export function LPSpec(l: LocationProvider): void {
    describe("implements LocationProvider", () => {
        let oldLocation: string;
        beforeEach("record old location", () => {
            oldLocation = window.location.href;
        });
        afterEach("restore location", () => {
            if (window.location.href !== oldLocation) {
                window.history.go(-1);
            }
        });

        it("does not change window.location with absolute path", () => {
            let old = _.merge({}, window.location);
            l.go("http://google.com/");
            expect(window.location).to.deep.equal(old);
        });
        it("changes window.location with relative path", () => {
            let old = window.location.href;
            l.go("/test/location/provider/");
            expect(window.location.href).not.to.equal(old);
        });

        it("can detect current path", () => {
            const lst: string[] = [
                "/test",
                "/a/b",
            ];
            for (let test of lst) {
                l.go(test);
                expect(l.current).to.equals(test);
                window.history.go(-1);
            }
        });
    });
}
