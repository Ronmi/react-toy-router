import * as React from "react";
import { LocationProvider } from "./LocationProvider";
export interface RouteProps {
    path: string;
    loc: LocationProvider;
}
export interface RouteState {
    show?: boolean;
}
export declare type ArgType = number | string | boolean;
export interface RoutableProps {
    routerArgs?: ArgType[];
}
export declare class Route extends React.Component<RouteProps, RouteState> {
    private regexp;
    private childNode;
    private _args;
    private _argPos;
    constructor(props?: RouteProps, context?: any);
    componentWillMount(): void;
    toString(str: string): ArgType;
    toBoolean(str: string): ArgType;
    toNumber(str: string): ArgType;
    private buildRegexp();
    args: ArgType[];
    private parse();
    render(): JSX.Element;
    private show(visible);
    private pathChanged;
}
