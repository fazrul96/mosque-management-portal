import React from "react";
import {EMPTY_STRING} from "../../../constants/AppConstants.ts";

interface Payload {
    value: number;
}

interface CustomTooltipProps {
    payload?: Payload[];
    label?: string;
    title: string;
}

const Tooltip: React.FC<CustomTooltipProps> = ({ payload = [], label = EMPTY_STRING, title }) => {
    if (payload.length) {
        const donationAmount = payload[0].value;
        return (
            <div style={{ backgroundColor: '#fff', padding: '3px', border: '1px solid #ddd' }}>
                <p>{`${title}: ${label}`}</p>
                <p>{`Total: RM ${donationAmount.toLocaleString()}`}</p>
            </div>
        );
    }
    return null;
};

export default Tooltip;
