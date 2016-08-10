"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
const React = require("react");
class Route extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.pathChanged = (path) => {
            this.parse();
        };
        this.state = { show: false };
        this.props.loc.senpai(this.pathChanged);
        this._args = [];
        this._argPos = [];
        this.buildRegexp();
        this.childNode = React.Children.only(this.props.children);
    }
    componentWillMount() {
        this.parse();
    }
    toString(str) {
        return str;
    }
    toBoolean(str) {
        switch (str.toLowerCase()) {
            case "false":
            case "f":
            case "n":
            case "0":
                return false;
        }
        return true;
    }
    toNumber(str) {
        return (new Number(str)).valueOf();
    }
    buildRegexp() {
        const numberRegexp = "(-?[0-9]+(\.[0-9]*[1-9])?)";
        const stringRegexp = "([^/]*)";
        const booleanRegexp = stringRegexp;
        let curPos = 1; // first argument is matched_array[1]
        let arr = this.props.path.split("/").map((v, i) => {
            switch (v) {
                case ":n":
                    this._argPos.push({ pos: curPos, c: this.toNumber });
                    curPos += 2; // needs two entries in matched array
                    return numberRegexp;
                case ":s":
                    this._argPos.push({ pos: curPos, c: this.toString });
                    curPos++;
                    return stringRegexp;
                case ":b":
                    this._argPos.push({ pos: curPos, c: this.toBoolean });
                    curPos++;
                    return booleanRegexp;
            }
            return v;
        });
        this.regexp = new RegExp(arr.join("/"));
    }
    get args() {
        return this._args;
    }
    parse() {
        this._args = [];
        let matched = this.regexp.exec(this.props.loc.current);
        if (!matched) {
            this.show(false);
            return;
        }
        this.show(true);
        let cur = 0;
        for (let pos = 0; pos < matched.length && cur < this._argPos.length; pos++) {
            const argpos = this._argPos[cur];
            if (pos === argpos.pos) {
                this.args.push(argpos.c(matched[pos]));
                cur++;
            }
        }
    }
    render() {
        if (this.state.show) {
            const e = this.childNode;
            if (this.args.length > 0)
                return React.createElement(e.type, __assign({}, e.props, {routerArgs: this.args}));
            return e;
        }
        return null;
    }
    show(visible) {
        if (this.state.show !== visible) {
            this.setState({ show: visible });
        }
    }
}
exports.Route = Route;
//# sourceMappingURL=Route.js.map