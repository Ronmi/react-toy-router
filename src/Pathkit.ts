// tear the path apart, processes the .. and .
export function normalize(path: string, base: string): string[] {
    // strip tailing /
    while (path[path.length - 1] === "/") path = path.substring(0, path.length - 1);
    while (base[base.length - 1] === "/") base = base.substring(0, base.length - 1);
    let ret: string[] = [""];
    const rooted: boolean = path[0] === "/";
    if (!rooted) path = base + path;
    let cur = 1; // current position of dest array
    let upper_count = 0;

    for (let part of path.split("/")) {
        switch (part) {
        case "":
            if (ret.length !== 0) {
                continue;
            }
            break;
        case ".":
            continue;
        case "..":
            if (cur === 1) {
                if (!rooted) upper_count++;
                continue;
            }
            cur--;
            continue;
        }

        ret[cur] = part;
        cur++;
    }

    return ret.slice(0, cur);
}