import {
    Box,
    createStyles,
    CssBaseline,
    Divider,
    Drawer,
    makeStyles,
    ThemeProvider,
    Typography
} from "@material-ui/core";
import * as React from "react";
import { Blade, BladeManager } from "@/render/state/BladeManager";
import { Observer } from "@/render/components/Observer";
import { theme } from "@/render/theme";
import { HomeBlade, PlaygroundBlade } from "@/render/blades";
import { BladeSidebarContent } from "@/render/blades/BladeSidebarContent";
import { SettingsBlade } from "./blades/SettingsBlade";

const sidebarWidth = 240;

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            height: "100%"
        },
        sidebar: {
            width: sidebarWidth,
            flexShrink: 0
        },
        sidebarPaper: {
            width: sidebarWidth
        }
    })
);

const BladeContentMap: Record<Blade, () => JSX.Element> = {
    [Blade.Home]: () => <HomeBlade />,
    [Blade.Playground]: () => <PlaygroundBlade />,
    [Blade.Settings]: () => <SettingsBlade />
};

export default function App() {
    const styles = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <Box className={styles.root} display="flex">
                <CssBaseline />

                <Drawer
                    className={styles.sidebar}
                    classes={{ paper: styles.sidebarPaper }}
                    variant="permanent"
                    anchor="left"
                >
                    <Typography>Logo goes here</Typography>
                    <Divider />
                    <BladeSidebarContent />
                </Drawer>

                <Box
                    component="main"
                    display="flex"
                    flexDirection="column"
                    flexGrow={1}
                >
                    <Observer
                        observed={{
                            currentBlade: BladeManager.getCurrentBlade()
                        }}
                    >
                        {({ currentBlade }) => BladeContentMap[currentBlade]()}
                    </Observer>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
