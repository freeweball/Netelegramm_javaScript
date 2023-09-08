export class EventBus {
    private _listeners = {};

    on(event, callback) {
        if (!this._listeners[event]) {
            this._listeners[event] = [];
        }

        this._listeners[event]?.push(callback);
    }

    off(event, callback) {
        if (!this._listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this._listeners[event] = this._listeners[event].filter((listener) => listener !== callback);
    }

    emit(event, ...args) {
        if (!this._listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this._listeners[event].forEach((listener) => {listener(...args)});
    }
}