/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 11:14 AM -- September 18th, 2019.
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

import { BiMap } from "../bi-map";

describe("Initialization", () => {
	
	test("Basic initialization.", () => {
		
		let bimap: BiMap<any, any> = new BiMap<any, any>();
		
		bimap;
		
	});
	
});

describe("Per-method Tests", () => {
	
	let bimap: BiMap<string, number>;
	
	beforeEach(() => {
		
		bimap = new BiMap<string, number>();
		
		bimap.set("one", 1);
		bimap.set("two", 2);
		bimap.set("three", 3);
		
	});
	
	describe("#get", () => {
		
		test("Regular key --> value retrieval returns expected value.", () => {
			
			expect(bimap.get("one")).toBe(1);
			expect(bimap.get("two")).toBe(2);
			expect(bimap.get("three")).toBe(3);
			
		});
		
		test("Attempt to get non-existent value returns undefined.", () => {
		
			expect(bimap.get("zero")).toBeUndefined();
			expect(bimap.get("four")).toBeUndefined();
		
		});
		
	});
	
	describe("#set", () => {
	
		test("Regular set does not error/fail.", () => {
			
			bimap.set("four", 4);
			
		});
		
		test("Set-get relationship is properly reflexive.", () => {
			
			bimap.set("five", 5);
			expect(bimap.getFromKey("five")).toBe(5);
			expect(bimap.getFromValue(5)).toBe("five");
			
		});
		
		test("Set operation successfully overwrites previously held keys.", () => {
			
			bimap.set("two", 10);
			expect(bimap.getFromKey("two")).toBe(10);
			expect(bimap.getFromValue(10)).toBe("two");
			expect(bimap.getFromValue(2)).toBeUndefined();
			
		});
	
	});
	
	describe("#getFromKey", () => {
		
		test("Regular key --> value retrieval returns expected value.", () => {
			
			expect(bimap.getFromKey("one")).toBe(1);
			expect(bimap.getFromKey("two")).toBe(2);
			expect(bimap.getFromKey("three")).toBe(3);
			
		});
		
		test("Attempt to get non-existent value returns undefined.", () => {
			
			expect(bimap.getFromKey("zero")).toBeUndefined();
			expect(bimap.getFromKey("four")).toBeUndefined();
			
		});
	
	});
	
	describe("#getFromValue", () => {
	
		test("", () => {
		
		
		
		});
	
	});
	
	describe("#setFromKey", () => {
	
	
	
	});
	
	describe("#setFromValue", () => {
	
	
	
	});
	
	describe("#removeByKey", () => {
	
	
	
	});
	
	describe("#removeByValue", () => {
	
	
	
	});
	
	describe("#hasKey", () => {
	
	
	
	});
	
	describe("#hasValue", () => {
	
	
	
	});
	
	describe("#clear", () => {
	
	
	
	});
	
});
