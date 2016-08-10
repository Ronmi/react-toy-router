"use strict";
const tools_1 = require("./tools");
const p = require("./Pathkit");
class __HistoryLocation {
    constructor() {
        this.checkAndEmit = () => {
            let old = this.old_path;
            let cur = this.current;
            this.old_path = cur;
            if (old === cur)
                return;
            for (let cb of this.callbacks)
                cb(cur);
        };
        this.callbacks = [];
        this.old_path = this.current;
        this.register();
    }
    register() {
        window.addEventListener("popstate", this.checkAndEmit);
    }
    go(path) {
        if (/^[^:]*:/.test(path)) {
            return;
        }
        path = p.normalize(path, p.dir(this.current));
        window.history.pushState(null, null, path);
        this.checkAndEmit();
    }
    senpai(notice) {
        this.callbacks = tools_1.union(this.callbacks, [notice]);
    }
    get base() {
        return window.location.origin;
    }
    get current() {
        return window.location.pathname;
    }
}
exports.__HistoryLocation = __HistoryLocation;
exports.HistoryLocation = new __HistoryLocation();
//# sourceMappingURL=HistoryLocation.js.map