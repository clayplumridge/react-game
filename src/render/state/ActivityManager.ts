import { IReadonlyObservableValue, ObservableValue } from "../core/Observable";
export class ActivityManager<T extends string> {
    private readonly currentActivityId = new ObservableValue<T | undefined>(
        undefined
    );

    private readonly currentProgress = new ObservableValue<number>(0);
    private progressTimerId:
        | ReturnType<typeof setInterval>
        | undefined = undefined;

    constructor(readonly timingMapInS: Record<T, number>) {}

    public getCurrentActivityId(): IReadonlyObservableValue<T | undefined> {
        return this.currentActivityId;
    }

    public getCurrentProgress(): IReadonlyObservableValue<number> {
        return this.currentProgress;
    }

    public setCurrentActivityId(val: T | undefined) {
        this.progressTimerId && clearInterval(this.progressTimerId);

        this.currentProgress.value = 0;
        this.currentActivityId.value = val;

        this.progressTimerId = val
            ? setInterval(() => {
                  this.currentProgress.value =
                      (this.currentProgress.value + 1) % 100;
              }, this.timingMapInS[val] * 10)
            : undefined;
    }
}
