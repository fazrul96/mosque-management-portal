import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import MosqueIcon from '@mui/icons-material/MosqueRounded';
import ChairIcon from '@mui/icons-material/Chair';
import MailIcon from '@mui/icons-material/Mail';
import {DONATIONS, INBOX, LOGISTICS, PRAYER_TIMES} from "../../../constants/AppConstants.ts";
import {toProperCase} from "../../../utils/stringUtils.ts";
import {Navigation} from "@toolpad/core/AppProvider";

export const PUBLIC_NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Management',
    },
    {
        segment: DONATIONS,
        title: toProperCase(DONATIONS),
        icon: <VolunteerActivismIcon />,
    },
    {
        segment: LOGISTICS,
        title: toProperCase(LOGISTICS),
        icon: <ChairIcon />,
    },
    {
        segment: PRAYER_TIMES,
        title: 'Prayers',
        icon: <MosqueIcon />,
    }
];

export const PRIVATE_NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Workspace',
    },
    {
        segment: INBOX,
        title: toProperCase(INBOX),
        icon: <MailIcon />,
    },
];