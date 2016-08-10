import { LocationProvider } from "./LocationProvider";
export declare class __HashLocation implements LocationProvider {
    private callbacks;
    private old_path;
    constructor();
    register(): void;
    checkAndEmit: () => void;
    go(path: string): void;
    senpai(notice: (me: string) => void): void;
    base: string;
    current: string;
}
export declare const HashLocation: __HashLocation;
