/** Subscribe event */
export type Subscribe<T> = (value: T) => void;

/** Main members of a store */
export interface IStore<T> {

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

/** Store a value in memory and subscribe to updates */
export class Store<T> implements IStore<T> {

  /** Subscribers */
  private events: Subscribe<T>[] = [];

  /** Create a new store */
  constructor(initialValue: T) {
    this._value = initialValue;
  }

  /** Internal value property */
  private _value: T;

  /** @inheritDoc */
  get value(): T {
    return this._value;
  }

  /** @inheritDoc */
  set value(value: T) {
    this.set(value);
  }

  /** @inheritDoc */
  subscribe(event: Subscribe<T>): Subscribe<T> {
    this.events.push(event);
    event(this.value);
    return event;
  }

  /** @inheritDoc */
  unsubscribe(event: Subscribe<T> | null) {
    this.events = this.events.filter(e => e !== event);
  }

  /** Because super.value = value doesn't work... */
  protected set(value: T) {
    this._value = value;
    const val = this.value;
    for (const event of this.events) {
      event(val);
    }
  }
}

/** Store for session or local storage */
abstract class StorageStore<T> extends Store<T> {

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

/** Store a value in session storage and subscribe to updates */
export class SessionStore<T> extends StorageStore<T> {

  /** @inheritDoc */
  protected override getStore(): Storage | undefined {
    return typeof window === 'undefined' ? undefined : window.sessionStorage;
  }
}

/** Store a value in local storage and subscribe to updates */
export class LocalStore<T> extends StorageStore<T> {

  /** @inheritDoc */
  protected override getStore(): Storage | undefined {
    return typeof window === 'undefined' ? undefined : window.localStorage;
  }
}
