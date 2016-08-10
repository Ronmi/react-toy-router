export declare function normalize(path: string, base: string): string;
/**
 * dir returns deepest directory of the path. eg: "/a" for "/a/b", "/a/b" for "/a/b/".
 * It does not proceed the .. or multiple slashes, you have to normalize it yourself.
 */
export declare function dir(path: string): string;
