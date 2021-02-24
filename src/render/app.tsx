import {
    Button,
    createStyles,
    CssBaseline,
    Drawer,
    makeStyles,
    Typography
} from "@material-ui/core";
import * as React from "react";
import { Blade } from "./state/BladeManager";
import { Observer } from "./components/Observer";
import { ObservableArray, ObservableValue } from "./core/Observable";

const sidebarWidth = 240;

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            display: "flex"
        },
        sidebar: {
            width: sidebarWidth,
            flexShrink: 0
        },
        sidebarPaper: {
            width: sidebarWidth
        },
        content: {
            flexGrow: 1
        }
    })
);

const BladeItemPropMap: Record<Blade, {}> = {
    TestBlade: {}
};

const BladeContentMap: Record<Blade, () => JSX.Element> = {
    TestBlade: () => {
        const testOne = new ObservableValue<string>("big yeetus");
        const testTwo = new ObservableValue<string>("thicc bonkus");

        const testArr = new ObservableArray<number>([1, 2, 3, 4]);

        return (
            <>
                <Observer
                    observed={{
                        testOne,
                        testTwo,
                        testArr
                    }}
                >
                    {({ testOne, testTwo, testArr }) => (
                        <div>
                            <div>
                                {testOne} vs {testTwo} FIGHT
                            </div>
                            <div>{testArr.join(",")}</div>
                        </div>
                    )}
                </Observer>

                <Button
                    onClick={() => {
                        testOne.value = "u clicked it didnt u";
                    }}
                >
                    Click me
                </Button>
                <Button
                    onClick={() => {
                        testArr.push(-1, -2, -3);
                    }}
                >
                    Click me to add things
                </Button>
            </>
        );
    }
};

export default function App() {
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <CssBaseline />

            <Drawer
                className={styles.sidebar}
                classes={{ paper: styles.sidebarPaper }}
                variant="permanent"
                anchor="left"
            >
                <Typography>Test sidebar text 120</Typography>
                <Typography>Test sidebar text 240</Typography>
            </Drawer>

            <main className={styles.content}>
                {BladeContentMap[Blade.TestBlade]()}
            </main>
        </div>
    );
}
