// const [hydroData, setHydroData] = useState();              // '/data'
// const [hydroIntake, setHydroIntake] = useState();
// const [hydroSchedule, setHydroSchedule] = useState([]);
// const [hydroSettings, setHydroSettings] = useState();
// const [reload, setReload] = useState();
// const [date, setDate] = useState();
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState();


// initial state for redux 
const initialState = {
    HYDRO_SETTINGS: false,            // click gear.png the gear navbar icon and it brings up the sidebar on the main container.

    HYDRO_DATA: {                     // fetch(postgres/tables/data)    
      id: 0,
      google_id: '',
      date: 1992-11-21,
      progress: 0,
      weekday: 'noneday',
      status: {},
      users_id: 0
    },

    CURRENT_USER: {
        id: 0,
        username: '',
        email: '',
        age: ''
        // no password that data doesn't need to be client facing.
    },

    // signup state related 
    LOG_IN_OUT_TYPE: 'LOGIN',       // LogInOutGoogle.tsx [login] [signup] clck either one to select this state.
    LOGIN_SIGNUP_BTN: false,
    DISPLAY_FORM: "",               // click hand.png to toggle the       [login] [signup]    buttons from appearing.
    PASSWORD_INPUT: "***",        
    DUMMY_PASSWORD_INPUT: "***",
    USERNAME_INPUT: "",
    EMAIL_INPUT: "",
    AGE_INPUT: "",
    INPUT_FOCUS: "",               // click on an input and it will hide 
    SUBMIT_INPUT_DATA: false,     // form data complete, validated in LoginoutGoogle.tsx with $('.submit-faucet).click()4
    GOOGLE_LINK_ACCT_SCREEN: false,

    // user related redux state
    ALL_USERS: [],
    ALL_USERNAMES: [],
    ALL_EMAILS: [],
    PARENT_CONFIRM: false,
  };

  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'TOGGLE_HYDRO_SETTINGS':
        return {
          ...state,
          // HYDRO_SETTINGS: state.HYDRO_SETTINGS === false ? true : false   
          HYDRO_SETTINGS: !state.HYDRO_SETTINGS,     // this is saying set the boolean to the value that it isn't which would toggle it true/false.
        };
      case 'SET_HYDRO_DATA':
        return {
          ...state,
        HYDRO_DATA: { 
            id: action.payload.id, google_id: action.payload.google_id, date: action.payload.date, progress: action.payload.progress,
            weekday: action.payload.weekday, status: action.payload.status, users_id: action.payload.users_id
          }
        }
      case 'SET_LOG_IN_OUT_TYPE':
        return {
          ...state,
          LOG_IN_OUT_TYPE: action.payload
          // LOG_IN_OUT_TYPE: !action.payload ? "LOGOUT" : action.payload === "GOOGLE" ? "GOOGLE" : action.payload === "LOGOUT" ? "LOGOUT" : "LOGIN"
        }
      case 'TOGGLE_LOGIN_SIGNUP_BTN':
        return {
          ...state,
          // LOGIN_SIGNUP_BTN: state.LOGIN_SIGNUP_BTN === 'LOGIN_SIGNUP_TEST' ? "also test" : "LOGIN_SIGNUP_TEST"
          LOGIN_SIGNUP_BTN: state.LOGIN_SIGNUP_BTN === false ? true : false 
          // LOGIN_SIGNUP_BTN: !state.LOGIN_SIGNUP_BTN
        }
      case 'TOGGLE_SHOW_FORM':
        return {
          ...state,
          DISPLAY_FORM: action.payload
        }
      // this is the state for signup/login inputs so that a password checker can be made for the password input and others.
      case 'SET_PASSWORD_INPUT':
      // case 'SET_PASSWORD_INPUT' || 'SET_EMAIL_INPUT' || 'SET_USERNAME_INPUT' || 'SET_AGE_INPUT':
        return {
          ...state,
          PASSWORD_INPUT: action.payload
        }
      
      case 'SET_DUMMY_PASSWORD_INPUT':        
        return {
          ...state,
          DUMMY_PASSWORD_INPUT: action.payload
          // DUMMY_PASSWORD_INPUT: dummyPassword
          // DUMMY_PASSWORD_INPUT: `${state.DUMMY_PASSWORD_INPUT}`
          // DUMMY_PASSWORD_INPUT: "*".repeat(action.payload.length)
        }

      case "SET_USERNAME_INPUT":
        return {
          ...state,
          USERNAME_INPUT: action.payload
        }
      case "SET_EMAIL_INPUT":
        return {
          ...state,
          EMAIL_INPUT: action.payload
        }

      case "SET_AGE_INPUT":
        return {
          ...state,
          AGE_INPUT: action.payload
        }

      case "TOGGLE_INPUT_FOCUS":
        return {
          ...state,
          INPUT_FOCUS: action.payload
          // INPUT_FOCUS: !state.INPUT_FOCUS
        }
      case "SET_ALL_USERS":
        return {
          ...state,
          ALL_USERS: action.payload
        }
      case "SET_ALL_USERNAMES":
        return {
          ...state,
          ALL_USERNAMES: action.payload
        }
      case "SET_ALL_EMAILS":
        return {
          ...state,
          ALL_EMAILS: action.payload
        }
      case "TOGGLE_PARENT_CONFIRM":
        return {
          ...state,
          PARENT_CONFIRM: !state.PARENT_CONFIRM
          // PARENT_CONFIRM: state.PARENT_CONFIRM === true ? false : true
        }

      case "TOGGLE_SUBMIT_INPUT_DATA":
        return {
          ...state,
          SUBMIT_INPUT_DATA: state.SUBMIT_INPUT_DATA === false ? true : false 
        }
      case "TOGGLE_GOOGLE_LINK_ACCT_SCREEN":
        return {
          ...state,
          GOOGLE_LINK_ACCT_SCREEN: state.GOOGLE_LINK_ACCT_SCREEN === false ? true : false
        }
      case "SET_CURRENT_USER":
        let payload = action.payload
        let id = payload.id ? payload.id : ''
        let username = payload.username ? payload.username : ''
        let email = payload.email ? payload.email : ''
        let age = payload.age ? payload.age : ''

        return {
          ...state,
          CURRENT_USER: { id: id, username: username, email: email, age: age }
        }


      default:
        return state;
    }
  };
  
  export default rootReducer;
  


  // hydroData                  // is the entire response of the data from the './data' route.     This is the same data that is associated to the user. 

  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await WAPPRequest('/data', {
  //       method: 'GET',
  //     }).catch(() => {
  //       setError(true);
  //       return null;
  //     });

  //     if (response) {
  //       setHydroData(response);

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 



// hydroIntake:             body weight based calculation for a value that apparently represents how much water the currentUser must drink.
  // setHydroIntake(
  //   response.settings  
  //     ? Math.ceil(response.settings.weight * (2 / 3))      
  //     : 100
  // );
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 


//  hydroSchedule           [ username, email, password, age, settings, schedule ]      // the schedule is the same data in the schedule column for the user table.
//  setHydroSchedule(response.schedule);
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 



//  hydroSettings          [username, email, password, age, settings, schedule ]        // settings is the same as the data in the user table column for postgres.
//  setHydroSettings(response.settings);
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 




// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 


// [date, setDate] -----> 

// 1: const date = new Date();        //      this date is not the same date as the state date. this date is a locally declared date within the useEffect( () => ) from App.jsx WAPP
// setDate(
  //   `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
  // );
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
  
  

  // [loading, setLoading] = (true)
  // setLoading(false);               // this is done in the opening useEffect that deals with the main data.

  // if (loading) { <spinner/> }            // the loading is set to true until the data hits.

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
  


  // const [reload, setReload] = useState();
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
