/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 1:04 PM -- September 14th, 2019.
 * Project: @jsdsl/bimap
 * 
 * @jsdsl/bimap - A bidirectional map written in TypeScript.
 * Copyright (C) 2021 Trevor Sears
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * A bidirectional map written in TypeScript.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v1.0.0
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
