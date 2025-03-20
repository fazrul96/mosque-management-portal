import {defineConfig} from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import {loadEnv} from './src/config/loadEnv';
import {NODE_MODULES_DIR, PACKAGE_DIR} from './src/constants/AppConstants';

const ROOT_DIR = path.resolve(__dirname, NODE_MODULES_DIR, PACKAGE_DIR);
const CONFIG_PATH = process.env.CONFIG_PATH || ROOT_DIR;
const ENV_DIR = process.env.VITE_ACTIVE_PROFILE || 'local';

const envVars = loadEnv(CONFIG_PATH, ENV_DIR);
const apiUrl = envVars?.REACT_APP_BASE_URL || 'http://localhost:5173';

export default defineConfig({
  base: '/',
  plugins: [react()],
  define: {
    'import.meta.env': envVars,
  },
  server: {
    proxy: {
      '/api': apiUrl,
    },
    allowedHosts: ['mosque-portal.mfzrl.cyou', 'spring-boot-app.mfzrl.cyou'],
  },
});
