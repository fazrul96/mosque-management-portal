import {AppProvider, type Navigation,} from '@toolpad/core/AppProvider';
import {DashboardLayout} from '@toolpad/core/DashboardLayout';
import useAuthSession from '../../../hooks/common/useAuthSession.ts';
import createDemoTheme from "./theme.ts";
import {APP_NAME, SLASH} from "../../../constants/AppConstants.ts";
import CustomAppTitle from "./customAppTitle.tsx";
import {ToolbarActionsLanguage} from "./toolbarActions.tsx";
import {SidebarFooterAccount} from "./accountComponents.tsx";
import * as React from "react";

type DashboardLayoutWrapperProps = {
    navigation: Navigation,
    window?: () => Window,
    content?: React.ReactNode;
};

const DashboardLayoutWrapper = (props: DashboardLayoutWrapperProps) => {
    const {window, navigation, content} = props;
    const {session, authentication} = useAuthSession();
    const demoWindow = window !== undefined ? window() : undefined;

    return (
        <AppProvider
            navigation = {navigation}
            branding = {{
                logo: <img src = "https://mui.com/static/logo.png" alt = "MUI logo" />,
                title: APP_NAME,
                homeUrl: SLASH,
            }}
            theme = {createDemoTheme()}
            authentication = {authentication}
            session = {session}
            window = {demoWindow}
        >
            <DashboardLayout defaultSidebarCollapsed
                slots = {{
                    appTitle: CustomAppTitle,
                    toolbarActions: ToolbarActionsLanguage,
                    sidebarFooter: SidebarFooterAccount
                }}
            >
                {content }
            </DashboardLayout >
        </AppProvider >
    );
};

export default DashboardLayoutWrapper;
