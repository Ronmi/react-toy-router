import * as React from "react";
import { LocationProvider } from "./LocationProvider";

export interface RouteProps {
    path: string;
    loc: LocationProvider;
}

export interface RouteState {
    show?: boolean;
}

export default class Route extends React.Component<RouteProps, RouteState> {
    constructor(props?: RouteProps, context?: any) {
	super(props, context);
	this.state = { show: this.shellWeShow(this.props.loc.current) };
	this.props.loc.senpai(this.pathChanged);
    }

    render() {
	if (this.state.show) {
	    return React.Children.only(this.props.children) as React.ReactElement<any>;
	}

	return null;
    }

    show(visible: boolean) {
	if (this.state.show !== visible) {
	    this.setState({ show: visible });
	}
    }

    pathChanged: (path: string) => void = (path: string) => {
	this.show(this.shellWeShow(path));
    };

    shellWeShow(path: string): boolean {
	// matching with path
	// support only precise match currently
	return path === this.props.path;
    }
}
