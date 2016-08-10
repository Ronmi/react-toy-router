import * as React from "react";
import { LocationProvider } from "./LocationProvider";

export interface RouteProps {
    path: string;
    loc: LocationProvider;
}

export interface RouteState {
    show?: boolean;
}

export type ArgType = number | string | boolean;

export interface RoutableProps {
    routerArgs?: ArgType[];
}

interface position {
    pos: number;
    c: (str: string) => ArgType;
}

export class Route extends React.Component<RouteProps, RouteState> {
    private regexp: RegExp;
    private childNode: React.ReactElement<any>;
    private _args: ArgType[];
    private _argPos: position[];
    constructor(props?: RouteProps, context?: any) {
        super(props, context);
        this.state = { show: false };
        this.props.loc.senpai(this.pathChanged);

        this._args = [];
        this._argPos = [];
        this.buildRegexp();
	this.childNode = React.Children.only(this.props.children) as React.ReactElement<any>;
    }

    componentWillMount() {
        this.parse();
    }

    toString(str: string): ArgType {
        return str;
    }

    toBoolean(str: string): ArgType {
        switch (str.toLowerCase()) {
            case "false":
            case "f":
            case "n":
            case "0":
                return false;
        }

        return true;
    }

    toNumber(str: string): ArgType {
        return (new Number(str)).valueOf();
    }

    private buildRegexp() {
        const numberRegexp = "(-?[0-9]+(\.[0-9]*[1-9])?)";
        const stringRegexp = "([^/]*)";
        const booleanRegexp = stringRegexp;

        let curPos = 1; // first argument is matched_array[1]
        let arr = this.props.path.split("/").map((v: string, i: number) => {
            switch (v) {
                case ":n": // number
                    this._argPos.push({ pos: curPos, c: this.toNumber });
                    curPos += 2; // needs two entries in matched array
                    return numberRegexp;
                case ":s": // string
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

    get args(): ArgType[] {
        return this._args;
    }

    private parse() {
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
		return <e.type {...e.props} routerArgs={this.args} />;
	    return e;
        }

        return null;
    }

    private show(visible: boolean) {
        if (this.state.show !== visible) {
            this.setState({ show: visible });
        }
    }

    private pathChanged: (path: string) => void = (path: string) => {
        this.parse();
    };
}
