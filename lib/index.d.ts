
type StoreReturnType = {
    __storeKey: string;
    dispatch: (newState: any) => void;
    listeners: Set<any>;
    subscribe: (event: any) => () => Set<any>['delete'];
    getInitState: () => any;
    getSnapshot: () => any;
    destory: () => Set<any>['clear'];
    getServerSnapshot: () => () => any;
}
export function createStore(initValues: object): StoreReturnType;

type SetStateProps<S> = S | ((val: S) => void);
type UseStoreReturnType<S> = [
    S,
    (val: SetStateProps<S>) => void
];
export function useStore<S>(store: ReturnType<typeof createStore>): UseStoreReturnType<S>;