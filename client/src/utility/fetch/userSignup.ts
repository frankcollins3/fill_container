import WaterRequest from '../WaterRequest'
import RegexBank from '../RegexBank'

export default async function userSignup(userObj: any, NODE_ENV: string) {
  const RegexMenu = await RegexBank()
  const noWhiteSpace = RegexMenu.noWhiteSpace

  const URLstring =
    NODE_ENV === 'development'
      ? 'http://localhost:5000/fill_cont?'
      : 'amazonEC2/vercel.com/production'

  const { googleId, icon, username, email, password, age } = userObj
  const userDataArray = [googleId, icon, username, email, password, age]

  console.log('password from utility function')
  console.log(password)
  console.log(password.length)

  return new Promise((resolve, reject) => {
    const newdata = userDataArray.map((dataKey) => {
      if (typeof dataKey === 'string') {
        return dataKey.replace(noWhiteSpace, '')
      }
      return dataKey
    })

    resolve(newdata)
  }).then(async (newdata: any) => {
    const newusername = newdata[2]
    const email = newdata[3]
    const newpassword = newdata[4]
    const userSignupQuery = `query={userSignup(googleId:"G",icon:"I",username:"${newusername}",email:"${email}",password:"${encodeURIComponent(newpassword)}",age:${age}){id,googleId,icon,username,email,password}}`;
    let query = `http://localhost:5000/fill_cont?query={userSignup{id,googleId,icon,username,email,password}}`

    let headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }

    let signupFetch = fetch(`${URLstring}${userSignupQuery}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        query,
      }),
    })

    let data = await signupFetch
    return data.json()
  })
}
