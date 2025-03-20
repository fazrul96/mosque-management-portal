
export const APP_NAME: string = "Portfolio";
export const APP_REGION: string = "MY";
export const DRAWER_WIDTH: number = 240;
export const BACKGROUND_IMAGE: string = 'https://wallpapercave.com/wp/wp2708351.jpg';
export const GENERAL_SETTINGS: string[] = ['Profile', 'Settings'];

export const AUTH0_LOGIN_URL: string = `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH0_AUTHORIZATION}`;

export const SINGLE_SPACE: string = ' ';
export const SINGLE_DOT: string = '.';

export const SLASH: string = '/';
export const DASH: string = '-';
export const EMPTY_STRING: string = '';
export const DOUBLE_DOT: string = '..';

export const NODE_MODULES_DIR: string = 'node_modules';
export const PACKAGE_DIR: string = '@greda';
export const CONFIG_DIR: string = 'common-config';
export const PROJECT_DIR: string = 'portfolio-portal';
export const ENV_DIR: string = process.env.ACTIVE_PROFILE || 'prd';
export const ENV_FILE: string = '.env';

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
