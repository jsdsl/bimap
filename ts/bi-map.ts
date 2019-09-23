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
	
	private primaryMap: Map<K, V>;
	
	private secondaryMap: Map<V, K>;
	
	public constructor() {
	
		this.primaryMap = new Map<K, V>();
		this.secondaryMap = new Map<V, K>();
	
	}
	
	public get(key: K): V | undefined {
		
		return this.getFromKey(key);
		
	}
	
	public set(key: K, value: V): void {
		
		this.setFromKey(key, value);
		
	}
	
	public getFromKey(key: K): V | undefined {
		
		return this.primaryMap.get(key);
		
	}
	
	public getFromValue(value: V): K | undefined {
		
		return this.secondaryMap.get(value);
		
	}
	
	public setFromKey(key: K, value: V): void {
	
		this.primaryMap.set(key, value);
		this.secondaryMap.set(value, key);
	
	}
	
	public setFromValue(value: V, key: K): void {
		
		this.setFromKey(key, value);
		
	}
	
	public removeByKey(key: K): V | undefined {
	
		if (this.primaryMap.has(key)) {
			
			let value: V = this.primaryMap.get(key) as V;
			
			this.primaryMap.delete(key);
			this.secondaryMap.delete(value);
			
			return value;
			
		} else return undefined;
	
	}
	
	public removeByValue(value: V): K | undefined {
		
		if (this.secondaryMap.has(value)) {
			
			let key: K = this.secondaryMap.get(value) as K;
			
			this.primaryMap.delete(key);
			this.secondaryMap.delete(value);
			
			return key;
			
		} else return undefined;
	
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