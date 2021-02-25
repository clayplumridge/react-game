import * as React from "react";
import { Blade, BladeManager } from "@/render/state/BladeManager";
import {
    ListItem,
    List,
    ListItemIcon,
    ListItemText,
    Divider
} from "@material-ui/core";
import * as Icons from "@material-ui/icons";

interface BladeItemProps {
    alignment: BladeAlignment;
    icon: () => JSX.Element;
    id: Blade;
    order: number;
    text: string;
}

const enum BladeAlignment {
    Top = "top",
    Bottom = "bottom"
}

const BladeItemPropMap: Record<Blade, BladeItemProps> = {
    [Blade.Home]: {
        alignment: BladeAlignment.Top,
        order: 0,
        icon: () => <Icons.Home />,
        id: Blade.Home,
        text: "Home"
    },
    [Blade.Playground]: {
        alignment: BladeAlignment.Bottom,
        order: 0,
        icon: () => <Icons.AccessAlarm />,
        id: Blade.Playground,
        text: "Playground"
    },
    [Blade.Settings]: {
        alignment: BladeAlignment.Bottom,
        icon: () => <Icons.Settings />,
        id: Blade.Settings,
        order: 999,
        text: "Settings"
    }
};

function getAlignedBlades(alignment: BladeAlignment) {
    return Object.values(BladeItemPropMap)
        .filter(x => x.alignment == alignment)
        .sort((a, b) => b.order - a.order);
}

export const BladeSidebarContent: React.FunctionComponent<{}> = () => {
    const topBlades = getAlignedBlades(BladeAlignment.Top);
    const bottomBlades = getAlignedBlades(BladeAlignment.Bottom);

    return (
        <>
            <List>
                {topBlades.map(({ id }) => (
                    <BladeListItem key={id} {...BladeItemPropMap[id]} />
                ))}
            </List>

            <List style={{ marginTop: "auto" }}>
                <Divider />
                {bottomBlades.map(({ id }) => (
                    <BladeListItem key={id} {...BladeItemPropMap[id]} />
                ))}
            </List>
        </>
    );
};

const BladeListItem: React.FunctionComponent<BladeItemProps> = ({
    id,
    icon,
    text
}) => {
    return (
        <ListItem button onClick={() => BladeManager.setCurrentBlade(id)}>
            <ListItemIcon>{icon()}</ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
    );
};
