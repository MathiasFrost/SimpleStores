import type {Subscribe} from './subscribe';
import type {IStore} from './iStore';

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
