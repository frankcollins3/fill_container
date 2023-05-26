import React from "react"

export default function LogInOutGoogle (user:any) {

    let InOutGoogleFunction:any;

        if (!user) {
            console.log("there is no user")
            //  double confirm if they want to logout. 

            InOutGoogleFunction = () => { 
                console.log("logout functionality needed")
            }
            // logout functionality.
        } else {
            if (user.GOOGLE_ID) {
                // but the user should be able to have a user ID and be able to reject logging into google.
                InOutGoogleFunction = () => {
                    console.log("user but no googleID")
                }
            } else {
                // login with user. 
                InOutGoogleFunction = () => {
                    console.log("no google login")
                }
                return { username: 'testuser', email: 'testemail', password: 'testpassword', age: 'testage' }
            }
        }

        return (
            <img src="/water_img/exit.png"/>            // could probably do with changing this to door.png
        )
}