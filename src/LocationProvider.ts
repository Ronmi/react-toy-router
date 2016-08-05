export interface LocationProvider {
    // go to specified relative path, do nothing if not relative.
    go(path: string): void;

    base: string;
}
