import {
    IObservableValue,
    IReadonlyObservableValue,
    ObservableValue
} from "../core/Observable";

export const enum Blade {
    TestBlade = "TestBlade"
}

export class BladeManager {
    private readonly currentBlade: IObservableValue<Blade>;

    constructor(currentBlade?: Blade) {
        this.currentBlade = new ObservableValue<Blade>(
            currentBlade || Blade.TestBlade
        );
    }

    public getCurrentBlade(): IReadonlyObservableValue<Blade> {
        return this.currentBlade;
    }

    public setCurrentBlade(val: Blade): void {
        this.currentBlade.value = val;
    }
}
