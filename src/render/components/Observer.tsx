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

export function Observer<T extends ObservableBag>({
    children,
    observed
}: ObserverProps<T>) {
    const [observedValues, setObservedValues] = React.useState(() => {
        const keys = Object.keys(observed) as (keyof T)[];

        const res = fromEntries(
            Object.entries(observed).map(([key, val]) => [key, val.value])
        );

        console.log(res);

        return res;
    });

    React.useEffect(() => {
        for (let observable of Object.values(observed)) {
            observable.on("change", change => {});
        }
    });

    return children(
        observedValues as {
            [propName in keyof T]: UnpackObservable<T[propName]>;
        }
    );
}
