import {
    IReadonlyObservableValue,
    ObservableValue
} from "@/render/core/Observable";

export interface ActivityDetails {
    onComplete?: () => void;
    timeInMs: number;
}

export class ActivityManager<T extends string> {
    private readonly currentActivityId = new ObservableValue<T | undefined>(
        undefined
    );

    private readonly currentProgress = new ObservableValue<number>(0);
    private progressTimerId:
        | ReturnType<typeof setInterval>
        | undefined = undefined;

    constructor(readonly activityDetails: Record<T, ActivityDetails>) {}

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

                  if (this.currentProgress.value == 0) {
                      this.activityDetails[val].onComplete &&
                          this.activityDetails[val].onComplete!();
                  }
              }, this.activityDetails[val].timeInMs / 100)
            : undefined;
    }
}
