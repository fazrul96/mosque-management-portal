import React from 'react';
import {Box, Stack, Typography} from '@mui/material';
import {DateInfo} from "../../types/info/DateInfo.ts";
import {MetaInfo} from "../../types/info/MetaInfo.ts";

interface DateTimeDisplayProps {
    todayDate: string,
    currentTimeString: string,
    dateInfo?: DateInfo | null,
    metaInfo?: MetaInfo | null
}

const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({
                                                             todayDate,
                                                             currentTimeString,
                                                             dateInfo,
                                                             metaInfo
                                                         }) => {
    const hijri = dateInfo?.hijri;
    const timezone = metaInfo?.timezone;

    return (
        <Box sx = {{
            textAlign: 'left',
            paddingLeft: {xs: 2, sm: 3, md: 5, lg: 15, xl: 60}
        }} >
            <Stack spacing = {0.5} alignItems = "flex-start" >
                <Typography variant = "h5" color = "textPrimary"
                            sx = {{fontWeight: 700, fontSize: '1.5rem', color: 'primary.main'}} >
                    {todayDate}
                </Typography >

                <Box sx = {{display: 'flex', flexDirection: 'row', alignItems: 'center'}} >
                    <Typography variant = "body2" color = "textSecondary" sx = {{fontSize: '1rem', fontWeight: 600}} >
                        Current Time:
                    </Typography >
                    <Typography variant = "body2" color = "textSecondary"
                                sx = {{fontSize: '1rem', ml: 1, fontStyle: 'italic'}} >
                        {currentTimeString}
                    </Typography >
                </Box >

                {hijri && (
                    <Box sx = {{display: 'flex', flexDirection: 'row', alignItems: 'center'}} >
                        <Typography variant = "body2" color = "textSecondary"
                                    sx = {{fontSize: '1rem', fontWeight: 600}} >
                            Hijri Date:
                        </Typography >
                        <Typography variant = "body2" color = "textSecondary"
                                    sx = {{fontSize: '1rem', ml: 1, fontStyle: 'italic'}} >
                            {hijri.date}
                        </Typography >
                    </Box >
                )}

                <Box sx = {{display: 'flex', flexDirection: 'row', alignItems: 'center'}} >
                    <Typography variant = "body2" color = "textSecondary" sx = {{fontSize: '1rem', fontWeight: 600}} >
                        Timezone:
                    </Typography >
                    <Typography variant = "body2" color = "textSecondary" sx = {{fontSize: '1rem', ml: 1}} >
                        {timezone}
                    </Typography >
                </Box >
            </Stack >
        </Box >
    );
};

export default DateTimeDisplay;
