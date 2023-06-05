export default async function userSignup (user:any, NODE_ENV:string) {
        // const myfetch = await fetch(`http://localhost:5000/fill_cont?query={userSignup{id,googleId,icon,username,email,age}}`)
        let localURL:string = `http://localhost:5000/fill_cont?`
        let query = `query={userSignup{id,googleId,icon,username,email,age}}`
        if (NODE_ENV === 'development') {
            const userSignup = await fetch(`${localURL}${query}`)
            return userSignup
        }
        else if (NODE_ENV === 'production') {
            // build URL and the same steps.
        }

}