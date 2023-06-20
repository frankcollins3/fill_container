import allDBurl from './allDBurl'

export default async function getDailyDataFetch(users_id:number) {
      const urlbank = await allDBurl() 
      const env = urlbank.ENVdata.data.ENV  
      let pre_api = env.API.split("***")
      const api = env.NODE_ENV === 'development' ? pre_api[0] : pre_api[1]   
     const PromiseToday = new Promise(async(resolve:any, reject:any) => {
        let predata = await fetch(`${api}fill_cont?query={getDailyData(users_id:${users_id}){google_id,date,progress,weekday,status,users_id}}`)
        let data = await predata.json()
        resolve(data ? data : "nodata")
        // let predata = await fetch(`http://localhost:5000/fill_cont?query={getDailyData(users_id:3){google_id,date,progress,weekday,status,users_id}}`)
     })
     return PromiseToday
     .then( (data) => { return data})
}