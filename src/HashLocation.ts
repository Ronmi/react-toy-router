import { LocationProvider } from "./LocationProvider";

class __HashLocation implements LocationProvider {
    go(url: string) {
        const { origin, pathname, search } = window.location;

        if (/^([^:]+:)?\/\//.test(url)) {
            return;
        }
        window.location.href = this.base + url;
    }

    get base(): string {
        const { origin, pathname, search } = window.location;
        let rest = "";

        if (search !== "") {
            rest = search;
        }

        return origin + pathname + rest + "#";
    }

    get current(): string {
        const hash = window.location.hash;

        if (hash === "" || hash[0] !== "#") {
            return "/";
        }

        return hash.substring(1);
    }
};

export var HashLocation: __HashLocation = new __HashLocation();
