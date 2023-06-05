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

    // signup state related 
    CURRENT_USER: { id: 0, googleId: '', username: '', email: '', age: '' },
    ALL_USERS: [],
    ALL_USERNAMES: [],
    ALL_EMAILS: [],
    PARENT_CONFIRM: false,

    LOG_IN_OUT_TYPE: 'LOGIN',       // LogInOutGoogle.tsx [login] [signup] clck either one to select this state.
    LOGIN_SIGNUP_BTN: false,
    DISPLAY_FORM: "",               // click hand.png to toggle the       [login] [signup]    buttons from appearing.
    PASSWORD_INPUT: "***",   
    GOOGLEID_INPUT: '',    
    GOOGLE_IMG_URL: '',
    NON_GOOGLE_IMG_URL: '',
    USER_SELECT_IMG_URL: '',

    DUMMY_PASSWORD_INPUT: "***",
    USERNAME_INPUT: "",
    EMAIL_INPUT: "",
    AGE_INPUT: "",
    INPUT_FOCUS: "",               // click on an input and it will hide 
    INPUT_DBL_CLICK: false,
    SUBMIT_INPUT_DATA: false,     // form data complete, validated in LoginoutGoogle.tsx with $('.submit-faucet).click()4
    GOOGLE_LINK_ACCT_SCREEN: false,

    ICON_NOT_INPUT: false,
    // signup state related 
    
    // link google account state;
    NO_LINK_GOOGLE_BTN_HOVER: false,
    YES_LINK_GOOGLE_BTN_HOVER: false,
    LINK_GOOGLE_BTN_CLICK: false,
    NO_LINK_GOOGLE_CLICK: false,

    // link google account state;


    // user related redux state

  };

  const rootReducer = (state = initialState, action) => {
    let payload;
    payload = action.payload ? action.payload : ''
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

      case "SET_GOOGLEID_INPUT":
          return {
            ...state,
            GOOGLEID_INPUT: action.payload
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

      case "TOGGLE_INPUT_DBL_CLICK":
        return {
          ...state,
          INPT_DBL_CLICK: !state.INPUT_DBL_CLICK
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
        return {
          ...state,
          CURRENT_USER: { id: payload.id, googleId: payload.googleId, username: payload.username, email: payload.email, age: payload.age }
        }

      
      case "TOGGLE_NO_LINK_GOOGLE_BTN_HOVER":
        return {
          ...state,
          NO_LINK_GOOGLE_BTN_HOVER: state.NO_LINK_GOOGLE_BTN_HOVER === false ? true : false 
        }

      case "TOGGLE_YES_LINK_GOOGLE_BTN_HOVER":
        return {
          ...state,
          YES_LINK_GOOGLE_BTN_HOVER: state.YES_LINK_GOOGLE_BTN_HOVER === false ? true : false 
        }
      
      case "TOGGLE_YES_LINK_GOOGLE_BTN_CLICK":        
        return {
          ...state,
          LINK_GOOGLE_BTN_CLICK: !state.LINK_GOOGLE_BTN_CLICK
        }

      case "TOGGLE_NO_LINK_GOOGLE_BTN_CLICK":
        return {
          ...state,
          NO_LINK_GOOGLE_CLICK: !state.NO_LINK_GOOGLE_CLICK
        }

      case "SET_GOOGLE_IMG_URL":
        return {
          ...state,
          GOOGLE_IMG_URL: action.payload
        }

      case "SET_NON_GOOGLE_IMG_URL":
        return {
          ...state,
          NON_GOOGLE_IMG_URL: action.payload
        }

      case "SET_USER_SELECT_IMG_URL":
        return {
          ...state,
          USER_SELECT_IMG_URL: action.payload
        }

      case "TOGGLE_ICON_NOT_INPUT":
        return {
          ...state,
          ICON_NOT_INPUT: !state.ICON_NOT_INPUT
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
