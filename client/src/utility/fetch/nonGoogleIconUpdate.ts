import React from 'react'
import allUrl from './allDBurl'
    // resolve(fetch(`http://localhost:5000/fill_cont?query={NonGoogleIconUpdate(id:3,icon:"${NON_GOOGLE_IMG_URL}"){id,icon}}`))

    export default async function nonGoogleIconUpdate (id:number, icon:string) {
            const envfetch = await fetch(`http://localhost:5000/fill_cont?query={ENV{DATABASE_URL,API,NODE_ENV,GOOGLE_ID}}`)
            const envdata = await envfetch.json()
            console.log('envdata from useContext')
            console.log(envdata)
            let data = envdata.data.ENV
            let NODE_ENV:string = data.NODE_ENV
            let preAPI = data.API
            let API:string;
            let dev_and_prod = preAPI.split('***')
            let env_dev:string = dev_and_prod[0]
            let env_prod:string = dev_and_prod[1]
            // if (NODE_ENV === 'development') API = env_dev
            NODE_ENV === 'development' ? API = env_dev : env_prod
            // let api = env_dev;
    
        
    const envPromise = new Promise( (resolve:any, reject:any) => {

    })
}  