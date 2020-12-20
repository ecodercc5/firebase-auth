import React, { useState, useEffect, createContext, useContext } from "react";

export class Store {
  constructor() {
    this._store = new Map();
    this._subscribers = {};
  }

  subscribe(id, callback) {
    const subscriberArray = this._getSubscriberArray(id);

    subscriberArray.push(callback);

    this._subscribers[id] = subscriberArray;

    return callback;
  }

  unsubscribe(id, callback) {
    const subscriberArray = this._getSubscriberArray(id);
    const newSubscriberArray = subscriberArray.filter(
      (sub) => sub !== callback
    );

    this._subscribers[id] = newSubscriberArray;
  }

  _getSubscriberArray(id) {
    return this._subscribers[id] || [];
  }

  _notify(id, value) {
    const subscriberArray = this._getSubscriberArray(id);

    subscriberArray.forEach((subscriber) => {
      subscriber(value);
    });
  }

  get(id) {
    return this._store.get(id);
  }

  set(id, value) {
    this._store.set(id, value);
    this._notify(id, value);
  }

  update(id, callback = () => {}) {
    const currentState = this.get(id);
    const newState = callback(currentState);
    this.set(id, newState);
  }

  remove(id) {
    return this._store.delete(id);
  }
}

const StoreContext = createContext(new Store());

export const StoreProvider = ({ store, children }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);

export function useStoreValue(id, initState) {
  const store = useContext(StoreContext);
  // function to set initial state (only run on initial render)
  // return value of function invocation is initial state
  const [state, setState] = useState(() => {
    const data = store.get(id);
    const init = data === undefined ? initState : data;

    store.set(id, init);

    return init;
  });

  useEffect(() => {
    const subscriber = store.subscribe(id, (value) => {
      setState(value);
    });

    return () => store.unsubscribe(subscriber);
  }, [id, store]);

  return state;
}
