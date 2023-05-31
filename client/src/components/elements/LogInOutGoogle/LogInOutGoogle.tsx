import React from "react"
import "./LoginOutGoogle.css" 

export default function LogInOutGoogle (user:any) {

    user = user.user
    // console.log(user.user.GOOGLE_ID)

    let InOutGoogleFunction:any;
        
        // if (!user) {            
        //     InOutGoogleFunction = () => { 
        //         console.log("logout functionality needed")
        //     }
        // } else {
        //     if (user.GOOGLE_ID) {
        //         InOutGoogleFunction = () => {
        //             console.log("user but no googleID but the user should be able to have a googleId and be able to reject google login")
        //         }
        //     } else {
        //         // login with user. 
        //         InOutGoogleFunction = () => {
        //             console.log("no google login")
        //         }
        //         // return { username: 'testuser', email: 'testemail', password: 'testpassword', age: 'testage' }
        //     }
        // }

        return (
            <img onClick={InOutGoogleFunction} src="/water_img/exit.png"/>            // could probably do with changing this to door.png
        )
}
