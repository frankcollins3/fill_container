import React from 'react'

export default async function addIconToLocalStorageUser (icon:string) {
    const empty:string[]|undefined[] = [];
        const updatedUserIconPromise = new Promise( (resolve:any, reject:any) => {
                let preUser = localStorage.getItem("user")
                if (preUser != null) {
                    let userObj = JSON.parse(preUser)
                    let data:any = userObj.clone.data.userSignup
                    let icon:string = data.icon
                    resolve(userObj)
                    reject(empty)
                }
        })
        updatedUserIconPromise
        .then( (user:any) => {
            const updatedUserToLocStorPromise = new Promise( (resolve:any, reject:any) => {
                let clonedUser = {...user}
                let userString:string = JSON.stringify(clonedUser)
                localStorage.setItem("wateruser", userString)
                let storageConfirmationToken = localStorage.getItem("wateruser") ? "WATER" : "H2NO"
                resolve(storageConfirmationToken)
                reject(empty)
            })            
        })
}

// const SaveUserHalf = async () => {                              
//     const updateUserIconPromise = new Promise( (resolve:any, reject:any) => {
//         let preUser = localStorage.getItem("user");              
//         if (preUser !== null) {
//           let userObj = JSON.parse(preUser);
//           userObj.clone.data.userSignup.icon = NON_GOOGLE_IMG_URL
//           resolve(userObj)
//           reject(empty)
//         }
//     })
//     updateUserIconPromise
//     .then( (user:any) => {                
//       const updatedUserToLocStorPromise = new Promise( (resolve:any, reject:any) => {
//               let clonedUser = {...user}        
//               let userString:string = JSON.stringify(clonedUser)                    
//               localStorage.setItem("wateruser", userString)
//               let storageConfirmationToken = localStorage.getItem("wateruser") ? "WATER" : ' '
//               resolve(storageConfirmationToken)
//               reject()
//       })
//       updatedUserToLocStorPromise
//       .then( (wateruser:any) => {  
//         TOGGLE_USER_ICON_CONFIRM()            
//       })
//     }).catch( (err:any) => {            
//         return
//     })              
//   }