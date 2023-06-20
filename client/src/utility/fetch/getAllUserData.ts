import allDBurl from '../fetch/allDBurl'
import {useRegex} from '../Contexts/RegexMenu'

interface waterCycleData {
    google_id: string,
    date: string,
    progress: number,
    weekday: string,
    status: any[]   // believe it starts with false and changes to 'check' so cant be a string.
    users_id: number
}

export default async function getAllUserData (users_id:number) {
    // return { google_id: my.google_id, date: my.date, progress: my.progress, weekday: my.weekday, status: my.status, users_id: my.users_id  }      // return data from GraphQL

    // access the NODE_ENV to specify which API to use: localhost:5000 || amazonEC2|vercel.com/prod/water-app
    // const { APIsplit } = useRegex()
    const urlbank = await allDBurl() 

    const env = urlbank.ENVdata.data.ENV  
    let API:string;
    let pre_api = env.API.split("***")
    API = env.NODE_ENV === 'development' ? pre_api[0] : pre_api[1]
    
// this Promise accesses the allUserData and returns an array of data constrained to the endpoints that are specified in the {interfaceWaterCycleData} which are the same as the return data from GQL
    const alluserdataPROMISE = new Promise<waterCycleData[]>(async(resolve:any, reject:any) => {
        const predata = await fetch(`${API}fill_cont?query={allUserData(users_id:${users_id}){google_id,date,progress,weekday,status,users_id}}`)
        let data = await predata.json()
        let userdata = data.data.allUserData
        resolve(userdata)
        reject(null)
    })
    return alluserdataPROMISE
    .then( (userdata: waterCycleData[]) => {
        return userdata
    })

}