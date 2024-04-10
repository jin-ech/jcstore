import { useSyncExternalStore } from 'react'
import { produce } from 'immer';
import { getUuid, isEqual } from './utils';

export const createStore = (initState = {}) => {
    const __storeKey = getUuid();
    const listeners = new Set();
    const createProxyData = data => {
        return data;
    };
    let state = createProxyData(initState);
    const getInitState = () => state;
    const getServerSnapshot = () => getInitState();
    const getSnapshot = () => state;
    const subscribe = event => {
        listeners.add(event);
        return () => listeners.delete(event);
    };
    const destory = () => listeners.clear();
    const dispatch = newState => {
        state = newState;
        listeners.forEach(l => l());
    };

    const apis = {
        __storeKey,
        dispatch,
        listeners,
        subscribe,
        getInitState,
        getSnapshot,
        destory,
        getServerSnapshot
    };
    return apis;
};

export const useStore = store => {
    const state = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
    const setState = arg => {
        let newState = arg;
        if (typeof arg === 'function') {
            const callback = arg;
            const currentState = store.getSnapshot();
            newState = produce(currentState, callback);
            store.dispatch(newState);
            return;
        }
        if (!isEqual(state, newState)) {
            store.dispatch(newState);
        }
    };

    return [
        state,
        setState
    ];
};