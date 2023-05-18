export default async function allurl () { 
// This func fetches GQL endpoint to get process.env.api. Then returns concatenated url strings data calls appwide.   
    let pre_envdata = await fetch(`http://localhost:5000/fill_cont?query={ENV{DATABASE_URL,REACT_APP_API,REACT_APP_NODE_ENV}}`)
    // let pre_envdata = await fetch(`http://localhost:5000/fill_cont?query={ENV{DATABASE_URL,REACT_APP_API,NODE_ENV}}`)
    let env_data = await pre_envdata.json()
    let data = env_data.data.ENV
    
    let env = data[0].REACT_APP_API
    let dev_and_prod = env.split('***')

    console.log('env_data')
    console.log(env_data)

    let env_dev:string = dev_and_prod[0]
    let env_prod:string = dev_and_prod[1]

    let NODE_ENV = data[0].REACT_APP_NODE_ENV

    let allDBsettingsURL;
    let API = NODE_ENV === 'deployment' ? env_dev : env_prod
    let allUsersURL

    let urlObject = {
        API: '',    
        allDBsettingsURL: '',
        allUsersURL: '',
        ENVdata: env_data
    }

    const applyAPI = () => {
        if (NODE_ENV === 'development') {
            console.log('NODE_ENV equals deployment')
            urlObject.API = env_dev;
            urlObject.allDBsettingsURL = `${API}fill_cont?query={allDBsettings{id,age,height,weight,reminder,activity,star_time,end_time,users_id}}`;
            urlObject.allUsersURL = `${API}fill_cont?query={allUsers{id,username,password,email,age}}`
        } else {
            // let test_query = `{allDBsettings{id,age,height,weight,reminder,activity,start_time,end_time,users_id}}`
        }
    }
    const returnObject = ()=> {return urlObject}

    applyAPI()

    const UrlObjectPromise = new Promise( (resolve, reject) => {
            resolve(applyAPI())
    })

    return UrlObjectPromise.then(() => {
        return urlObject
    })    
    
}
