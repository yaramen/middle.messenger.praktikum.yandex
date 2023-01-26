class EventEmit extends EventTarget {
    pageChange() {
        this.dispatchEvent(new Event('pageChange'))
    }

    idChange() {
        this.dispatchEvent(new Event('idChange'))
    }
}

export {
    EventEmit
}