export default async function allurl () {    
    let pre_envdata = await fetch(`http://localhost:5000/fill_cont?query={ENV{DATABASE_URL,REACT_APP_API}}`)
    let env_data = await pre_envdata.json()  
    let env = env_data.data.ENV[0].REACT_APP_API
    let dev_and_prod = env.split('***')

    console.log('env')
    console.log(env)
    console.log('dev_and_prod')
    console.log(dev_and_prod)

    // let urlObject = { }

    return env_data
    
}
