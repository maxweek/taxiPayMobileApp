import {
  SET_USER_LOGGED_IN,
  SET_USER_LOGGED_OUT,
  SET_USER_TOKEN,
  SET_USER_NATIVE_TOKEN,
  SET_USER_USERNAME_VALUE,
  SET_USER_PASSWORD_VALUE,
  SET_USER_LOADING_ON,
  SET_USER_LOADING_OFF,
  SET_USER_MONEY_TO_PAY_VALUE,
  SET_USER_MONEY_TO_PAY_VALUE_RAW,
  SET_USER_CARD_NUMBER_VALUE,
  SET_USER_CARD_NUMBER_VALUE_RAW,
  SET_USER_SELECTED_PAY_METHOD,
  SET_USER_SELECTED_BANK_CARD,
  SET_USER_STORE_BANKCARD,
  SET_USER_SELECTED_ACCOUNT,
  SET_USER_FORCE_PAY
} from "./actions";

export const defaultState = {
  username: "",
  password: "",
  token: "",
  nativeToken: "",
  info: {
    isLoggedIn: false,
    isLoading: false,
    name: "",
    moneyToPay: '',
    moneyToPayRaw: 0,
    cardNumber: '',
    cardNumberRaw: '',
    selectedMethod: '',
    selectedBankCard: '',
    storeBankCard: false,
    forcePay: false,
    account: 0
  },
};

export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER_USERNAME_VALUE:
      return {
        ...state,
        username: action.payload,
      };
    case SET_USER_PASSWORD_VALUE:
      return {
        ...state,
        password: action.payload,
      };
    case SET_USER_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_USER_NATIVE_TOKEN:
      return {
        ...state,
        nativeToken: action.payload
      };
    case SET_USER_LOGGED_IN:
      return {
        ...state,
        info: {
          ...state.info,
          isLoggedIn: action.payload,
        },
      };
    case SET_USER_LOGGED_OUT:
      return {
        ...state,
        info: {
          ...state.info,
          isLoggedIn: action.payload,
        },
      };
    case SET_USER_LOADING_ON:
      return {
        ...state,
        info: {
          ...state.info,
          isLoading: action.payload,
        },
      };
    case SET_USER_LOADING_OFF:
      return {
        ...state,
        info: {
          ...state.info,
          isLoading: action.payload,
        },
      };
    case SET_USER_MONEY_TO_PAY_VALUE:
      return {
        ...state,
        info: {
          ...state.info,
          moneyToPay: action.payload,
        },
      };
    case SET_USER_MONEY_TO_PAY_VALUE_RAW:
      return {
        ...state,
        info: {
          ...state.info,
          moneyToPayRaw: action.payload,
        },
      };
    case SET_USER_CARD_NUMBER_VALUE:
      return {
        ...state,
        info: {
          ...state.info,
          cardNumber: action.payload,
        },
      };
    case SET_USER_CARD_NUMBER_VALUE_RAW:
      return {
        ...state,
        info: {
          ...state.info,
          cardNumberRaw: action.payload,
        },
      };
    case SET_USER_SELECTED_PAY_METHOD:
      return {
        ...state,
        info: {
          ...state.info,
          selectedMethod: action.payload,
        },
      };
    case SET_USER_SELECTED_BANK_CARD:
      return {
        ...state,
        info: {
          ...state.info,
          selectedBankCard: action.payload,
        },
      };
    case SET_USER_STORE_BANKCARD:
      return {
        ...state,
        info: {
          ...state.info,
          storeBankCard: action.payload,
        },
      };
    case SET_USER_FORCE_PAY:

      return {
        ...state,
        info: {
          ...state.info,
          forcePay: action.payload,
        },
      };
    case SET_USER_SELECTED_ACCOUNT:
      return {
        ...state,
        info: {
          ...state.info,
          account: action.payload,
          selectedMethod: '',
        },
      };

    default:
      return state;
  }
};
