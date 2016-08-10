/// <reference path="../typings/globals/mocha/index.d.ts" />
/// <reference path="../typings/globals/chai/index.d.ts" />

import * as React from "react";
import { shallow } from "enzyme";
import Route from "../src/Route";
import { HistoryLocation as l } from "../src/HistoryLocation";

const expect = chai.expect;

describe("<Route />", () => {
    it("show the children if path matches", () => {
	l.go("/test");
	let wrapper = shallow(
	    <Route path="/test" loc={l}>
		<div />
	    </Route>
	);

	expect(wrapper.is("div")).to.be.true;
    });
    it("is empty if path mismatches", () => {
	l.go("/nottest");
	let wrapper = shallow(
	    <Route path="/test" loc={l}>
		<div />
	    </Route>
	);

	expect(wrapper.children()).to.have.length(0);
    });

    describe("regexp", () => {
	describe("strings(:s)", () => {
	    it("accepts strings as-is", () => {
		l.go("/string/test/case");
		let wrapper = shallow(
		    <Route path="/string/:s" loc={l}>
			<div />
		    </Route>
		);

		expect(wrapper.is("div")).to.be.true;
		const args = (wrapper.instance() as Route).args;
		expect(args).to.deep.equal(["test"]);
	    });
	});
	describe("numbers(:n)", () => {
	    function test(path: string, num: number) {
		l.go("/number/" + path);
		let wrapper = shallow(
		    <Route path="/number/:n" loc={l}>
			<div />
		    </Route>
		);

		expect(wrapper.is("div")).to.be.true;
		const args = (wrapper.instance() as Route).args;
		expect(args).to.deep.equal([num]);
	    }

	    it("accepts zero", test.bind({}, "0", 0));
	    it("accepts positive integer like 1", test.bind({}, "1", 1));
	    it("accepts negative integer like -1", test.bind({}, "-1", -1));
	    it("accepts positive float like 0.5", test.bind({}, "0.5", 0.5));
	    it("accepts negative float like -0.5", test.bind({}, "-0.5", -0.5));
	    it("fails on format error", () => {
		l.go("/number/string");
		let wrapper = shallow(
		    <Route path="/number/:n" loc={l}>
			<div />
		    </Route>
		);

		expect(wrapper.children()).to.have.length(0);
	    });
	});
	describe("booleans(:b)", () => {
	    function test(path: string, bool: boolean) {
		l.go("/bool/" + path);
		let wrapper = shallow(
		    <Route path="/bool/:b" loc={l}>
			<div />
		    </Route>
		);

		expect(wrapper.is("div")).to.be.true;
		const args = (wrapper.instance() as Route).args;
		expect(args).to.deep.equal([bool]);
	    }
	    
	    it("accepts false as false", test.bind({}, "false", false));
	    it("accepts f as false", test.bind({}, "f", false));
	    it("accepts n as false", test.bind({}, "n", false));
	    it("accepts 0 as false", test.bind({}, "0", false));
	    it("accepts others as true", test.bind({}, "I can swallow glasses without hurting myself", true));
	    it("is case-insensitive", () => {
		test("False", false);
		test("FALSE", false);
		test("F", false);
		test("N", false);
	    });
	});
    });
});
