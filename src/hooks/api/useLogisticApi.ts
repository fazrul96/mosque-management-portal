import useApi from "./useBaseApi.ts";
import {MOSQUE_INVENTORIES} from '../../constants/ApiConstants.ts';

const useLogisticApi = (getAccessTokenSilently: () => Promise<string>) => {
    return useApi(MOSQUE_INVENTORIES, getAccessTokenSilently);
};

export default useLogisticApi;
