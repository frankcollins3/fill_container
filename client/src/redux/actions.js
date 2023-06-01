export const TOGGLE_HYDRO_SETTINGS = () => {
    return {
      type: 'TOGGLE_HYDRO_SETTINGS',
    };
  };

export const SET_LOG_IN_OUT_TYPE = (action) => {
    return {
      type: "SET_LOG_IN_OUT_TYPE",
      payload: action.payload
    }
};

export const TOGGLE_LOGIN_SIGNUP_BTN = () => {
  return {
    type: "TOGGLE_LOGIN_SIGNUP_BTN"
  }
}

export const TOGGLE_SHOW_FORM = (action) => {
  return {
    type: "TOGGLE_SHOW_FORM",
    payload: action.payload
  }
}

export const SET_PASSWORD = (action) => {
  return {
    type: "SET_PASSWORD",
    payload: action.payload
  }
}
