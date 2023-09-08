import {EventBus} from './EventBus';
import {set} from './helpers';

export enum StoreEvents {
    UPDATED = 'updated',
}

export class Store extends EventBus {
    private _state = {};

    public set(keypath, data) {
        set(this._state, keypath, data);
        this.emit(StoreEvents.UPDATED, this.getState());
    }

    public getState() {
        return this._state;
    }
}

const store = new Store();

export default store;