import WaterRequest from '../WaterRequest'
import RegexBank from '../RegexBank'

export default async function userSignup (userObj:any, NODE_ENV:string) {     
        const RegexMenu = await RegexBank()
        let noWhiteSpace = RegexMenu.noWhiteSpace

        // let localURL:string = `http://localhost:5000/fill_cont?`
        const URLstring = NODE_ENV === 'development' ? `http://localhost:5000/fill_cont?` : 'amazonEC2/vercel.com/production'

const { googleId, icon, username, email, password, age } = userObj  // ID to be set in /server/index.js GraphQL query with prisma.Users.findMany().length
let userDataArray = [googleId, icon, username, email, password, age]

        const whiteSpacePromise = new Promise( (resolve, reject) => {
              userDataArray.forEach( (dataKey) => {
                if (typeof dataKey === 'string') {
                  dataKey.replace(noWhiteSpace, '')
                }
              })
        })

const newusername = username.replace(noWhiteSpace, '');

const userSignupQuery = `query={userSignup(googleId:"G",icon:"I",username:"${newusername}",email:"you@you.you",password:"newpass",age:42){id,googleId,icon,username,email,password}}`;

// const userSignupQuery = `query={userSignup(googleId:"G",icon:"I",username:"${newusername}",email:"${email}",password:"${password}",age:${age}){id,googleId,icon,username,email,password}}`;

                                                              // cant have googleid or icon be empty!!
// const userSignupQuery = `query={userSignup(googleId:"${googleId}",icon:"${icon}",username:"${username}",email:"${email}",password:"${password}",age:${age}){id,googleId,icon,username,email,password}}`;       
            let query = `http://localhost:5000/fill_cont?query={userSignup{id,googleId,icon,username,email,password}}`

            let headers = {
                "Content-Type": "application/json",
                Accept: "application/json",                
            }
    
            let signupFetch = fetch(`${URLstring}${userSignupQuery}`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                  query,
                //   args: { id, username },
                }),
              })
            let data = (await signupFetch).json()
            return data

            // const url = `http://localhost:5000/fill_cont?query=${encodeURIComponent(userSignupQuery)}`;
            // return userSignup
}
