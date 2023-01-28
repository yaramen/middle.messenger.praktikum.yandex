class Store extends EventTarget {
    constructor(initState) {
        super();
        this._state = initState;
        this._handlers = [];
    }

    dispatch(...args) {
        this.dispatchEvent(...args);
    }

    getState() {
        return this._state
    }

    setState(func) {
        const newState = func(this._state);
        this._handlers.map(handle => handle(this._state, newState));
        this._state = newState
    }

    subscribe(handler) {
        this._handlers.push(handler)
    }

    unsubscribe(handler) {
        this._handlers = this._handlers.filter(currentHandler => currentHandler !== handler)
    }

    clearHandler() {
        this._handlers = [];
    }
}

export {
    Store,
}