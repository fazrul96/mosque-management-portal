import path from 'path';
import {
    CONFIG_DIR,
    ENV_DIR,
    ENV_FILE,
    NODE_MODULES_DIR, PACKAGE_DIR,
    PROJECT_DIR
} from "./appConstants";

const ROOT_DIR =
    path.resolve(
        __dirname,
        NODE_MODULES_DIR,
        PACKAGE_DIR
    );

// todo only for local dev
// export const ROOT_DIR: string = path.resolve(__dirname, ...Array(PARENT_DIR_LEVELS).fill(DOUBLE_DOT)); // todo local config
export const CONFIG_PATH = process.env.CONFIG_PATH || ROOT_DIR;
export const DOTENV_PATH = path.join(
    CONFIG_PATH,
    CONFIG_DIR,
    PROJECT_DIR,
    ENV_DIR,
    ENV_FILE
);