
export const APP_NAME: string = "Mosque Portal";

export const APP_REGION: string = "MY";
export const DRAWER_WIDTH: number = 240;
export const BACKGROUND_IMAGE: string = 'https://wallpapercave.com/wp/wp2708351.jpg';
export const GENERAL_SETTINGS: string[] = ['Profile', 'Settings'];

export const SINGLE_SPACE: string = ' ';
export const SINGLE_DOT: string = '.';

export const SLASH: string = '/';
export const DASH: string = '-';
export const EMPTY_STRING: string = '';
export const DOUBLE_DOT: string = '..';

export const INBOX: string = 'inbox';
export const DONATIONS: string = 'donations';
export const LOGISTICS: string = 'logistics';
export const PRAYER_TIMES: string = 'prayerTimes';
export const PROFILE: string = 'profile';
export const CALLBACK: string = 'callback';

export const NODE_MODULES_DIR: string = 'node_modules';
export const PACKAGE_DIR: string = '@greda';
export const CONFIG_DIR: string = 'common-config';
export const PROJECT_DIR: string = 'mosque-management-portal';
export const ENV_FILE: string = '.env';
export const ENV_PROD: string = "prd";

export const PARENT_DIR_LEVELS: number = 2;

export const DEFAULT_IMAGE: string = 'https://wallpapercave.com/wp/wp2708351.jpg';

// Define type for STATUS_COLOR as a string-object map
export const STATUS_COLOR: { [key: string]: string } = {
    Completed: 'green',
    InProgress: '#FFB81C',
};

export const GITHUB_URL: string = 'https://github.com/fazrul96';

// Define VIEW_TYPES, SORT_OPTIONS, and FILE_TYPE_FILTERS as objects with string keys and values
export const VIEW_TYPES: { [key: string]: string } = { GRID: 'grid', LIST: 'list' };
export const SORT_OPTIONS: { [key: string]: string } = { NAME: 'name', SIZE: 'size', DATE: 'date' };
export const FILE_TYPE_FILTERS: { [key: string]: string } = { ALL: 'all', FILE: 'file', FOLDER: 'folder' };
