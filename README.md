# [Simple Stores](https://www.npmjs.com/package/@mathias_frost/simplestores)

Minimal framework-independent stores

## Example:

### Creating a store

```ts
import {LocalStore, SessionStore, Store} from '@mathias_frost/simplestores';

export interface SomeModel {
  someString: string;
  someNumber: number;
  someBool: boolean;
}

export const store = new Store<SomeModel>({someString: 'string', someNumber: 6, someBool: true});
export const sessionStore = new SessionStore<SomeModel>({someString: 'string', someNumber: 6, someBool: true}, 'some_key');
export const localStore = new LocalStore<SomeModel>({someString: 'string', someNumber: 6, someBool: true}, 'some_key');
```

### Subscribing _(React)_

```tsx
import React from 'react';
import {localStore, sessionStore, store} from './stores';
import type {Subscribe} from '@mathias_frost/simplestores';

export class Component extends React.Component<{}, {}> {

  /** Store event as to unsubscrube at unmount (not required) */
  store: Subscribe<SomeModel> | null = null;

  componentDidMount() {
    this.store = store.subscribe((value: SomeModel) => this.setState({store: value}));
  }

  componentWillUnmount() {
    store.unsubscribe(this.store);
  }
}
```

_Unsubscribing is optional but recommended_

### Set value

```ts
import {store} from './stores';

store.value = "New value";
```

_This will update subscribers_

### Get value

```ts
import {store} from './stores';

const value = store.value;
```

_This will fetch the actual value possibly stored in session or local storage_
