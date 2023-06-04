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

export const SET_DUMMY_PASSWORD_INPUT = (action) => {
  let actionCopy = action
  const actionPayloadValue = actionCopy.payload
  let payloadLength = actionPayloadValue.length
  return {
    type: "SET_DUMMY_PASSWORD_INPUT",
    payload: action.payload
    // payload: "*".repeat(payloadLength)
    // payload: "*".repeat(action.payload.length)
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

export const TOGGLE_INPUT_FOCUS = (action) => { 
  return {  
    type: "TOGGLE_INPUT_FOCUS",
    payload: action.payload
  }
}

export const SET_ALL_USERS = (action) => {
  return {
    type: "SET_ALL_USERS",
    payload: action.payload
  }
}

export const SET_ALL_USERNAMES = (action) => {
  return {
    type: "SET_ALL_USERNAMES",
    payload: action.payload
  }
}

export const SET_ALL_EMAILS = (action) => {
  return {
    type: "SET_ALL_EMAILS",
    payload: action.payload
  }
}

export const TOGGLE_PARENT_CONFIRM = (action) => {
  return {
    type: "TOGGLE_PARENT_CONFIRM"
  }
}

export const TOGGLE_SUBMIT_INPUT_DATA = () => {
  return {
    type: "TOGGLE_SUBMIT_INPUT_DATA"
  }
}

export const TOGGLE_GOOGLE_LINK_ACCT_SCREEN = () => {
  return {
    type: "TOGGLE_GOOGLE_LINK_ACCT_SCREEN"
  }
}

export const SET_CURRENT_USER = (action) => {
  return {
    type: "SET_CURRENT_USER",
    payload: action.payload
  }
}

// export const SET_SIGNUP_INPUTS_COMPLETE = (action) => {
//   return {
//     type: "SET_SIGNUP_INPUTS_COMPLETE",
//     payload: action.payload
//   }
// }
