export function union<T>(...arr: T[][]): T[] {
    return [...new Set([].concat( ...arr))];
}
