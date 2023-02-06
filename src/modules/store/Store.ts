class Store<T> extends EventTarget {
    private handlers: ((oldState: T, newState: T) => void)[];

    private state: T;

    constructor(initState: T) {
        super();
        this.state = initState;
        this.handlers = [];
    }

    // @ts-ignore
    dispatch(...args: unknown) {
        // @ts-ignore
        this.dispatchEvent(...args);
    }

    getState() {
        return this.state;
    }

    setState(func: (state: T) => T) {
        const newState = func(this.state);
        this.handlers.map((handle) => handle(this.state, newState));
        this.state = newState;
    }

    subscribe(handler: (oldState: T, newState: T) => void) {
        this.handlers.push(handler);
        return handler;
    }

    unsubscribe(handler: (oldState: T, newState: T) => void) {
        this.handlers = this.handlers.filter((currentHandler) => currentHandler !== handler);
    }

    clearHandler() {
        this.handlers = [];
    }
}

export {
    Store,
};
