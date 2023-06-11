import React, { useState, useEffect, ReactNode, useContext, createContext } from 'react'

    let db:string = ''
    let api:string = ''
    let node_env:string = ''
    let google_id:string = ''

    type ENV_API_DB_TYPE = {
        DATABASE_URL: string,
        API: string,
        NODE_ENV: string,
        GOOGLE_ID: string | undefined
    }

    const ENV_API_DB_defaults : ENV_API_DB_TYPE = {
        DATABASE_URL: db || 'no DB url',
        API: api || 'no API yet',
        NODE_ENV: node_env || 'NO_NODE_ENV',
        GOOGLE_ID: google_id || ''
    }

    const EnvContext = createContext<ENV_API_DB_TYPE>(ENV_API_DB_defaults)

    export function useEnv() {
        return useContext(EnvContext)
    }

    type Props = {
        children: ReactNode
    }

    export function EnvProvider( {children} : Props) {


        useEffect( () => {
            
            (async() => {
                const envfetch = await fetch(`http://localhost:5000/fill_cont?query={ENV{DATABASE_URL,API,NODE_ENV,GOOGLE_ID}}`)
                const envdata = await envfetch.json()
                console.log('envdata from useContext')
                console.log(envdata)
                let data = envdata.data.ENV
                let preAPI = data.API
                let dev_and_prod = preAPI.split('***')
                let env_dev:string = dev_and_prod[0]
                let env_prod:string = dev_and_prod[1]
                // let api = env_dev;
            })();

        }, [])

        const [DATABASE_URL, setDATABASE_URL] = useState(db)
        const [API, setAPI] = useState(api)
        const [NODE_ENV, setNODE_ENV] = useState(node_env)
        const [GOOGLE_ID, setGOOGLE_ID] = useState(node_env)

        const value = {
            DATABASE_URL,
            API,
            NODE_ENV,
            GOOGLE_ID
        }

        return (
            <EnvContext.Provider value={value}>
                    {children}
            </EnvContext.Provider>
        )
    }  