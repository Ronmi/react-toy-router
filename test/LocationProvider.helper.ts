/// <reference path="../typings/globals/mocha/index.d.ts" />
/// <reference path="../typings/globals/chai/index.d.ts" />
/// <reference path="../typings/globals/chai-as-promised/index.d.ts" />
/// <reference path="../typings/globals/promises-a-plus/index.d.ts" />

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
                window.history.replaceState(null, null, oldLocation);
            }
        });

        it("does not change window.location with absolute path", () => {
            let old = window.location.href;
            l.go("http://google.com/");
            expect(window.location.href).to.deep.equal(old);
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
            }
        });

        interface cases {
            [path: string]: string;
        };

        describe("path handling", () => {
            it("handles rooted simple file path", () => {
                const lst: cases = {
                    "/a": "/a",
                    "/a/b": "/a/b",
                    "/a/b/c": "/a/b/c",
                };

                for (let test in lst) {
                    l.go(test);
                    expect(l.current).to.equal(lst[test]);
                }
            });
            it("handles rooted simple dir path", () => {
                const lst: cases = {
                    "/a/": "/a/",
                    "/a/b/": "/a/b/",
                    "/a/b/c/": "/a/b/c/",
                };

                for (let test in lst) {
                    l.go(test);
                    expect(l.current).to.equal(lst[test]);
                }
            });
            it("handles non-rooted simple file path", () => {
                const lst: cases = {
                    "aluba": "/asd/aluba",
                    "a/b": "/asd/a/b",
                    "a/b/c": "/asd/a/b/c",
                };

                for (let test in lst) {
                    l.go("/asd/");
                    l.go(test);
                    expect(l.current).to.equal(lst[test]);
                }
            });
            it("handles non-rooted simple dir path", () => {
                const lst: cases = {
                    "aluba/": "/asd/aluba/",
                    "a/b/": "/asd/a/b/",
                    "a/b/c/": "/asd/a/b/c/",
                };

                for (let test in lst) {
                    l.go("/asd/");
                    l.go(test);
                    expect(l.current).to.equal(lst[test]);
                }
            });
            it("handles multiple slashes", () => {
                const lst: cases = {
                    "aluba///": "/asd/aluba/",
                    "a////b": "/asd/a/b",
                    "///a////b////c": "/a/b/c",
                };

                for (let test in lst) {
                    l.go("/asd/");
                    l.go(test);
                    expect(l.current).to.equal(lst[test]);
                }
            });
            it("handles ..", () => {
                const lst: cases = {
                    "..": "/",
                    "a/../b": "/asd/b",
                    "a/b/..": "/asd/a/",
                };

                for (let test in lst) {
                    l.go("/asd/");
                    l.go(test);
                    expect(l.current).to.equal(lst[test]);
                }
            });
            it("handles .", () => {
                const lst: cases = {
                    ".": "/asd/",
                    "a/./b": "/asd/a/b",
                    "a/b/.": "/asd/a/b/",
                };

                for (let test in lst) {
                    l.go("/asd/");
                    l.go(test);
                    expect(l.current).to.equal(lst[test]);
                }
            });
        });
    });
}
