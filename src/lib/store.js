import { writable } from "svelte/store";
import { browser } from "$app/environment";

export const cat = writable(browser ? JSON.parse(localStorage.getItem("cat") || JSON.stringify({})):{});
cat.subscribe((val)=> browser && (localStorage.cat=JSON.stringify(val)));

export const test = writable(browser ? JSON.parse(localStorage.getItem("test") || JSON.stringify({})):{});
test.subscribe((val)=> browser && (localStorage.test=JSON.stringify(val)));