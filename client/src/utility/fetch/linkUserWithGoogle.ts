import allUrl from './allDBurl'

export default async function linkUserWithGoogle(signedUpUser:string|number, googleId:string, icon:any) {               
    const urlPromise = new Promise( (resolve, reject) => {
        let urlbank = allUrl()
        resolve(urlbank)
        reject(':D')
    })
    return urlPromise
    .then(async(urlbankdata:any) => {
        let env = urlbankdata.ENVdata.data.ENV
        let NODE_ENV = env.NODE_ENV                
        let googleId:string = '117827387775507687118'.replace(/\s/g, '')
        await localStorage.setItem("icon", icon)
        // might make id handler but for now I only want to facilitate this data-fetching by accessing the username as params. not the ID
        let storageIcon = await localStorage.getItem("icon")    
        let href:string = NODE_ENV === 'development' ? `http://localhost:5000/` : 'www.EC2.amazon.deploy|vercel.prod/myapp'
        try {
            const predata = await fetch(`http://localhost:5000/fill_cont?query={linkUserWithGoogle(username:"${encodeURIComponent(`${signedUpUser}`)}",icon:"${encodeURIComponent(`${storageIcon}`)}",googleId:"${encodeURIComponent(`${googleId}`)}"){id,googleId,icon,username,email,age}}`)   // W O R K S !!!!!
            const data = await predata.json()        
            return data        
        }
        catch (err:any) {
            const status:string = err.response.status
            if (err.response && err.response.status === '401') { return `${status}` } 
            return err
        }
        
    })
    // const test = async () => {
    //     let urlbank = await allUrl()
    //     let env = urlbank.ENVdata.data.ENV
    //     let miz:string = "mastermizery".replace(/\s/g, '')
    //     let googleId:string = '117827387775507687118'.replace(/\s/g, '')
    //     let icon:string = 'https://lh3.googleusercontent.com/a/AAcHTtd_55dRY1mQ1-GP5R4PHEgjmSRGTZNK7aGM8-82=s96-c'.replace(/\s/g, '')
    //     await localStorage.setItem("icon", icon)
    //     let storageIcon = await localStorage.getItem("icon")    
    //     let href:string = `http://localhost:5000/`
    //     let args = `(name:"mastermizery",googleId:"117827387775507687118",imageUrl:"https://lh3.googleusercontent.com/a/AAcHTtd_55dRY1mQ1-GP5R4PHEgjmSRGTZNK7aGM8-82=s96-c")`
    //     const predata = await fetch(`http://localhost:5000/fill_cont?query={linkUserWithGoogle(username:"${encodeURIComponent(`${miz}`)}",icon:"${encodeURIComponent(`${storageIcon}`)}",googleId:"${encodeURIComponent(`${googleId}`)}"){id,googleId,icon,username,email,age}}`)   // W O R K S !!!!!
    //     const data = await predata.json()
    //     console.log('update data from utility script')
    //     console.log(data)
    //     return data
    // }
    // return test()
}
