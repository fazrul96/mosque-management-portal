// import SettingPage from '../pages/SettingPage';
import MosquePage from "../pages/MosquePage";
import DonationModulePage from "../pages/module/DonationModulePage.tsx";
import LogisticModulePage from "../pages/module/LogisticModulePage.tsx";
import PrayerTimesModulePage from "../pages/module/PrayerTimesModulePage.tsx";
import {
  ROUTE_CALLBACK,
  ROUTE_DONATIONS,
  ROUTE_HOME,
  ROUTE_LOGISTIC,
  ROUTE_PRAYER_TIMES
} from "../constants/AppRoutes.ts";
import {JSX} from "react";
import CallbackPage from "../pages/CallbackPage.tsx";

interface Route {
  path: string;
  component: JSX.Element;
}

export const publicRoutes: Route[] = [
  { path: ROUTE_HOME, component: <MosquePage /> },
  { path: ROUTE_CALLBACK, component: <CallbackPage /> },
  // { path: ROUTE_INBOX, component: <InboxPage /> },
  { path: ROUTE_DONATIONS, component: <DonationModulePage /> },
  { path: ROUTE_LOGISTIC, component: <LogisticModulePage /> },
  { path: ROUTE_PRAYER_TIMES, component: <PrayerTimesModulePage /> },
];

export const protectedRoutes: Route[] = [
  // { path: ROUTE_SETTINGS, component: <SettingPage /> }
];