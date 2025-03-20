// String constants
export const APP_NAME: string = "Mms";
export const APP_REGION: string = "MY";
export const DRAWER_WIDTH: number = 240;
export const BACKGROUND_IMAGE: string = 'https://wallpapercave.com/wp/wp2708351.jpg';
export const GENERAL_SETTINGS: string[] = ['Profile', 'Settings'];
export const AUTH0_LOGIN_URL: string = `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH0_AUTHORIZATION}`;

// Default image URL constant
export const DEFAULT_IMAGE: string = 'https://wallpapercave.com/wp/wp2708351.jpg';

// Status colors (object)
export const STATUS_COLOR: { [key: string]: string } = {
	Completed: 'green',
	InProgress: '#FFB81C',
};

// View types and sort options (enums or constants)
export const VIEW_TYPES: { GRID: string; LIST: string } = { GRID: 'grid', LIST: 'list' };
export const SORT_OPTIONS: { NAME: string; SIZE: string; DATE: string } = { NAME: 'name', SIZE: 'size', DATE: 'date' };
export const FILE_TYPE_FILTERS: { ALL: string; FILE: string; FOLDER: string } = { ALL: 'all', FILE: 'file', FOLDER: 'folder' };

// Special constants
export const SLASH: string = '/';
export const DASH: string = '-';
export const EMPTY_STRING: string = '';
export const SINGLE_SPACE: string = ' ';
export const SINGLE_DOT: string = '.';
export const DOUBLE_DOT: string = '..';

export const NODE_MODULES_DIR: string = 'node_modules';
export const PACKAGE_DIR: string = '@greda';
export const CONFIG_DIR: string = 'common-config';
export const PROJECT_DIR: string = 'mosque-management-portal';
export const ENV_DIR: string = process.env.ACTIVE_PROFILE as string || "prd";
export const ENV_FILE: string = '.env';

export const PARENT_DIR_LEVELS: number = 3;