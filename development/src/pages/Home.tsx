import React from "react";
import type { Subscribe } from "simplestores";
import { localStore, sessionStore, SomeModel, store } from "../services/stores";

interface Props
{

}

interface State
{
	store: SomeModel | null;
	
	localStore: SomeModel | null;
	
	sessionStore: SomeModel | null;
}

export class Home extends React.Component<Props, State>
{
	
	store: Subscribe<SomeModel> | null = null;
	
	sessionStore: Subscribe<SomeModel> | null = null;
	
	localStore: Subscribe<SomeModel> | null = null;
	
	constructor(props: Props)
	{
		super(props);
		this.state = {
			localStore: null,
			sessionStore: null,
			store: null
		};
	}
	
	static increment(value: SomeModel)
	{
		value.someString += "_string";
		value.someNumber++;
		value.someBool = !value.someBool;
	}
	
	componentDidMount()
	{
		this.store = store.subscribe((value: SomeModel) => this.setState({ store: value }));
		this.sessionStore = sessionStore.subscribe((value: SomeModel) => this.setState({ sessionStore: value }));
		this.localStore = localStore.subscribe((value: SomeModel) => this.setState({ localStore: value }));
	}
	
	componentWillUnmount()
	{
		store.unsubscribe(this.store);
		sessionStore.unsubscribe(this.sessionStore);
		localStore.unsubscribe(this.localStore);
	}
	
	updateStores()
	{
		const storeValue = store.value;
		Home.increment(storeValue);
		store.value = storeValue;
		
		const sessionStoreValue = sessionStore.value;
		Home.increment(sessionStoreValue);
		sessionStore.value = sessionStoreValue;
		
		const localStoreValue = localStore.value;
		Home.increment(localStoreValue);
		localStore.value = localStoreValue;
	}
	
	render()
	{
		const {
			store,
			sessionStore,
			localStore
		} = this.state;
		
		return (
				<section>
					<h1>Test</h1>
					<p>{JSON.stringify(store)}</p>
					<p>{JSON.stringify(sessionStore)}</p>
					<p>{JSON.stringify(localStore)}</p>
					<button onClick={this.updateStores}>Update stores</button>
				</section>);
	}
}
