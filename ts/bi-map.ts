/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:04 PM -- September 14th, 2019.
 *	Project: @jsdsl/bimap
 */

/**
 * A bidirectional map.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */

export class BiMap<K = any, V = any> {
  private primaryMap = new Map<K, V>();
  private secondaryMap = new Map<V, K>();

  public get(key: K): V | undefined {
    return this.getFromKey(key);
  }

  public set(key: K, value: V): void {
    const _val = this.primaryMap.get(key);
    const _key = this.secondaryMap.get(value);
    if (_val) this.secondaryMap.delete(_val);
    if (_key) this.primaryMap.delete(_key);
    this.primaryMap.set(key, value);
    this.secondaryMap.set(value, key);
  }

  public getFromKey(key: K): V | undefined {
    return this.primaryMap.get(key);
  }

  public getFromValue(value: V): K | undefined {
    return this.secondaryMap.get(value);
  }

  public removeByKey(key: K): V | undefined {
    const value = this.primaryMap.get(key);

    if (value !== undefined) {
      this.primaryMap.delete(key);
      this.secondaryMap.delete(value);
    }

    return value;
  }

  public removeByValue(value: V): K | undefined {
    const key = this.secondaryMap.get(value);

    if (key !== undefined) {
      this.primaryMap.delete(key);
      this.secondaryMap.delete(value);
    }

    return key;
  }

  public hasKey(key: K): boolean {
    return this.primaryMap.has(key);
  }

  public hasValue(value: V): boolean {
    return this.secondaryMap.has(value);
  }

  public clear(): void {
    this.primaryMap.clear();
    this.secondaryMap.clear();
  }
}
