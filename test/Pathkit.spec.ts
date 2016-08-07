/// <reference path="../typings/globals/mocha/index.d.ts" />
/// <reference path="../typings/globals/chai/index.d.ts" />

import * as p from "../src/Pathkit";

const expect = chai.expect;

interface cases {
    [path: string]: string;
}

function testN(lst: cases) {
    for (let path in lst) {
        let wanted = lst[path];
        expect(p.normalize(path, "/").join("/")).to.deep.equal(wanted);
    }
}

describe("Pathkit", () => {
    describe("normalize()", () => {
        it("breaks path into array", () => {
            const lst: cases = {
                "a": "/a",
                "a/b": "/a/b",
                "a/b/c": "/a/b/c",
            };
            testN(lst);
        });
        it("is empty in first element for rooted path", () => {
            const lst: cases = {
                "/a": "/a",
                "/a/b": "/a/b",
                "/a/b/c": "/a/b/c",
            };
            testN(lst);
        });
        it("handles multiple-slash correctly", () => {
            const lst: cases = {
                "a///b": "/a/b",
                "/a///b": "/a/b",
                "///a///b": "/a/b",
                "a///b//": "/a/b",
                "/a///b//": "/a/b",
                "///a///b//": "/a/b",
            };
            testN(lst);
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
                "/a/../../../../2": "/2",
                "/../a/./3/c/.": "/a/3/c",
            };
            testN(lst);
        });
    });
});
