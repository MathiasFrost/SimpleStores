import {StorageStore} from './storageStore';

/** Store a value in local storage and subscribe to updates */
export class LocalStore<T> extends StorageStore<T> {

  /** @inheritDoc */
  protected override getStore(): Storage | undefined {
    return typeof window === 'undefined' ? undefined : window.localStorage;
  }
}
