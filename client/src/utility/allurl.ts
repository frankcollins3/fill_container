export default async function allurl () {    
    let pre_envdata = await fetch(`http://localhost:5000/fill_cont?query={ENV{DATABASE_URL,REACT_APP_API}}`)
    let env_data = await pre_envdata.json()  
    let env = env_data.data.ENV[0].REACT_APP_API
    console.log('env')
    console.log(env)
    // /let env = env_data.ENV[0].REACT_APP_API
    console.log('env_data')
    console.log(env_data)
    // console.log(env')
    // console.log(env)

    return env_data
    
}