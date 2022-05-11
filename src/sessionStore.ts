import {StorageStore} from './storageStore';

/** Store a value in session storage and subscribe to updates */
export class SessionStore<T> extends StorageStore<T> {

  /** @inheritDoc */
  protected getStore(): Storage | undefined {
    return typeof window === 'undefined' ? undefined : window.sessionStorage;
  }
}
