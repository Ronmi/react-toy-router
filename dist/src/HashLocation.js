"use strict";
const tools_1 = require("./tools");
const p = require("./Pathkit");
class __HashLocation {
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
        window.addEventListener("hashchange", this.checkAndEmit);
    }
    go(path) {
        if (/^[^:]*:/.test(path)) {
            return;
        }
        path = p.normalize(path, p.dir(this.current));
        window.location.hash = "#" + path;
        this.checkAndEmit();
    }
    senpai(notice) {
        this.callbacks = tools_1.union(this.callbacks, [notice]);
    }
    get base() {
        const { origin, pathname, search } = window.location;
        let rest = "";
        if (search !== "") {
            rest = search;
        }
        return origin + pathname + rest;
    }
    get current() {
        const hash = window.location.hash;
        if (hash[0] === "#") {
            return hash.substring(1);
        }
        return "/";
    }
}
exports.__HashLocation = __HashLocation;
;
exports.HashLocation = new __HashLocation();
//# sourceMappingURL=HashLocation.js.map