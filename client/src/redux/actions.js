//        /Navbar.tsx ------->      const settingsclick = () => { } else { TOGGLE_HYDRO_SETTINGS() } }   ----> gear.png.click()   TOGGLE_HYDRO_SETTINGS() make the settings sidebar appear or navigate page to do so
export const TOGGLE_HYDRO_SETTINGS = () => { return { type: 'TOGGLE_HYDRO_SETTINGS', } };

//      /LogInOutGoogle.tsx   ---------->         const showHideLoginSignupBtn = () => {          TOGGLE_LOGIN_SIGNUP_BTN()           ------>     <img onClick={showHideLoginSignupBtn}
export const TOGGLE_LOGIN_SIGNUP_BTN = () => { return { type: "TOGGLE_LOGIN_SIGNUP_BTN" } }

export const SET_LOG_IN_OUT_FLASH_MSG = (action) => {
  return {
    type: "SET_LOG_IN_OUT_FLASH_MSG",
    payload: action.payload
  }
}

//      /LogInOutGoogle.tsx -------------->      const showform = (event:any) => {let targetid:string = event.target.id  TOGGLE_SHOW_FORM({payload: targetid}) }   ----> this also toggles state above.
export const TOGGLE_SHOW_FORM = (action) => {
  return {
    type: "TOGGLE_SHOW_FORM",
    payload: action.payload
  }
}

//    /UsernameInput.tsx ------->    const usernameinputhandler = (event:any) => { inputHandler(event, SET_USERNAME_INPUT) }        ---------> utility/inputHandler SET_USERNAME_INPUT
export const SET_USERNAME_INPUT = (action) => {
  return {
    type: "SET_USERNAME_INPUT",
    payload: action.payload
  }
}

export const SET_GOOGLEID_INPUT = (action) => {
  // let payload = action.payload ? payload : ''
  return {
    type: "SET_GOOGLEID_INPUT",
    payload: action.payload // payload: payload || action.payload
  }
}

//    /PasswordInput.tsx ------->    const passwordinputhandler = (event:any) => { inputHandler(event, SET_PASSWORD_INPUT) }        ---------> utility/inputHandler SET_PASSWORD_INPUT 
export const SET_PASSWORD_INPUT = (action) => {
  return {
    type: "SET_PASSWORD_INPUT",
    payload: action.payload
  }
}

export const TOGGLE_USERNAME_INPUT_HOVER = () => { return { type: "TOGGLE_USERNAME_INPUT_HOVER" } }
export const TOGGLE_PASSWORD_INPUT_HOVER = () => { return { type: "TOGGLE_PASSWORD_INPUT_HOVER" } }
export const TOGGLE_EMAIL_INPUT_HOVER = () => { return { type: "TOGGLE_EMAIL_INPUT_HOVER" } }
export const TOGGLE_AGE_INPUT_HOVER = () => { return { type: "TOGGLE_AGE_INPUT_HOVER" } }

      // case "TOGGLE_USERNAME_INPUT_HOVER": return { ...state, USERNAME_INPUT_HOVER: !USERNAME_INPUT_HOVER }
      // case "TOGGLE_EMAIL_INPUT_HOVER": return { ...state, PASSWORD_INPUT_HOVER: !PASSWORD_INPUT_HOVER }
      // case "TOGGLE_AGE_INPUT_HOVER": return { ...state, PASSWORD_INPUT_HOVER: !PASSWORD_INPUT_HOVER }
      // case "TOGGLE_EMAIL_INPUT_HOVER": return { ...state, EMAIL_INPUT_HOVER: !EMAIL_INPUT_HOVER }
      // case "TOGGLE_AGE_INPUT_HOVER": return { ...state, AGE_INPUT_HOVER: !AGE_INPUT_HOVER }

export const TOGGLE_PASSWORD_SHOW = () => { return { type: "TOGGLE_PASSWORD_SHOW" } }

export const TOGGLE_PASSWORD_SHOW_CLICK = () => { return { type: "TOGGLE_PASSWORD_SHOW_CLICK" } }

//    /EmailInput.tsx ------->    const emailinputhandler = (event:any) => { inputHandler(event, SET_EMAIL_INPUT) }        ---------> utility/inputHandler SET_EMAIL_INPUT 
export const SET_EMAIL_INPUT = (action) => {
  return {
    type: "SET_EMAIL_INPUT",
    payload: action.payload
  }
}

//    /AgeInput.tsx ------->    const ageinputhandler = (event:any) => { inputHandler(event, SET_AGE_INPUT) }        ---------> utility/inputHandler SET_AGE_INPUT 
export const SET_AGE_INPUT = (action) => {
  return {
    type: "SET_AGE_INPUT",
    payload: action.payload
  }
}

//      /UsernameInput.tsx && /EmailInput.tsx && /PasswordInput.tsx && /AgeInput.tsx  -----> const inputfocus = { TOGGLE_INPUT_FOCUS( { payload: 'username'} ) } ---->  sets id "username|email" as react elem value={username}  
export const TOGGLE_INPUT_FOCUS = (action) => { 
  return {  
    type: "TOGGLE_INPUT_FOCUS",
    payload: action.payload
  }
}

export const TOGGLE_INPUT_DBL_CLICK = () => { return { type: "TOGGLE_INPUT_DBL_CLICK" } }

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

//  /SignupLoginChecker.tsx  ------------>       if (loginstate === 'age') { } this checkbox, if the age is less than 10, allows user to use app -------------->    "/water_img/panda.png"
export const TOGGLE_PARENT_CONFIRM = () => { return { type: "TOGGLE_PARENT_CONFIRM" } }

// LogInOutGoogle.tsx -->  inputCheckingPromise .then( () => { if (username_good === true && email_good === true && password_good === true && age_good === true) } -----> signup data validated now data ready to submit
export const TOGGLE_SUBMIT_INPUT_DATA = () => { return { type: "TOGGLE_SUBMIT_INPUT_DATA" } }

export const TOGGLE_GOOGLE_LINK_ACCT_SCREEN = () => { return { type: "TOGGLE_GOOGLE_LINK_ACCT_SCREEN" } }

//    /LogInOutGoogle.tsx ------------->        inputCheckingPromise    .then( () => { if (username_good === true && email_good === true && password_good === true && age_good === true) {      // SET_CURRENT_USER() 
export const SET_CURRENT_USER = (action) => {
  return {
    type: "SET_CURRENT_USER",
    payload: action.payload
  }
}

export const TOGGLE_NO_LINK_GOOGLE_BTN_HOVER = () => { return { type: "TOGGLE_NO_LINK_GOOGLE_BTN_HOVER" } }
export const TOGGLE_YES_LINK_GOOGLE_BTN_HOVER = () => { return { type: "TOGGLE_YES_LINK_GOOGLE_BTN_HOVER" } }

export const TOGGLE_YES_LINK_GOOGLE_BTN_CLICK = () => { return { type: "TOGGLE_YES_LINK_GOOGLE_BTN_CLICK" }}
export const TOGGLE_NO_LINK_GOOGLE_BTN_CLICK  = () => { return { type: "TOGGLE_NO_LINK_GOOGLE_BTN_CLICK" } }

export const SET_GOOGLE_IMG_URL = (action) => {
  return { 
    type: "SET_GOOGLE_IMG_URL",
    payload: action.payload
  }
}

export const SET_NON_GOOGLE_IMG_URL = (action) => {
  return {
    type: "SET_NON_GOOGLE_IMG_URL",
    payload: action.payload
  }
}

export const SET_USER_SELECT_IMG_URL = (action) => {
  return {
    type: "SET_USER_SELECT_IMG_URL",
    payload: action.payload
  }
}

// ^ ^ login redux ^ ^                v v ICON state v v 

export const TOGGLE_ICON_NOT_INPUT = () => { return  { type: "TOGGLE_ICON_NOT_INPUT" } }

export const TOGGLE_FLIP_FLOP_ICON = () => { return { type: "TOGGLE_FLIP_FLOP_ICON" } }

export const SET_SPIN_BOTTLE_IMG = (action) => {
  return {
    type: "SET_SPIN_BOTTLE_IMG",
    payload: action.payload
  }
}

export const TOGGLE_SPIN_BOTTLE_SEARCHING = () => { return { type: "TOGGLE_SPIN_BOTTLE_SEARCHING"} }

export const TOGGLE_SPIN_BOTTLE_SHOW_INPUT = () => { return { type: "TOGGLE_SPIN_BOTTLE_SHOW_INPUT" } }

export const TOGGLE_SELECT_ICON_SCREEN = () => { return { type: "TOGGLE_SELECT_ICON_SCREEN" } }

export const SET_PRE_SELECTED_ICON_SRC = (action) => {
    return {
      type: "SET_PRE_SELECTED_ICON_SRC",
      payload: action.payload
    }
}

export const TOGGLE_PSI_HOVER = () => { return { type: "TOGGLE_PSI_HOVER" } }

export const TOGGLE_GLASS_SCREEN_B4_NAV = () => { return { type: "TOGGLE_GLASS_SCREEN_B4_NAV" } }

export const TOGGLE_GLASS_HALF_FULL_DB_CHOICE = () => { return { type: "TOGGLE_GLASS_HALF_FULL_DB_CHOICE" } }

export const TOGGLE_USER_ICON_CONFIRM = () => { return { type: "TOGGLE_USER_ICON_CONFIRM" } }



//     GLASS_SCREEN_B4_NAV: false,
    // GLASS_HALF_FULL_DB_CHOICE: false,
