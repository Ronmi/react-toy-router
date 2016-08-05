import { LocationProvider } from "./LocationProvider";

export const HistoryLocation: LocationProvider = {
    go(path: string) {
        let info = /^(([^:]+:)?\/\/)?([^:\/]+)?(:[0-9]+)?(\/[^?]*)?(\?[^#]*)?(#.*)?$/.exec(path);
        let [ match, full_protocol, protocol, host, port, pathname, query, hash ] = info;
        let check: any[] = [protocol, host, port, query];
        for (let k in check) {
            if (check[k] !== undefined) {
                return;
            }
        }
        window.history.pushState(null, null, path);
    },

    get base(): string {
        return window.location.origin;
    }
};
