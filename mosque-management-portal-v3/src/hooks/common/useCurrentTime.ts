import {useMemo} from 'react';

export const useCurrentTime = () => {
    const currentTime = useMemo(() => new Date(), []);
    const currentTimeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const currentTime24 = useMemo(() => parseInt(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }).replace(":", "")), [currentTime]);

    return { currentTimeString, currentTime24 };
};
