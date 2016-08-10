import { LocationProvider } from "./LocationProvider";
import * as _ from "lodash";
import * as p from "./Pathkit";

class __HashLocation implements LocationProvider {
    private callbacks: ((path: string) => void)[];
    private old_path: string;
    constructor() {
        this.callbacks = [];
        this.old_path = this.current;
        this.register();
    }

    register(): void {
        window.addEventListener("hashchange", this.checkAndEmit);
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
        window.location.hash = "#" + path;
        this.checkAndEmit();
    }

    senpai(notice: (me: string) => void): void {
        this.callbacks = _.union(this.callbacks, [notice]);
    }

    get base(): string {
        const { origin, pathname, search } = window.location;
        let rest = "";

        if (search !== "") {
            rest = search;
        }

        return origin + pathname + rest;
    }

    get current(): string {
        const hash = window.location.hash;

        if (hash[0] === "#") {
            return hash.substring(1);
        }

        return "/";
    }
};

export const HashLocation: __HashLocation = new __HashLocation();
