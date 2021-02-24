import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
    props: {
        MuiButton: {
            disableRipple: true
        }
    }
});
