import * as React from 'react';
import {Chip} from '@mui/material';
import {ROUTE_HOME, ROUTE_INBOX, ROUTE_MODULE, ROUTE_MOSQUE,} from '@/constants/routeConstant';
import {SIDEBAR_TEXT} from '@/constants/sidebarConstants';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MailIcon from '@mui/icons-material/Mail';
import ProjectIcon from '@mui/icons-material/Build';
import MediumIcon from '@mui/icons-material/Book';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import BackupIcon from '@mui/icons-material/Backup';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MosqueIcon from '@mui/icons-material/Mosque';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import PieChartIcon from '@mui/icons-material/PieChart';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ConstructionIcon from '@mui/icons-material/Construction';
import OpenAPIIcon from '@mui/icons-material/Api';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const SIDEBAR_ICONS = {
    dashboard: <DashboardIcon />,
    inbox: <MailIcon />,
    component: <ProjectIcon />,
    medium: <MediumIcon />,
    module: <ViewModuleIcon />,
    mosque: <MosqueIcon />,
    guard: <LocalPoliceIcon />,
    dietitian: <PieChartIcon />,
    ml: <AutoAwesomeIcon />,
    workspace: <WorkspacePremiumIcon />,
    space: <ConstructionIcon />,
    webtoon: <MenuBookIcon />,
    storage: <BackupIcon />,
    openapi: <OpenAPIIcon />,
};

const createChip = (label: string, color: 'success' | 'warning' | 'error'): React.ReactNode => {
    return <Chip label={label} color={color} size="small" />;
};

export const PUBLIC_NAVIGATION = [
    {
        kind: 'header',
        title: 'Main items',
        segment: null,
        icon: null,
        route: null
    },
    {
        segment: SIDEBAR_TEXT.public.dashboard.toLocaleLowerCase(),
        title: SIDEBAR_TEXT.public.dashboard,
        icon: SIDEBAR_ICONS.dashboard,
        route: ROUTE_HOME,
        action: createChip("Completed", "success")
    },
    {
        segment: SIDEBAR_TEXT.public.inbox.toLocaleLowerCase(),
        title: SIDEBAR_TEXT.public.inbox,
        icon: SIDEBAR_ICONS.inbox,
        route: ROUTE_INBOX,
        action: createChip("Ongoing", "warning")
    },
    {
        segment: SIDEBAR_TEXT.public.module.toLocaleLowerCase(),
        title: SIDEBAR_TEXT.public.module,
        icon: null,
        route: ROUTE_MODULE,
        children: [
            {
                segment: SIDEBAR_TEXT.public.mosque.toLocaleLowerCase(),
                title: SIDEBAR_TEXT.public.mosque,
                icon: null,
                route: ROUTE_MOSQUE,
                action: createChip("Dev", "warning")
            },
        ]
    }
];

export const PRIVATE_NAVIGATION = [
    {
        kind: 'header',
        title: 'Workspace',
        segment: null,
        icon: null,
        route: null
    }
];
