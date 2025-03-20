import dotenv from 'dotenv';
import path from 'path';
import {CONFIG_DIR, ENV_FILE, PROJECT_DIR} from "../constants/AppConstants.ts";

export const loadEnv = (configPath: string, envDir: string) => {
    const DOTENV_PATH = path.join(
        configPath,
        CONFIG_DIR,
        PROJECT_DIR,
        envDir,
        ENV_FILE
    );
    const { error, parsed } = dotenv.config({ path: DOTENV_PATH }) || dotenv.config();

    if (error) {
        console.error('Error loading .env file:', error);
        return null;
    } else {
        console.log('Loaded environment variables:', parsed);
        return parsed;
    }
};
