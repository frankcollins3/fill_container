// const [hydroData, setHydroData] = useState();              // '/data'
// const [hydroSchedule, setHydroSchedule] = useState([]);
// const [hydroIntake, setHydroIntake] = useState();
// const [hydroSettings, setHydroSettings] = useState();
// const [reload, setReload] = useState();
// const [date, setDate] = useState();
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState();


// initial state for redux 
const initialState = {
    // water settings as app state
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

    HYDRO_INTAKE: 0,          // Math.ceil(response.settings.weight * (2 / 3))
    HYDRO_SCHEDULE: [],     //    for (let i = start_time; i < end_time; i += reminder)  // create schedule out of start time end time and notification intensity.
    SETTINGS_HYDRO: {     // pg.table.settings. (associated data that belongs to the user. This data is handled through the form presented by clicking gear.png() in the navbar.tsx )
      id: 0,
      weight: 0,
      height: 0,
      age: 0,
      start_time: 0,
      end_time: 0,
      reminder: 0,
      activity: 0,
      users_id: 0
    },
    DATE: '',             // current dateString;
    PROGRESS: 0,
    STATUS: [],
    RELOAD: false, // 0 or true ? waiting for this.
    // water settings as app state

    // environment variables from process.env (accessed through GraphQL)
      NODE_ENV: '',
      API: '',  
      GOOGLE_ID: '',   
    // 
      
    // signup state related 
    CURRENT_USER: { id: 0, googleId: '', username: '', email: '', age: '' },
    ALL_USERS: [],
    ALL_USERNAMES: [],
    ALL_EMAILS: [],
    PARENT_CONFIRM: false,

    LOG_IN_OUT_TYPE: 'LOGIN',       // LogInOutGoogle.tsx [login] [signup] clck either one to select this state.
    LOGIN_SIGNUP_BTN: false,
    LOG_IN_OUT_FLASH_MSG: '',
    DISPLAY_FORM: "",               // click hand.png to toggle the       [login] [signup]    buttons from appearing.
    PASSWORD_INPUT: "* * *",   
    PASSWORD_SHOW: false,
    PASSWORD_SHOW_CLICK: false,
    GOOGLEID_INPUT: '',    
    GOOGLE_IMG_URL: '',
    NON_GOOGLE_IMG_URL: '',
    USER_SELECT_IMG_URL: '',

    // state for signup and login
    USERNAME_INPUT_HOVER: false,
    EMAIL_INPUT_HOVER: false,
    AGE_INPUT_HOVER: false,
    PASSWORD_INPUT_HOVER: false,
    EMAIL_OR_USERNAME_LOGIN_INPUT: '',
    PASSWORD_LOGIN_INPUT: '',
    LOGIN_MSG: '',
    INCORRECT_LOGIN_ATTEMPT: 0,
    // state for signup and login
    

    USERNAME_INPUT: "",
    EMAIL_INPUT: "",
    AGE_INPUT: "",
    INPUT_FOCUS: "",               // click on an input and it will hide 
    INPUT_DBL_CLICK: false,
    SUBMIT_INPUT_DATA: false,     // form data complete, validated in LoginoutGoogle.tsx with $('.submit-faucet).click()4
    GOOGLE_LINK_ACCT_SCREEN: false,
    
    // signup state related 
    
    // link google account state;
    NO_LINK_GOOGLE_BTN_HOVER: false,
    YES_LINK_GOOGLE_BTN_HOVER: false,
    LINK_GOOGLE_BTN_CLICK: false,
    NO_LINK_GOOGLE_CLICK: false,
    // ONLINK_GOOGLE_CONFIRM_DATA: {},
    ONLINK_GOOGLE_CONFIRM_DATA:    { u: { age: 0, email: '', googleId: '', icon: '', id: 0, username: '' } },
    BLUE_G_MULTI_G_GOOGLE: false,
    // ONLINK_GOOGLE_CONFIRM_DATA:    { age: 0, email: '', googleId: '', icon: '', id: 0, username: '' },

        
    // icons  
    ICON_NOT_INPUT: false,  // this is kind of login it is the boolean that decides if the  <Route element={} will be the <ConnectedLogInOutGoogle> or the <ConnectedMeIcon>
    FLIP_FLOP_ICON: false,
    SPIN_BOTTLE_SHOW_INPUT: false,
    SPIN_BOTTLE_IMG: '',
    SPIN_BOTTLE_SEARCHING: false,
    SELECT_ICON_SCREEN: false,
    PRE_SELECTED_ICON_SRC: '',
    PSI_HOVER: false,
    GLASS_SCREEN_B4_NAV: false,
    GLASS_HALF_FULL_DB_CHOICE: { localHalfFull: false, glassFullDB: false },
    USER_ICON_CONFIRM: false,
    APP_PAGE_ICON_CONFIRM: false,
    LAST_ICON_SELECTION_TEXT: "",
    SAVE_FOR_WEEKS_INPUT_VALUE: '',
    PUPPETEER_SEARCH_TERM: '',
    // end of icons

    // settings
    AGE: 0,
    WEIGHT: 0,
    HEIGHT: 0,
    START_TIME: 0,
    END_TIME: 0,
    REMINDER: 0,
    ACTIVITY: 0,
    UNITS: 'imperial',
    LOADING: true
    // end of settings    

    // const [age, setAge] = useState(0);
    // const [weight, setWeight] = useState(0);
    // const [height, setHeight] = useState(0);
    // const [startTime, setStartTime] = useState(0);
    // const [endTime, setEndTime] = useState(0);
    // const [reminder, setReminder] = useState(0);
    // const [units, setUnits] = useState('imperial');
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState();


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

      case "SET_HYDRO_INTAKE":
        return {
          ...state,
          HYDRO_INTAKE: action.payload
        }

      case "SET_HYDRO_SCHEDULE":
        return {
          ...state,
          HYDRO_SCHEDULE: action.payload
        }

      case "SET_SETTINGS_HYDRO":
        return {
          ...state,
          HYDRO_SETTINGS: action.payload
        }

      case "SET_DATE":
        return {
          ...state,
          DATE: action.payload
        }

      case "SET_PROGRESS":
        return {
          ...state,
          PROGRESS: action.payload
        }

      case "SET_STATUS":
        return {
          ...state,
          STATUS: action.payload
        }

      case "TOGGLE_RELOAD":
        return {
          ...state,
          RELOAD: !state.RELOAD
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

      case 'SET_LOG_IN_OUT_FLASH_MSG':
        return {
          ...state,
          LOG_IN_OUT_FLASH_MSG: action.payload
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
      
      case "TOGGLE_USERNAME_INPUT_HOVER": return { ...state, USERNAME_INPUT_HOVER: !state.USERNAME_INPUT_HOVER }
      case "TOGGLE_PASSWORD_INPUT_HOVER": return { ...state, PASSWORD_INPUT_HOVER: !state.PASSWORD_INPUT_HOVER }
      case "TOGGLE_EMAIL_INPUT_HOVER": return { ...state, EMAIL_INPUT_HOVER: !state.EMAIL_INPUT_HOVER }
      case "TOGGLE_AGE_INPUT_HOVER": return { ...state, AGE_INPUT_HOVER: !state.AGE_INPUT_HOVER }

      case 'TOGGLE_PASSWORD_SHOW':
        return {
          ...state,
          PASSWORD_SHOW: !state.PASSWORD_SHOW
        }
      case 'TOGGLE_PASSWORD_SHOW_CLICK':
        return {
          ...state,
          PASSWORD_SHOW_CLICK: !state.PASSWORD_SHOW_CLICK
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

      case "TOGGLE_FLIP_FLOP_ICON":
        return {
          ...state,
          FLIP_FLOP_ICON: !state.FLIP_FLOP_ICON
        }

      case "SET_SPIN_BOTTLE_IMG":
        return {
          ...state,
          SPIN_BOTTLE_IMG: action.payload
        }
      case "TOGGLE_SPIN_BOTTLE_SEARCHING":
        return {
          ...state,
          SPIN_BOTTLE_SEARCHING: !state.SPIN_BOTTLE_SEARCHING
        }
      case "TOGGLE_SPIN_BOTTLE_SHOW_INPUT":
        return {
          ...state,
          SPIN_BOTTLE_SHOW_INPUT: !state.SPIN_BOTTLE_SHOW_INPUT
        }
      case "TOGGLE_SELECT_ICON_SCREEN": 
        return {
          ...state,
          SELECT_ICON_SCREEN: !state.SELECT_ICON_SCREEN
        }        
      case "SET_PRE_SELECTED_ICON_SRC":
        return {
          ...state,
          PRE_SELECTED_ICON_SRC: action.payload
        }

      case "TOGGLE_PSI_HOVER":
        return {
          ...state,
          PSI_HOVER: state.PSI_HOVER === true ? false : true 
        }

      case "TOGGLE_GLASS_SCREEN_B4_NAV": 
      return {
        ...state,
        GLASS_SCREEN_B4_NAV: !state.GLASS_SCREEN_B4_NAV
      }

      case "TOGGLE_GLASS_HALF_FULL_DB_CHOICE":
        return {
          ...state,
          GLASS_HALF_FULL_DB_CHOICE: {
              localHalfFull: action.payload.localHalfFull === true ? state.GLASS_HALF_FULL_DB_CHOICE.localHalfFull = true : [],
              glassFullDB: action.payload.localHalfFull === true ? state.GLASS_HALF_FULL_DB_CHOICE.glassFullDB = true : []
          } 
          // GLASS_HALF_FULL_DB_CHOICE: action.payload.localHalfFull === true ? GLASS_HALF_FULL_DB_CHOICE.localHalfFull = true || 
        }
      case "TOGGLE_USER_ICON_CONFIRM":
        return {
          ...state,
          USER_ICON_CONFIRM: !state.USER_ICON_CONFIRM
        }
      
      case "SET_LAST_ICON_SELECTION_TEXT":
        return {
          ...state,
          LAST_ICON_SELECTION_TEXT: action.payload
        }

      case "SET_SAVE_FOR_WEEKS_INPUT_VALUE":
        return {
          ...state,
          SAVE_FOR_WEEKS_INPUT_VALUE: action.payload
      }

      case "SET_NODE_ENV":
        return {
          ...state,
          NODE_ENV: action.payload
        }
      
      case "SET_API":
        return {
          ...state,
          API: action.payload
        }

      case "SET_GOOGLE_ID":
        return {
          ...state,
          GOOGLE_ID: action.payload
        }
      
      case "SET_PUPPETEER_SEARCH_TERM":
        return {
          ...state,
          PUPPETEER_SEARCH_TERM: action.payload
        }
      
      case "SET_ONLINK_GOOGLE_CONFIRM_DATA":
        const u = action.payload.u
        return {
          ...state,
          ONLINK_GOOGLE_CONFIRM_DATA: action.payload
        }
      case "TOGGLE_APP_PAGE_ICON_CONFIRM":
        return {
          ...state,
          APP_PAGE_ICON_CONFIRM: !state.APP_PAGE_ICON_CONFIRM
        }

      case "SET_EMAIL_OR_USERNAME_LOGIN_INPUT":
        return {
          ...state,
          EMAIL_OR_USERNAME_LOGIN_INPUT: action.payload
        }

      case "SET_PASSWORD_LOGIN_INPUT":
        return {
          ...state,
          PASSWORD_LOGIN_INPUT: action.payload
        }
      
      case "TOGGLE_BLUE_G_MULTI_G_GOOGLE":
        return {
          ...state,
          BLUE_G_MULTI_G_GOOGLE: !state.BLUE_G_MULTI_G_GOOGLE
        }
      
      case "SET_LOGIN_MSG":
        return {
          ...state,
          LOGIN_MSG: action.payload
        }

        case "INCREMENT_INCORRECT_LOGIN_ATTEMPT": 
        return {
          ...state,
          INCORRECT_LOGIN_ATTEMPT: state.INCORRECT_LOGIN_ATTEMPT + 1
        }
      

      case "RESET_INCORRECT_LOGIN_ATTEMPT":
        return {
          ...state,
          INCORRECT_LOGIN_ATTEMPT: state.INCORRECT_LOGIN_ATTEMPT = 0
        }
      
      case "SET_AGE":
        return {
          ...state,
          AGE: action.payload
        }

      case "SET_WEIGHT":
        return {
          ...state,
          WEIGHT: action.payload
        }

      case "SET_HEIGHT":
        return {
          ...state,
          HEIGHT: action.payload
        }

      case "SET_START_TIME": 
        return {
        ...state,
        START_TIME: action.payload
      }

      case "SET_END_TIME": 
        return {
        ...state,
        END_TIME: action.payload
      }

      case "SET_REMINDER":
        return {
          ...state,
          REMINDER: action.payload
        }

      case "SET_ACTIVITY":
        return {
          ...state,
          ACTIVITY: action.payload
        }

      case "SET_UNITS":
        return {
          ...state,
          UNITS: action.payload // was going to set this up as toggle but [imperial] [metric] are 2 buttons to click on so just set because you can't click imperial when its imperial and toggle to metric. 
        }

      case "TOGGLE_LOADING":
        return {
          ...state,
          LOADING: !state.LOADING
        }

      

        // AGE: 0,
        // WEIGHT: 0,
        // HEIGHT: 0,
        // START_TIME: 0,
        // END_TIME: 0,
        // REMINDER: 0,
        // ACTIVITY: 0,
        // UNITS: 'imperial',
        // LOADING: true  
    
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
