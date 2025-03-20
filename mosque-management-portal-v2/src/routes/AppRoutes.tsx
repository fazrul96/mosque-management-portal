import InboxPage from '../pages/InboxPage';
import SettingPage from '../pages/SettingPage';
import MosquePage from "../pages/MosquePage";
import DonationManagementPage from "../components/section/mosque/DonationManagementPage";
import LogisticManagementPage from "../components/section/mosque/LogisticManagementPage";
import PrayerTimesPage from "../components/section/mosque/PrayerTimesPage";
import {
  ROUTE_INBOX,
  ROUTE_LOGISTIC,
  ROUTE_MODULE,
  ROUTE_MOSQUE,
  ROUTE_PRAYER_TIMES,
  ROUTE_SETTINGS,
  ROUTE_USERS
} from "../constants/AppRoutes";
import {JSX} from "react";

// Define a type for the route object
interface Route {
  path: string;
  component: JSX.Element;
}

export const publicRoutes: Route[] = [
  { path: ROUTE_INBOX, component: <InboxPage /> },
  { path: ROUTE_MODULE + ROUTE_MOSQUE, component: <MosquePage /> },
  // { path: ROUTE_MOSQUE + ROUTE_USERS, component: <DonationManagementPage /> },
  // { path: ROUTE_MOSQUE + ROUTE_LOGISTIC, component: <LogisticManagementPage /> },
  // { path: ROUTE_MOSQUE + ROUTE_PRAYER_TIMES, component: <PrayerTimesPage /> },
];

export const protectedRoutes: Route[] = [
  { path: ROUTE_SETTINGS, component: <SettingPage /> }
];