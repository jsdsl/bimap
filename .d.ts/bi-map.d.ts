export declare class BiMap<K = any, V = any> {
    private primaryMap;
    private secondaryMap;
    constructor();
    get(key: K): V | undefined;
    set(key: K, value: V): void;
    getFromKey(key: K): V | undefined;
    getFromValue(value: V): K | undefined;
    setFromKey(key: K, value: V): void;
    setFromValue(value: V, key: K): void;
    removeByKey(key: K): V | undefined;
    removeByValue(value: V): K | undefined;
    hasKey(key: K): boolean;
    hasValue(value: V): boolean;
    clear(): void;
}
