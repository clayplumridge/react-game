import {
    AppBar,
    createStyles,
    CssBaseline,
    Drawer,
    makeStyles,
    Toolbar,
    Typography
} from "@material-ui/core";
import * as React from "react";

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

            <main className={styles.content}>Test content</main>
        </div>
    );
}
