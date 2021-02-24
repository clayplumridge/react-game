import * as React from "react";
import { IObservableValue, ObservableValue } from "../core/Observable";

type UnpackObservable<T> = T extends IObservableValue<infer Q> ? Q : never;

interface ObservableBag {
    [key: string]: IObservableValue<any>;
}

export interface ObserverProps<T extends ObservableBag> {
    children: (
        values: { [propName in keyof T]: UnpackObservable<T[propName]> }
    ) => JSX.Element;

    observed: T;
}

function fromEntries<T>(iterable: [string, T][]) {
    return [...iterable].reduce((obj, [key, val]) => {
        obj[key] = val;
        return obj;
    }, {} as Record<string, T>);
}

/**
 * TODO: Typing is kinda a mess in here. Would be better to get things happier so we can avoid issues down the road
 */
export function Observer<T extends ObservableBag>({
    children,
    observed
}: ObserverProps<T>) {
    const [observedValues, setObservedValues] = React.useState(() => {
        const res = fromEntries(
            Object.entries(observed).map(([key, val]) => [key, val.value])
        );

        return res;
    });

    const updateObservedValues = <Key extends keyof T>(
        key: Key,
        val: T[Key]
    ) => {
        setObservedValues({ ...observedValues, [key]: val });
    };

    React.useEffect(() => {
        for (let key of Object.keys(observed)) {
            const observable = observed[key];
            observable.on("change", change =>
                updateObservedValues(key, change.new)
            );
        }
    });

    return children(
        observedValues as {
            [propName in keyof T]: UnpackObservable<T[propName]>;
        }
    );
}
