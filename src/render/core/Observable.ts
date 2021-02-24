import { createEmitter, Emitter, EventKey, EventMap } from "./EventEmitter";

interface ObservableValueEventMap<T> extends EventMap {
    change: ObservableChange<T>;
}

interface ObservableChange<T> {
    old: T;
    new: T;
}

export interface IObservableValue<T>
    extends Emitter<ObservableValueEventMap<T>> {
    value: T;
}

export interface IReadonlyObservableValue<T>
    extends Emitter<ObservableValueEventMap<T>> {
    readonly value: T;
}

export class ObservableValue<T> implements IObservableValue<T> {
    private readonly emitter = createEmitter<ObservableValueEventMap<T>>();

    constructor(private _value: T) {}

    public on<K extends EventKey<ObservableValueEventMap<T>>>(
        eventName: K,
        fn: (event: ObservableValueEventMap<T>[K]) => void
    ): void {
        return this.emitter.on(eventName, fn);
    }

    public off<K extends EventKey<ObservableValueEventMap<T>>>(
        eventName: K,
        fn: (event: ObservableValueEventMap<T>[K]) => void
    ): void {
        return this.emitter.off(eventName, fn);
    }

    public emit<K extends EventKey<ObservableValueEventMap<T>>>(
        eventName: K,
        params: ObservableValueEventMap<T>[K]
    ): void {
        return this.emitter.emit(eventName, params);
    }

    public get value(): T {
        return this._value;
    }

    public set value(val: T) {
        const oldValue = this._value;
        this._value = val;
        this.emit("change", { old: oldValue, new: this._value });
    }
}
