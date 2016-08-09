import { LocationProvider } from "./LocationProvider";
import * as p from "./Pathkit";

class __HistoryLocation implements LocationProvider {
    go(path: string) {
        if (/^[^:]*:/.test(path)) {
            return;
        }

        path = p.normalize(path, p.dir(this.current));
        window.history.pushState(null, null, path);
    }

    get base(): string {
        return window.location.origin;
    }

    get current(): string {
        return window.location.pathname;
    }
}

export const HistoryLocation: LocationProvider = new __HistoryLocation();
