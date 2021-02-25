import {
    IReadonlyObservableValue,
    ObservableValue
} from "@/render/core/Observable";

export const enum Blade {
    Home = "home",
    Playground = "playground",
    Settings = "settings"
}

interface IBladeManager {
    getCurrentBlade(): IReadonlyObservableValue<Blade>;
    setCurrentBlade(val: Blade): void;
}

class BladeManagerImpl implements IBladeManager {
    private readonly currentBlade = new ObservableValue<Blade>(Blade.Home);

    public getCurrentBlade(): IReadonlyObservableValue<Blade> {
        return this.currentBlade;
    }

    public setCurrentBlade(val: Blade): void {
        this.currentBlade.value = val;
    }
}

export const BladeManager = new BladeManagerImpl();
