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
});
