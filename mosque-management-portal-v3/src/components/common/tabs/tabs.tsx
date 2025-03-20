import {Box, Tab, Tabs} from '@mui/material';
import {TabContext} from '@mui/lab';
import React from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';
import {toProperCase} from "../../../utils/stringUtils.ts";

interface TabsComponentProps {
    selectedTab: string;
    moduleType: string;
    t: (key: string) => string;
    handleTabChange: (event: React.SyntheticEvent, newValue: string) => void;
}

const TabsComponent: React.FC<TabsComponentProps> = ({
    selectedTab,
    handleTabChange = () => {},
    moduleType,
    t
}) => {
    const lable = toProperCase(moduleType)
    if (!selectedTab) {
        selectedTab = "1";
    }

    return (
        <TabContext value={selectedTab}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ flexGrow: 1, borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={selectedTab}
                        onChange={handleTabChange}
                        aria-label={t(`tabs.${moduleType}.${moduleType}Management`)}
                    >
                        <Tab icon={<CalendarMonthIcon />} label={t(`tabs.${moduleType}.view${lable}`)} value="1" />
                        <Tab icon={<BarChartIcon />} label={t(`tabs.${moduleType}.${moduleType}Analysis`)} value="2" />
                    </Tabs>
                </Box>
            </Box>
        </TabContext>
    );
};

export default TabsComponent;
