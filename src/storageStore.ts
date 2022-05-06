import {Store} from './store';

/** Store for session or local storage.<br/>
 * Initial value is stored first when either subscribing, setting or getting value, not when constructing. */
export abstract class StorageStore<T> extends Store<T> {

  /** Store initial value to replace possible null values from store */
  protected readonly initialValue: T;

  /** If this is set we are operating with a session or local storage */
  private readonly key: string;

  /** @inheritDoc */
  constructor(initialValue: T, key: string) {
    super(initialValue);
    this.key = key;
    this.initialValue = initialValue;
  }

  /** Get stored value, and if it does not exist, store and return initial value */
  override get value(): T {
    const store = this.getStore();
    if (store) {
      const string = store.getItem(this.key);

      // If there is no string stored, set and return initial value
      if (!string) {
        this.value = this.initialValue;
        return this.initialValue;
      }

      return JSON.parse(string);
    }

    // Return initial value if window is unavailable
    this.value = this.initialValue;
    return this.initialValue;
  }

  /** @inheritDoc */
  override set value(value: T) {
    const string = JSON.stringify(value);
    const store = this.getStore();
    if (store) {
      store.setItem(this.key, string);
    }

    this.set(value);
  }

  /** Try to get storage from window */
  protected getStore(): Storage | undefined {
    throw new Error('getStore must be implemented');
  }
}
