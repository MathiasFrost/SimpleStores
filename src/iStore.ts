import type { Subscribe } from "./subscribe";

/** Main members of a store */
export interface IStore<T>
{
	/** Get stored value */
	get value(): T;
	
	/** Set value and update subscribers */
	set value(value: T);
	
	/** Subscribe to value changes
	 * @param event Invoked whenever store's value is set, as well as an initial invocation */
	subscribe(event: Subscribe<T>): Subscribe<T>;
	
	/** Remove event from subscription stack */
	unsubscribe(event: Subscribe<T> | null): void;
}
