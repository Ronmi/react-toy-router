/// <reference path="../typings/globals/mocha/index.d.ts" />
/// <reference path="../typings/globals/chai/index.d.ts" />

import * as p from "../src/Pathkit";

const expect = chai.expect;

interface cases {
    [path: string]: string;
}

function testN(lst: cases, base: string = "/") {
    for (let path in lst) {
        let wanted = lst[path];
        expect(p.normalize(path, base)).to.equal(wanted);
    }
}

describe("Pathkit", () => {
    describe("normalize()", () => {
        it("is same for rooted, simple file path", () => {
            const lst: cases = {
                "/a": "/a",
                "/a/b": "/a/b",
                "/a/b/c": "/a/b/c",
            };
            testN(lst);
        });
        it("is same for rooted, simple dir path", () => {
            const lst: cases = {
                "/a/": "/a/",
                "/a/b/": "/a/b/",
                "/a/b/c/": "/a/b/c/",
            };
            testN(lst);
        });
        it("concates the basement (as dir) for non-rooted, simple file path", () => {
            const lst: cases = {
                "a": "/asd/a",
                "a/b": "/asd/a/b",
                "a/b/c": "/asd/a/b/c",
            };
            testN(lst, "/asd");
        });
        it("concates the basement (as dir) for non-rooted, simple dir path", () => {
            const lst: cases = {
                "a/": "/asd/a/",
                "a/b/": "/asd/a/b/",
                "a/b/c/": "/asd/a/b/c/",
            };
            testN(lst, "/asd");
        });
        it("strips multiple-slash", () => {
            const lst: cases = {
                "a///b": "/asd/a/b",
                "/a///b": "/a/b",
                "///a///b": "/a/b",
                "a///b//": "/asd/a/b/",
                "/a///b//": "/a/b/",
                "///a///b//": "/a/b/",
            };
            testN(lst, "/asd");
        });
        it("handles .. correctly", () => {
            const lst: cases = {
                "a/../1": "/1",
                "/a/../../../b": "/b",
                "/a/../2": "/2",
                "/../a/../3/c/..": "/3",
            };
            testN(lst);
        });
        it("handles . correctly", () => {
            const lst: cases = {
                "./1": "/1",
                "/b/.": "/b",
                "/a/././.././2": "/2",
                "/../a/./3/c/.": "/a/3/c",
            };
            testN(lst);
        });
    });
});
