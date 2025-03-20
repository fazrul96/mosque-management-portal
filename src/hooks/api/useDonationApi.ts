import useApi from "./useBaseApi.ts";
import {MOSQUE_USERS} from '../../constants/ApiConstants.ts';

const useDonationApi = (getAccessTokenSilently: () => Promise<string>) => {
    return useApi(MOSQUE_USERS, getAccessTokenSilently);
};

export default useDonationApi;
