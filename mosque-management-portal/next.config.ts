import type {NextConfig} from "next";
import {loadEnvConfig} from '@next/env';
import dotenv from 'dotenv';
import {DOTENV_PATH} from "@/constants/configConstants";
import {ENGLISH, MALAYSIAN} from "@/constants/localeConstants";

const result = dotenv.config({ path: DOTENV_PATH }) || dotenv.config();
if (result.error) {
  console.error('Error loading .env file:', result.error);
} else {
  console.log('Loaded environment variables:', result.parsed);
}

loadEnvConfig(DOTENV_PATH);

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  i18n: {
    locales: [ENGLISH, MALAYSIAN],
    defaultLocale: ENGLISH,
    localeDetection: false,
  },
  trailingSlash: true,
};

export default nextConfig;
