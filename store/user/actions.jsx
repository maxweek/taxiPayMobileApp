export const SET_USER_USERNAME_VALUE = 'SET_USER_USERNAME_VALUE';
export const SET_USER_PASSWORD_VALUE = 'SET_USER_PASSWORD_VALUE';
export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export const SET_USER_LOGGED_IN = 'SET_USER_LOGGED_IN';
export const SET_USER_LOGGED_OUT = 'SET_USER_LOGGED_OUT';
export const SET_USER_LOADING_ON = 'SET_USER_LOADING_ON';
export const SET_USER_LOADING_OFF = 'SET_USER_LOADING_OFF';
export const SET_USER_MONEY_TO_PAY_VALUE = 'SET_USER_MONEY_TO_PAY_VALUE';
export const SET_USER_MONEY_TO_PAY_VALUE_RAW = 'SET_USER_MONEY_TO_PAY_VALUE_RAW';
export const SET_USER_CARD_NUMBER_VALUE = 'SET_USER_CARD_NUMBER_VALUE';
export const SET_USER_CARD_NUMBER_VALUE_RAW = 'SET_USER_CARD_NUMBER_VALUE_RAW';
export const SET_USER_SELECTED_PAY_METHOD = 'SET_USER_SELECTED_PAY_METHOD';
export const SET_USER_SELECTED_ACCOUNT = 'SET_USER_SELECTED_ACCOUNT';


export const setUserUsernameValue = data => ({
    type: SET_USER_USERNAME_VALUE,
    payload: data
});
export const setUserPasswordValue = data => ({
    type: SET_USER_PASSWORD_VALUE,
    payload: data 
});

export const setUserToken = data => ({
    type: SET_USER_TOKEN,
    payload: data
});

export const setUserLoggedIn = data => ({
    type: SET_USER_LOGGED_IN,
    payload: true
});
export const setUserLoggedOut = data => ({
    type: SET_USER_LOGGED_OUT,
    payload: false
});
export const setUserLoadingOn = data => ({
    type: SET_USER_LOADING_ON,
    payload: true
});
export const setUserLoadingOff = data => ({
    type: SET_USER_LOADING_OFF,
    payload: false
});

export const setUserMoneyToPayValue = data => ({
    type: SET_USER_MONEY_TO_PAY_VALUE,
    payload: data
});
export const setUserCardNumberValue = data => ({
    type: SET_USER_CARD_NUMBER_VALUE,
    payload: data
});
export const setUserMoneyToPayValueRaw = data => ({
    type: SET_USER_MONEY_TO_PAY_VALUE_RAW,
    payload: data
});
export const setUserCardNumberValueRaw = data => ({
    type: SET_USER_CARD_NUMBER_VALUE_RAW,
    payload: data
});
export const setUserSelectedPayMethod = data => ({
    type: SET_USER_SELECTED_PAY_METHOD,
    payload: data
});
export const setUserSelectedAccount = data => ({
    type: SET_USER_SELECTED_ACCOUNT,
    payload: data
});