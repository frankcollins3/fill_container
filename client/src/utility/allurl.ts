export default async function allurl () {    
    let pre_envdata = await fetch(`http://localhost:5000/fill_cont?query={ENV{DATABASE_URL,REACT_APP_API,REACT_APP_NODE_ENV}}`)
    // let pre_envdata = await fetch(`http://localhost:5000/fill_cont?query={ENV{DATABASE_URL,REACT_APP_API,NODE_ENV}}`)
    let env_data = await pre_envdata.json()  
    let env = env_data.data.ENV[0].REACT_APP_API
    let dev_and_prod = env.split('***')

    // let env_dev:string = dev_and_prod[0]
    // let env_prod:string = dev_and_prod[1]

    // if (NODE)_


    // let urlObject = { }

    return env_data
    
}
