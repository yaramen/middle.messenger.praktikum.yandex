class Store extends EventTarget {
    private handlers;

    private state;

    constructor(initState) {
        super();
        this.state = initState;
        this.handlers = [];
    }

    dispatch(...args) {
        // @ts-ignore
        this.dispatchEvent(...args);
    }

    getState() {
        return this.state;
    }

    setState(func) {
        const newState = func(this.state);
        this.handlers.map((handle) => handle(this.state, newState));
        this.state = newState;
    }

    subscribe(handler) {
        this.handlers.push(handler);
    }

    unsubscribe(handler) {
        this.handlers = this.handlers.filter((currentHandler) => currentHandler !== handler);
    }

    clearHandler() {
        this.handlers = [];
    }
}

export {
    Store,
};
