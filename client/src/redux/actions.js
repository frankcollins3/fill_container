export const TOGGLE_HYDRO_SETTINGS = () => { return { type: 'TOGGLE_HYDRO_SETTINGS', } };

export const SET_LOG_IN_OUT_TYPE = (action) => {
    return {
      type: "SET_LOG_IN_OUT_TYPE",
      payload: action.payload
    }
};

export const TOGGLE_LOGIN_SIGNUP_BTN = () => { return { type: "TOGGLE_LOGIN_SIGNUP_BTN" } }

export const TOGGLE_SHOW_FORM = (action) => {
  return {
    type: "TOGGLE_SHOW_FORM",
    payload: action.payload
  }
}

export const SET_PASSWORD_INPUT = (action) => {
  return {
    type: "SET_PASSWORD_INPUT",
    payload: action.payload
  }
}
export const SET_USERNAME_INPUT = (action) => {
  return {
    type: "SET_USERNAME_INPUT",
    payload: action.payload
  }
}

export const SET_EMAIL_INPUT = (action) => {
  return {
    type: "SET_EMAIL_INPUT",
    payload: action.payload
  }
}

export const SET_AGE_INPUT = (action) => {
  return {
    type: "SET_AGE_INPUT",
    payload: action.payload
  }
}

export const TOGGLE_INPUT_FOCUS = () => { return {  type: "TOGGLE_INPUT_FOCUS" } }
