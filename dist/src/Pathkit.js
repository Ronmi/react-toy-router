"use strict";
// tear the path apart, processes the .. and .
function normalize(path, base) {
    // strip tailing /
    const is_dir = path[path.length - 1] === "/";
    while (path[path.length - 1] === "/")
        path = path.substring(0, path.length - 1);
    while (base[base.length - 1] === "/")
        base = base.substring(0, base.length - 1);
    let ret = [""];
    const rooted = path[0] === "/";
    if (!rooted)
        path = base + "/" + path;
    let cur = 1; // current position of dest array
    let cur_dir = false;
    for (let part of path.split("/")) {
        switch (part) {
            case "":
                continue;
            case ".":
                cur_dir = true;
                continue;
            case "..":
                cur_dir = true;
                if (cur <= 1) {
                    continue;
                }
                cur--;
                continue;
            default:
                cur_dir = false;
        }
        ret[cur] = part;
        cur++;
    }
    return ret.slice(0, cur).join("/") + (cur_dir || is_dir ? "/" : "");
}
exports.normalize = normalize;
/**
 * dir returns deepest directory of the path. eg: "/a" for "/a/b", "/a/b" for "/a/b/".
 * It does not proceed the .. or multiple slashes, you have to normalize it yourself.
 */
function dir(path) {
    let cur = path.length - 1;
    while (cur >= 0 && path[cur] !== "/")
        cur--;
    while (cur >= 0 && path[cur] === "/")
        cur--;
    if (cur < 0) {
        if (path[0] === "/")
            return "/";
        return ".";
    }
    return path.substring(0, cur + 1);
}
exports.dir = dir;
//# sourceMappingURL=Pathkit.js.map