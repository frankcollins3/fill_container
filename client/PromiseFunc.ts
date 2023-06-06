export default function PromiseFunc (resolveHandler:any, rejectHandler:any) {
        let I_PROMISE = new Promise( (resolve:any, reject:any) => {
                resolve(resolveHandler)
                reject(rejectHandler)
        })                            
        return I_PROMISE         
}