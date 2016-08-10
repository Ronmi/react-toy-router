import { LocationProvider } from "./LocationProvider";
import * as _ from "lodash";
import * as p from "./Pathkit";

export class __HistoryLocation implements LocationProvider {
    private callbacks: ((path: string) => void)[];
    private old_path: string;
    constructor() {
        this.callbacks = [];
        this.old_path = this.current;
        this.register();
    }

    register(): void {
        window.addEventListener("popstate", this.checkAndEmit);
    }

    checkAndEmit: () => void = () => {
        let old = this.old_path;
        let cur = this.current;
        this.old_path = cur;
        if (old === cur) return;

        for (let cb of this.callbacks) cb(cur);
    };

    go(path: string) {
        if (/^[^:]*:/.test(path)) {
            return;
        }

        path = p.normalize(path, p.dir(this.current));
        window.history.pushState(null, null, path);
        this.checkAndEmit();
    }

    senpai(notice: (me: string) => void): void {
        this.callbacks = _.union(this.callbacks, [notice]);
    }

    get base(): string {
        return window.location.origin;
    }

    get current(): string {
        return window.location.pathname;
    }
}

export const HistoryLocation: LocationProvider = new __HistoryLocation();
