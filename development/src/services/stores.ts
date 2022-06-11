import { LocalStore, SessionStore, Store } from "simplestores";

export interface SomeModel
{
	someString: string;
	
	someNumber: number;
	
	someBool: boolean;
	
	someArray?: string[];
}

export const store = new Store<SomeModel>({
	someString: "string",
	someNumber: 6,
	someBool: true
});

export const sessionStore = new SessionStore<SomeModel>({
	someString: "string",
	someNumber: 6,
	someBool: true,
	someArray: [
		"1995-12-17T03:24:00", "test",
	]
}, "some_key");

export const localStore = new LocalStore<SomeModel>({
	someString: "string",
	someNumber: 6,
	someBool: true
}, "some_key");
