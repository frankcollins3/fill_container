//        /Navbar.tsx ------->      const settingsclick = () => { } else { TOGGLE_HYDRO_SETTINGS() } }   ----> gear.png.click()   TOGGLE_HYDRO_SETTINGS() make the settings sidebar appear or navigate page to do so
export const TOGGLE_HYDRO_SETTINGS = () => { return { type: 'TOGGLE_HYDRO_SETTINGS', } };

// 
// export const SET_LOG_IN_OUT_TYPE = (action) => {
//     return {
//       type: "SET_LOG_IN_OUT_TYPE",
//       payload: action.payload
//     }
// };

//      /LogInOutGoogle.tsx   ---------->         const showHideLoginSignupBtn = () => {          TOGGLE_LOGIN_SIGNUP_BTN()           ------>     <img onClick={showHideLoginSignupBtn}
export const TOGGLE_LOGIN_SIGNUP_BTN = () => { return { type: "TOGGLE_LOGIN_SIGNUP_BTN" } }

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

//    /PasswordInput.tsx && [ issue #95 ]     forgot about <input type={"password"} this was a simple hasher for decoy state so that password would be hashed in GraphQL. DummyState was "hashed" client side to show on input.
export const SET_DUMMY_PASSWORD_INPUT = (action) => {
  let actionCopy = action
  const actionPayloadValue = actionCopy.payload
  let payloadLength = actionPayloadValue.length
  return {
    type: "SET_DUMMY_PASSWORD_INPUT",
    payload: action.payload // payload: "*".repeat(action.payload.length)
  }
}

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

export const TOGGLE_LINK_GOOGLE_BTN_CLICK = () => { return { type: "TOGGLE_LINK_GOOGLE_BTN_CLICK" }}
export const NO_LINK_GOOGLE_CLICK  = () => { return { type: "NO_LINK_GOOGLE_CLICK" } }

// export const SET_SIGNUP_INPUTS_COMPLETE = (action) => {
//   return {
//     type: "SET_SIGNUP_INPUTS_COMPLETE",
//     payload: action.payload
//   }
// }
