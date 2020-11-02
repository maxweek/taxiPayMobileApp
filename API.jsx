import * as axios from 'axios';

export const API_USER_LOGIN = '/api/login/driver';
export const API_USER_GET_MONEY = '/api/withdraw'
export const API_USER_RECOVERY_CHECK = '/api/recovery';
export const API_USER_RECOVERY_SET = '/api/recovery/password';
export const API_USER_BANKCARD_DELETE = '/api/card';
export const API_USER_BANKCARD_STORAGE = '/api/external_card';
export const API_USER_BANKCARD_STORAGE_CHECK = '/api/external_card/check';
export const API_GET_ACCOUNTS = '/api/accounts';
export const API_GET_METHODS = '/api/methods';
export const API_CHECK = '/blabla';

export const apiSetSID = (token) => {
    axios.defaults.headers.common['Cookie'] = {
        "PHPSESSID": token
    };
}
export const apiTrashSID = () => {
    axios.defaults.headers.common['Cookie'] = {
        "PHPSESSID": null
    };
    console.log(axios.defaults.headers)
}

export default axios.create({
    headers: {
        "Access-Control-Allow-Origin": '*',
        'Content-Type': 'multipart/form-data; charset=utf-8; boundary="another cool boundary";'
    },
    // baseURL: `http://cp.taxipay.antonov.site`,
    baseURL: `https://drivermoney.online`,
});
