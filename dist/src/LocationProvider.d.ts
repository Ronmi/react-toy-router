export interface LocationProvider {
    go(path: string): void;
    senpai(notice: (me: string) => void): void;
    base: string;
    current: string;
}
