import { LocationProvider } from "./LocationProvider";
import * as p from "./Pathkit";

class __HashLocation implements LocationProvider {
    go(path: string) {
        if (/^[^:]*:/.test(path)) {
            return;
        }

        path = p.normalize(path, p.dir(this.current));
        window.location.hash = "#" + path;
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
