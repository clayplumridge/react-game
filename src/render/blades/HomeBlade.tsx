import {
    Button,
    createStyles,
    Grid,
    LinearProgress,
    makeStyles,
    Paper,
    Theme
} from "@material-ui/core";
import { ToggleButton } from "@material-ui/lab";
import * as React from "react";
import { Observer } from "../components/Observer";
import { ActivityManager } from "../state/ActivityManager";
import * as Icons from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(2),
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        },
        progress: {
            width: "100%"
        }
    })
);

const enum TestActivities {
    First = "first",
    Second = "second"
}

interface ActivityDisplayProps {}

const activityDisplayPropsMap: Record<TestActivities, ActivityDisplayProps> = {
    [TestActivities.First]: {},
    [TestActivities.Second]: {}
};

const testManager = new ActivityManager<TestActivities>({
    [TestActivities.First]: 10,
    [TestActivities.Second]: 5
});

export const HomeBlade: React.FunctionComponent<{}> = () => {
    const styles = useStyles();

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Paper className={styles.paper}>
                    <Grid container spacing={1}>
                        <Observer
                            observed={{
                                currentActivity: testManager.getCurrentActivityId()
                            }}
                        >
                            {({ currentActivity }) => (
                                <>
                                    {...(Object.keys(
                                        activityDisplayPropsMap
                                    ) as TestActivities[]).map(key => (
                                        <Grid item key={key}>
                                            <ToggleButton
                                                selected={
                                                    key == currentActivity
                                                }
                                                onClick={() =>
                                                    testManager.setCurrentActivityId(
                                                        key
                                                    )
                                                }
                                                value={key}
                                            >
                                                <Icons.CheckBox />
                                            </ToggleButton>
                                        </Grid>
                                    ))}
                                </>
                            )}
                        </Observer>
                    </Grid>

                    <Observer
                        observed={{
                            progressValue: testManager.getCurrentProgress()
                        }}
                    >
                        {({ progressValue }) => (
                            <LinearProgress
                                className={styles.progress}
                                variant="determinate"
                                value={progressValue || 0}
                            />
                        )}
                    </Observer>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper className={styles.paper}>Deletus</Paper>
            </Grid>
        </Grid>
    );
};
