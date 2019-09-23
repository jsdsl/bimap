"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BiMap {
    constructor() {
        this.primaryMap = new Map();
        this.secondaryMap = new Map();
    }
    get(key) {
        return this.getFromKey(key);
    }
    set(key, value) {
        this.setFromKey(key, value);
    }
    getFromKey(key) {
        return this.primaryMap.get(key);
    }
    getFromValue(value) {
        return this.secondaryMap.get(value);
    }
    setFromKey(key, value) {
        this.primaryMap.set(key, value);
        this.secondaryMap.set(value, key);
    }
    setFromValue(value, key) {
        this.setFromKey(key, value);
    }
    removeByKey(key) {
        if (this.primaryMap.has(key)) {
            let value = this.primaryMap.get(key);
            this.primaryMap.delete(key);
            this.secondaryMap.delete(value);
            return value;
        }
        else
            return undefined;
    }
    removeByValue(value) {
        if (this.secondaryMap.has(value)) {
            let key = this.secondaryMap.get(value);
            this.primaryMap.delete(key);
            this.secondaryMap.delete(value);
            return key;
        }
        else
            return undefined;
    }
    hasKey(key) {
        return this.primaryMap.has(key);
    }
    hasValue(value) {
        return this.secondaryMap.has(value);
    }
    clear() {
        this.primaryMap.clear();
        this.secondaryMap.clear();
    }
}
exports.BiMap = BiMap;
//# sourceMappingURL=bi-map.js.map