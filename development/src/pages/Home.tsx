import React from 'react';
import {localStore, sessionStore, SomeModel, store} from '../services/stores';
import type {Subscribe} from 'simplestores';

interface Props {

}

interface State {
  store: SomeModel | null;
  localStore: SomeModel | null;
  sessionStore: SomeModel | null;
}

export class Home extends React.Component<Props, State> {

  store: Subscribe<SomeModel> | null = null;
  sessionStore: Subscribe<SomeModel> | null = null;
  localStore: Subscribe<SomeModel> | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {localStore: null, sessionStore: null, store: null};
  }

  componentDidMount() {
    this.store = store.subscribe(value => this.setState({store: value}));
    this.sessionStore = sessionStore.subscribe(value => this.setState({sessionStore: value}));
    this.localStore = localStore.subscribe(value => this.setState({localStore: value}));
  }

  componentWillUnmount() {
    store.unsubscribe(this.store);
    sessionStore.unsubscribe(this.sessionStore);
    localStore.unsubscribe(this.localStore);
  }

  render() {
    const {store, sessionStore, localStore} = this.state;

    return (
        <section>
          <h1>Test</h1>
          <p>{JSON.stringify(store)}</p>
          <p>{JSON.stringify(sessionStore)}</p>
          <p>{JSON.stringify(localStore)}</p>
        </section>
    );
  }
}
