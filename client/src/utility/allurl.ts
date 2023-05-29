// URL bank for APP-API 
export default async function allurl (users_id:number|undefined|null|string) { 
    let parsedId:number|undefined;
    if (users_id === undefined || users_id === null) {
        parsedId = undefined
    } else {
        if (typeof users_id === 'string') parsedId = parseInt(users_id)
        else if (typeof users_id === 'number') parsedId = users_id
    }
    
// This func fetches GQL endpoint to get process.env.api. Then returns concatenated url strings data calls appwide.   

    // promise based checking of local host or production first, avoiding error crashing the app, and proceeding onto trying the other local or production path string in a fetch
    // fetch(localhost).then( (!data) => return )
    // fetch(production)

    let pre_envdata = await fetch(`http://localhost:5000/fill_cont?query={ENV{DATABASE_URL,API,NODE_ENV,GOOGLE_ID}}`)
    // let pre_envdata = await fetch(`http://localhost:5000/fill_cont?query={ENV{DATABASE_URL,REACT_APP_API,NODE_ENV}}`)
    let env_data = await pre_envdata.json()
    let data = env_data.data.ENV
    
    let preAPI = data.API
    let dev_and_prod = preAPI.split('***')

    let env_dev:string = dev_and_prod[0]
    let env_prod:string = dev_and_prod[1]

    let NODE_ENV = data.NODE_ENV    

    let allDBsettingsURL;
    let API = NODE_ENV === 'development' ? env_dev : env_prod
    // let API = NODE_ENV === 'development' ? env_prod : env_dev
    let allUsersURL

    let urlObject = {
        API: '',    
        allDBsettingsURL: '',
        allUsersURL: '',
        ENVdata: env_data,
        data: '',
    }

    const applyAPI = () => {
        if (NODE_ENV === 'development') {
            urlObject.API = API;
            urlObject.allDBsettingsURL = `${API}fill_cont?query={allDBsettings(users_id: 1){id,age,height,weight,reminder,activity,start_time,end_time,users_id}}`;
            urlObject.allUsersURL = `${API}fill_cont?query={allDBusers{id,username,password,email,age}}`
            urlObject.data = `${API}fill_cont?query={singledata(users_id:1){google_id,progress,weekday,date,status,users_id}}`
            // urlObject.data = `${API}fill_cont?query={data(users_id:${parsedId}){google_id,progress,weekday,date,status,users_id}}`
        } else {
            // let test_query = `{allDBsettings{id,age,height,weight,reminder,activity,start_time,end_time,users_id}}`
        }
    }
    const returnObject = ()=> {
    return urlObject
    }

    applyAPI()

    const UrlObjectPromise = new Promise( (resolve, reject) => {
            resolve(applyAPI())
    })

    return UrlObjectPromise.then(() => {
        return urlObject
    })    
}
// I considered exporting it as a type safe createContext() read only string storage but strings exported as object seems fine.   
