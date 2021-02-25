import {
    createStyles,
    Grid,
    makeStyles,
    Paper,
    Theme
} from "@material-ui/core";
import * as React from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(2),
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }
    })
);

export const HomeBlade: React.FunctionComponent<{}> = () => {
    const styles = useStyles();

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Paper className={styles.paper}>Yeetus</Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper className={styles.paper}>Deletus</Paper>
            </Grid>
        </Grid>
    );
};
