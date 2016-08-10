export interface LocationProvider {
    // go to specified relative path, do nothing if not relative.
    go(path: string): void;

    // register a callback for sending path-changed notifications to senpai. Senpai noticed me!
    senpai(notice: (me: string) => void): void;

    base: string;
    current: string;
}
