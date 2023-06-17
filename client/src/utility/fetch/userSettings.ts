import allDBurl from './allDBurl'

export default async function userSettingsFetch (users_id:number) {

    const urlbank = await allDBurl() 
    const env = urlbank.ENVdata.data.ENV  
      let pre_api = env.API.split("***")
      let api;
      api = env.NODE_ENV === 'development' ? pre_api[0] : pre_api[1]      

    let presettings = await fetch(`${api}fill_cont?query={userSettings(id:${users_id}){id,weight,height,age,start_time,end_time,reminder,activity,users_id}}`)                
    if (!presettings) return null
    let userSettings = await presettings.json()
    return userSettings
}