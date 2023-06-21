// const {useState, useEffect} = require("react")
const express = require('express');
const bcrypt = require("bcryptjs");
const path = require("path");
const cors = require('cors');
const axios = require("axios");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const puppeteer = require("puppeteer");
require('dotenv').config()

// routes functions:
const allPokemon = require("./routes/allPokemon")
const data = require("./routes/data")

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const dataRouter = require('./routes/data')
const anotherDataRouter = require('./routes/allPokemon')

// graphiql ----------> localhost:5000/graphql
const PORT = 5000;
const app = express();

const allusersDB = prisma.users.findMany
const alldataDB = prisma.data.findMany

const allPokemonAPI = async () => {    
    let bucket = []
    let pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`)
        let data = pokemon.data.results
        await data.forEach(data => bucket.push({name: data.name, id: bucket.length + 1 }))
        if (bucket) { return bucket }
}

// middleware
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const expressGraphQL = require('express-graphql').graphqlHTTP

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLScalarType, Kind,
} = require('graphql')

const authors = [
	{ id: 1, name: 'J. K. Rowling' },
	{ id: 2, name: 'J. R. R. Tolkien' },
	{ id: 3, name: 'Brent Weeks' }
]

const books = [
	{ id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
	{ id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
	{ id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
	{ id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
	{ id: 5, name: 'The Two Towers', authorId: 2 },
	{ id: 6, name: 'The Return of the King', authorId: 2 },
	{ id: 7, name: 'The Way of Shadows', authorId: 3 },
	{ id: 8, name: 'Beyond the Shadows', authorId: 3 }
]

const pokemon = [
    { id: 1, name: 'bulbasaur' },
    { id: 2, name: 'ivysaur' },
    { id: 3, name: 'venusaur' },
    { id: 4, name: 'charmander' },
    { id: 5, name: 'charmeleon' },
    { id: 6, name: 'charizard' },
    { id: 7, name: 'squirtle' },
    { id: 8, name: 'wartortle' },
    { id: 9, name: 'blastoise' }
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This represents a book written by an author',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: (book) => {
        return authors.find(author => author.id === book.authorId)
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This represents a author of a book',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author) => {
        return books.filter(book => book.authorId === author.id)
      }
    }
  })
})

const PokemonType = new GraphQLObjectType({
    name: 'Pokemon',
    description: "Pokemon data from Pokeapi.co for Postgres database",
    fields: () => ({      
      name: { type: new GraphQLNonNull(GraphQLString) },
      poke_id: { type: new GraphQLNonNull(GraphQLInt) },
      type: { type: new GraphQLNonNull(GraphQLString) },
      moves: { type: GraphQLString },
      abilities: { type: GraphQLString },
      image: { type: GraphQLString },
    })})

const SettingsType = new GraphQLObjectType({            
    name: 'Settings',
    description: "Settings for Fluid Intake",
    fields: () => ({      
      id: { type: new GraphQLNonNull(GraphQLInt) },
      age: { type: new GraphQLNonNull(GraphQLInt) },
      weight: { type: new GraphQLNonNull(GraphQLInt) },
      height: { type: new GraphQLNonNull(GraphQLInt) },
      reminder: { type: GraphQLInt },
      activity: { type: GraphQLInt },
      end_time: { type: new GraphQLNonNull(GraphQLInt) },
      start_time: { type: new GraphQLNonNull(GraphQLInt) },
      users_id: { type: new GraphQLNonNull(GraphQLInt) },                  
//  id | age | height | weight | reminder | end_time | start_time | users_id 
    })})

    const UsersType = new GraphQLObjectType({
      name: 'Users',
      description: "Users Properties:",
      fields: () => ({      
        id: { type: (GraphQLInt) },     // { type: new GraphQLNonNull(GraphQLInt)}
        googleId: { type: GraphQLString },  // user can choose between regular signin or googleId signin so cant NonNull in [ GraphQL | Postgres ] 
        icon: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },        
  //  id | age | height | weight | reminder | end_time | start_time | users_id 
      })})

      const GraphQLDate = new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
          // Convert incoming date string to Date object
          return new Date(value);
        },
        serialize(value) {
          // Convert outgoing Date object to ISO 8601 string
          return value.toISOString();
        },
        
        parseLiteral(ast) {
          if (ast.kind === Kind.STRING) {
            // Parse date string literal to Date object
            return new Date(ast.value);
          }
          return null;
        },
      });
      
      // google_id, access_token, refresh_tokenm, expiry_date, users_id
      const DataType = new GraphQLObjectType({
        name: 'Data',
        description: 'Data:',
        fields: () => ({
          // id: { type: GraphLQInt }, // psql id. not sure if it's needed but its not NONNULLED so can be ommitted.
          google_id: { type: GraphQLString },
          date: { type: new GraphQLNonNull(GraphQLString) },
          // date: { type: new GraphQLNonNull(GraphQLDate) },
          progress: { type: GraphQLInt },
          weekday: { type: GraphQLString },
          status: { type: new GraphQLList(GraphQLString) },
          users_id: { type: new GraphQLNonNull(GraphQLInt) }       
        })
      })
      
      const EnvType = new GraphQLObjectType({            
        name: 'ENV',
        description: "Env Variables",
        fields: () => ({      
          DATABASE_URL: { type: new GraphQLNonNull(GraphQLString) },          
          API: { type: new GraphQLNonNull(GraphQLString) },
          NODE_ENV: { type: GraphQLString },
        GOOGLE_ID: { type: GraphQLString },          
        })})

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    puppeteer: {
      type: GraphQLString,
      description: 'Invoke Puppeteer',
      args: {
        searchTerm: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const { searchTerm } = args;
        const backupArr = [
          '/water_img/water-park.png',
          '/water_img/manta-ray.png',
          '/water_img/aqua-jogging.png',
          '/water_img/whale.png',
        ];
        const randomValue =
          backupArr[Math.floor(Math.random() * backupArr.length)].trim();
    
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
    
        // Navigate to Google Images
        await page.goto(
          `https://www.google.com/search?q="${searchTerm}"}&tbm=isch`
        );
    
        // Wait for the images to load
        await page.waitForSelector('.rg_i', { timeout: 60000 });
    
        // Evaluate the page and extract the first image URL
        const imageUrl = await page.evaluate(() => {
          const image = document.querySelector('.rg_i');
          const url = image.getAttribute('data-src') || image.getAttribute('src');
          return url;
        }).catch(() => {
          return randomValue;
        });
        // If the URL is present, return the base64 encoded image
        if (imageUrl) {
          try {
            const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            const base64Image = Buffer.from(response.data, 'binary').toString('base64');
            return `data:${response.headers['content-type']};base64,${base64Image}`;
          } catch (error) {
            console.error('Error fetching image:', error);
          }
        }    
        // If the URL is not present or fetching fails, return the random backup image
        return randomValue;
      },
    },
    ENV: {      
      type: EnvType,
      description: 'List of Env Variables',
      resolve: () => {
        let env = process.env
        let db_url = env.DATABASE_URL
        let dev = env.REACT_APP_API_DEV      
        let prod = env.REACT_APP_API_PROD
        let NODE_ENV = env.REACT_APP_NODE_ENV
        let GOOGLE_ID = env.REACT_APP_GOOGLE_ID
        let EmergencyUser = env.REACT_APP_EUSER || {id: 1, googleId: '', password: '', username: '', email: 'no@nomail.com', age: 1 }   // so user can see app if the login doesn't allow for it.
        // let server = process.env.NODE_ENV === 'development' ? dev : prod
        let serverStringForSplit = `${dev}***${prod}`
        let obj = { DATABASE_URL: db_url, API: serverStringForSplit, NODE_ENV: NODE_ENV, GOOGLE_ID: GOOGLE_ID }
        // let obj = { DATABASE_URL: db_url, API: serverStringForSplit, NODE_ENV: NODE_ENV, GOOGLE_ID: GOOGLE_ID, EUSER: EmergencyUser }
        return obj          
      }
    }, 
    allDBsettings: {
      type: new GraphQLList(SettingsType),
      // type: GraphQLString,
      description: 'List of Settings',
      resolve: async () => {
         let bucket = [];
         let settings = await prisma.settings.findMany()
         let set1 = settings[0]
         return { id, weight, height, age, reminder, start_time, end_time, reminder, activity, users_id } = settings 
      }
    },   
    userSettings: {
      type: SettingsType,
      description: 'Provide user as args and return corresponding prisma.settings data from psql db',
      args: {
        id: { type: GraphQLInt }
      }, 
      resolve: async ( parent, args ) => {
        // let predata = await fetch(`http://localhost:5000/fill_cont?query={userSettings(id:1){id,weight,height,age,reminder,start_time,end_time,reminder,activity,users_id}}`)
        let { id } = args        
        let allsettings = await prisma.settings.findMany()    
        let settingsLength = allsettings.length + 1
        let allusers = await prisma.users.findMany()
        let me = allusers.filter(us => us.id === id)
        let myage = me[0].age
        let mySettings = allsettings.filter(settings => settings.users_id === id)
        mySettings = mySettings[0]
              const s = mySettings
              return { 
                id: mySettings.id,
                weight: s.weight || 150,
                height: s.height || 75, 
                age: s.age || 22,
                start_time: s.start_time || 8, 
                end_time: s.end_time || 16,
                reminder: s.reminder || 2,
                activity: s.activity || 1, 
                users_id: id 
              }       
              // return { id, weight, height, age, start_time, end_time, reminder, activity, users_id } = mySettings          
          // }
      }   
    },
    postSettings: {
      // let predata = await fetch(`http://localhost:5000/fill_cont?query={postSettings(weight:${WEIGHT},height:${HEIGHT},age:${AGE},start_time:${START_TIME},end_time:${END_TIME},reminder:${REMINDER},activity:${ACTIVITY},users_id:${user_id}){id,weight,height,age,reminder,start_time,end_time,reminder,activity,users_id}}`)
      type: SettingsType,
      description: 'Post Settings',
      args: {
        weight: { type: GraphQLInt },
        height: { type: GraphQLInt },
        age: { type: GraphQLInt },
        start_time: { type: GraphQLInt },
        end_time: { type: GraphQLInt },
        reminder: { type: GraphQLInt },
        activity: { type: GraphQLInt },
        users_id: { type: GraphQLInt },        
      }, 
      resolve: async (parent, args) => {
        let { weight, height, age, start_time, end_time, reminder, activity, users_id } = args
        let meAsUser = await prisma.users.findUnique({ where: { id: users_id }})

        let allSettings = await prisma.settings.findMany()
        let mySettings = allSettings.filter(settings => settings.users_id === users_id)

        mySettings = mySettings[0]        
        if (mySettings) {
          const deleteUser = await prisma.settings.delete({
            where: {
              id: mySettings.id
            },
          })
        }
        let newSettings = await prisma.settings.findMany()
        let newLength = newSettings.length + 1
        
          return NewSettings = await prisma.settings.create({
                data: {
                    id: newLength,
                    weight: weight,
                    height: height,
                    age: age,
                    start_time: start_time,
                    end_time: end_time,
                    reminder: reminder,
                    activity: activity,
                    users_id: users_id,
              }
          }).then(async(data) => {
            return { id, weight, height, age, start_time, end_time, reminder, activity, users_id } = data
          }).catch( () => {
            return { id: settingsLength || 0, weight: weight || 0, height: height || 0, age: age || 0, start_time: start_time || 0, end_time: end_time || 0, reminder: reminder || 0, activity: activity || 0, users_id: users_id || 0 }            
          })
      }
    },
  allDBusers: {
    type: new GraphQLList(UsersType),
    description: 'List of Users from Postgres & Prisma',
    resolve: async () => {
      let allusers = await prisma.users.findMany()
      return { id, googleId, icon, username, email, password, age } = allusers
    }
  },
  allDBdata: {
    type: new GraphQLList(DataType),
    description: 'All Data from Postgres and Prisma',
    resolve: async () => {
      let alldata = await prisma.data.findMany()
      let bucket = []
      const loopAndPush = () => {
        alldata.forEach( (data) => {
          let d = data;
          let dataObj = { google_id: d.google_id, date: d.date, progress: d.progress, weekday: d.weekday, status: d.status, users_id: d.users_id }
          bucket.push(dataObj)
        })
      }
      const iPromiseIllPush = new Promise( (resolve, reject) => {
        resolve( loopAndPush() );
        
        reject( ['its', 'okay', 'to', 'be', 'rejected'] )
      })   
      return iPromiseIllPush
      .then( () => {
          return bucket.length > 1 ? bucket : [{
            google_id: 'empty', date: 'empty', progress: 0, weekday: 'empty', status: ['empty', 'empty'], users_id: 0
          }]
      })
      .catch( (err) => {
        console.log('in the catch block of the Promise execution')
      })         
    }
  },
  userData: {    
    type: DataType,
    description: 'Data from Postgres a psql table column named data',
    args: {
      users_id: { type: GraphQLInt }
    },
    resolve: async ( parent, args ) => {
      // let predata = await fetch(`http://localhost:5000/fill_cont?query={userData(users_id:1){google_id,date,progress,weekday,status,users_id}}`)
          let data = await prisma.data.findMany()          
          let my_data = data.filter(data => data.users_id === args.users_id)
          let my = my_data[0]          
          if (!my) return
            return { google_id: my.google_id, date: my.date, progress: my.progress, weekday: my.weekday, status: my.status, users_id: my.users_id  }      
        }
    },
  allUserData: {
    type: new GraphQLList(DataType),
    description: 'All "data" water-cycle reports that correspond to data.user_id',
    args: {
      users_id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: async (parent, args) => {
    // const userdata = await fetch(`http://localhost:5000/fill_cont?query={allUserData(users_id:3){google_id,date,progress,weekday,status,users_id}}`)
      const { users_id } = args
      let data = await alldataDB()
        const mydata = data.filter(waterCycleData => waterCycleData.users_id === users_id)
        return mydata
      // const dataPromise = new Promise( (resolve, any) => {
      //   const mydata = data.filter(waterCycleData => waterCycleData.users_id === users_id)
      //   resolve(mydata ? mydata[0] : "nodata") 
      // })
      // return dataPromise
      // .then( (data) => {
      //   const d = data
      //   return { google_id: d.google_id, date: d.date, progress: d.progress, weekday: d.weekday, status: d.status, users_id: d.users_id }
      // })
    }
  },
  getDailyData: {
    type: DataType,
    description: 'Daily Data for Water Intake',
    args: {
      users_id: { type: GraphQLInt },
    },
    resolve: async (parent, args) => {
    // let predata = await fetch(`http://localhost:5000/fill_cont?query={getDailyData(users_id:3){google_id,date,progress,weekday,status,users_id}}`)
        const { users_id } = args
        const allusers = await allusersDB()
        const alldata = await alldataDB()
        const dataLength = alldata.length
        let me = allusers.filter(users => users.id === users_id)
        const date = new Date()
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' } )
        const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`        
        const dateAndUserCheck = alldata.find(data => data.date === dateString && data.users_id === users_id)
        if (dateAndUserCheck) {
          // Data already exists for the given date and user
          return dateAndUserCheck;
        }

        if (!me) return
        return newDailyDate = prisma.data.create({
          data: {
            id: dataLength + 1,
            google_id: me.google_id || 'no google-id',
            date: dateString,
            progress: 0,
            weekday: dayName,
            status: [],
            users_id: users_id
          }
        }).then( (newdate) => {
          let d = newdate;
          return { id: d.id, google_id: d.google_id, date: d.date, progress: d.progress, weekday: d.weekday, status: d.status, users_id: d.users_id }
          // return { id, google_id, date, progress, weekday, status, users_id}
        })
    }
  },
  updateDailyData: {
    type: DataType,
    description: 'User already got Daily data and went through the daily water cycle. This is the end update',
    args: {
      users_id: { type: new GraphQLNonNull(GraphQLInt) },
      progress: { type: new GraphQLNonNull(GraphQLInt) },
      status: { type: new GraphQLList(GraphQLString) },
      date: { type: GraphQLString }
    },
    resolve: async (parent, args) => {
      // let predata = await fetch(`${API}fill_cont?query={updateDailyData(progress:${roundedProgress},status:"${status}",users_id:${pre_user.id}){google_id,date,progress,weekday,status,users_id}}`)
      const { users_id, progress, status, date } = args;
      const allusers = await allusersDB();
      const alldata = await alldataDB()
      const today = new Date().getDate()
      const mydata = alldata.find(data => data.users_id === users_id && data.date === date)
      return await prisma.data.update({
        where: {
          id: mydata.id
        },
        data: {          
          progress: progress >= 93 ? 100 : progress,
          status: status
        },
      }).then(updatedData => {
        const d = updatedData;
        return { google_id: d.google_id, date: date, progress: d.progress, weekday: d.weekday, status: d.status, users_id: d.users_id };

        // return { google_id: d.google_id, date: date, progress: d.progress, weekday: d.weekday, status: d.status, users_id: d.users_id };
        // return { google_id: d.google_id, date: date, progress: d.progress, weekday: d.weekday, status: d.status, users_id: d.users_id };
      });
    }
  },
  userLogin: {
    type: UsersType,
    description: 'Login',
    args: {
      emailOrUsername: { type: GraphQLString },
      password: { type: GraphQLString }
    }, 
    resolve: async ( parent, args) => {
      const { emailOrUsername, password } = args              
      const allusers = await prisma.users.findMany()
      let emailBool = false
      emailOrUsername.includes('@') ? emailBool = true : false
      let me; 
      if (emailBool) {
        me = allusers.filter(us => us.email === emailOrUsername)
      } else {
        me = allusers.filter(us => us.username === emailOrUsername)
      }
      me = me[0]          
      // let me = allusers.filter(us => us.email || us.username === e mailOrUsername)
      let myDBpassword = me.password
      // handle account recovery over here
      if (!me) { throw new Error("Username or Password Don't match")}

      const passTheSalt = bcrypt.compareSync(password, myDBpassword)

      if (passTheSalt) {
        return { id: me.id, googleId: me.googleId, icon: me.icon, username: me.username, password: me.password, email: me.email, age: me.age }
      }
       else {
        return { id: 0, googleId: 'yes', icon: 'yea', username: 'name', password: 'password', email: 'email', age: 1 }        
      }

    }
  },
  userSignup: {
      type: UsersType,
      description: 'User Signup from /LogInOutGoogle.tsx. The data is submitted from  const inputCheckingPromise = new Promise()',
      args: {
        // id: { type: GraphQLInt },
        googleId: { type: GraphQLString },
        icon: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve: async ( parent, args ) => {
// const userSignupQuery = `query={userSignup(googleId:"G",icon:"I",username:"${newusername}",email:"${email}",password:"${encodeURIComponent(newpassword)}",age:${age}){id,googleId,icon,username,email,password}}`;        
        const { googleId, icon, username, password, email, age } = args;
        let allusers = await prisma.users.findMany()
        let autoIncrementUserId = allusers.length + 1

        const saltRounds = 13
        const tableSalt = bcrypt.genSaltSync(saltRounds)
        const passHasher = bcrypt.hashSync(password, tableSalt)


        return NewUser = await prisma.users.create({
          data: {
            id: autoIncrementUserId,
            username: username,
            password: passHasher,
            // password: password,
            email: email,
            age: age
          }
        }).then( (u) => {
            return { id: u.id, googleId: '', icon: '', username: u.username, password: u.password, email: u.email, age: u.age }
        })
      }
  },
  linkUserWithGoogle: {
    type: UsersType,
    description: 'User already signed up -> They also want to link account -> add googleId and googleIcon to DB.',
    args: {
      username: { type: GraphQLString },
      googleId: { type: GraphQLString },
      icon: { type: GraphQLString }
    },
    resolve: async (parent, args) => {
      const { username, googleId, icon  } = args
      let argsArray = [googleId, icon]
      let iconGIDconcat = `${googleId}///${icon}`
      let allusers = await prisma.users.findMany()    
      let me = allusers.filter(user => user.username === username)
      
      let myid = me[0].id  
        
      let encodePromise = new Promise( (resolve, reject) => {
          let encodedArray = argsArray.map((arg) =>                   // map over the elements which will return an array
          typeof arg === 'string' ? encodeURIComponent(arg).replace(/\s/g, '') : []
        );
          resolve(encodedArray);
          reject('-____-')
      })
      return encodePromise
      .then(async(encoded) => {
        let alreadyUsedGoogleId = allusers.some(user => user.google_id === googleId)
        let alreadyUsedGoogleIcon = allusers.some(user => user.icon === icon)
        
        return await prisma.users.update({
        // const updateUser = await prisma.users.update({
          where: {
            id: myid
          },
          data: {          
            google_id: alreadyUsedGoogleId ? 'Google Account in Use. Profile can Fix.' : googleId,          // access .map() ----> let argsArray = [googleId, icon]   [0] = googleId  [1] = icon
            icon: alreadyUsedGoogleIcon ? "Good icon is used for another account" : icon,
          },
        }).then( (updatedUser) => {        
          const u = updatedUser
        return { id: u.id || 1, googleId: u.google_id, icon: u.icon, username: u.username, password: u.password, email: u.email, age: u.age }      
        })
      })            
    }
  },  
  NonGoogleIconUpdate: {
    // type: GraphQLString,
    type: UsersType,
    description: 'User just signed up. They rejected link Google, now They pick a profileIcon for which to update User',
    args: {
      id: { type: GraphQLInt },
      icon: { type: GraphQLString }
    },
    resolve: async (parent, args) => {
      const { id, icon } = args;
      const users = await prisma.users.findMany()
      let myId = users.find(user => user.id === id)

      return await prisma.users.update({        
          where: {
            id: id
          },
          data: {          
            icon: icon
          },
        }).then( (updatedUser) => {        
          const u = updatedUser
        return { id: u.id, icon: u.icon }      
        // return { id: u.id, googleId: u.google_id, icon: u.icon, username: u.username, password: u.password, email: u.email, age: u.age }      
        // return { id: u.id, googleId: u.google_id, icon: u.icon, username: u.username, password: u.password, email: u.email, age: u.age }      
        })        
    }
  },
  idArgsReturnIcon: {
    type: GraphQLString || GraphQLInt,
    description: 'Add Key to args, return the value of the key that matches the arg',
    args: {
      id: { type: GraphQLInt },
    },
    resolve: async ( parent, args ) => {
      let allusers = await prisma.users.findMany()    
      const { id } = args
      let me = allusers.filter(user => user.id === id)   
      me = me[0]
      
      let icon = me.icon ? me.icon : "/water_img/bite.png"
      return icon
    }   
  },
  clientId: {
    type:  GraphQLString,
    description: 'Retrieve Google Credentials From .env for Google Oauth2.0',
    // resolve: () => {( process.env.REACT_APP_GOOGLE_ID )}    
    resolve: async () => {
      let server_google_clientId = process.env.REACT_APP_GOOGLE_ID
      // let server_google_clientId = process.env.REACT_APP_GOOGLE_ID
      return server_google_clientId || "hey you guys"
    }
  }
  }) 
})

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    hello: {
        type: GraphQLString,
        description: 'Hey guys',
        resolve: () => {
            return "Hello To ALL"
        }
    },
    addBook: {
      type: BookType,
      description: 'Add a book',
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        const book = { id: books.length + 1, name: args.name, authorId: args.authorId }
        books.push(book)
        return book
      }
    },
    addAuthor: {
      type: AuthorType,
      description: 'Add an author',
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        const author = { id: authors.length + 1, name: args.name }
        authors.push(author)
        return author
      }
    },
    addPokemon: {
        type: PokemonType,
        description: 'Add a pokemon',
        args: {
            // arg to run condition against. With a strict equality match
            name: { type: GraphQLString },            
            // id: { type: GraphQLString}
        },
        resolve: (parent, args) => {
            const poke = { poke_id: pokemon.length + 1, name: args.name }
        pokemon.push(poke)
        return poke
        }
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})


app.use('/fill_cont', expressGraphQL({
  schema: schema,
  graphiql: true
}))

app.use('/data', dataRouter)
app.use('/anotherdata', anotherDataRouter);

app.listen(PORT || 5000, () => console.log(`Drink up on Port: ${PORT}`))

module.exports = app;

      // puppeteer: {
      //   type: GraphQLString,
      //   description: 'Invoke Puppeteer',
      //   args: {
      //     searchTerm: { type: GraphQLString },
      //     // backupArr: { type: new GraphQLList(GraphQLString) }
      //   },
      //   resolve: async (parent, args) => {
      //     const { searchTerm, } = args;
      //     const backupArr = ['/water_img/water-park.png', '/water_img/manta-ray.png', '/water_img/aqua-jogging.png', '/water_img/whale.png'];
      //     let randomValue = backupArr[Math.floor(Math.random() * backupArr.length)].trim()
      //     const browser = await puppeteer.launch({headless: true});
      //     const page = await browser.newPage();
          
      //     // Navigate to Google Images
      //     await page.goto(`https://www.google.com/search?q="${searchTerm}"}&tbm=isch`);
      //     // await page.goto(`https://www.google.com/search?q=${encodeURIComponent(searchTerm)}&tbm=isch`);
          
      //     // Wait for the images to load
      //     // await page.waitForSelector('.rg_i');
      //     await page.waitForSelector('.rg_i', { timeout: 60000 })
        
      //     // Evaluate the page and extract the first image URL
      //     return imageUrl = await page.evaluate(() => {
      //       const image = document.querySelector('.rg_i');
      //       const url = image.getAttribute('data-src') || image.getAttribute('src') || '/water_img/hand.png';          
      //       return url ? url : randomValue
      //     }).catch( () => {
      //       return randomValue
      //     })        
      //   }
      // },

      // const RelatedUsersSettingsType = new GraphQLObjectType({
      //   type: "RelatedUsersSettings",
      //   description: 'Users with related Settings as Associated Data',
      //   fields: () => ({
      //     ...UsersType.getFields(),
      //     settings: {
      //       type: SettingsType
      //     }
      //   })
      // })

      // Settings: {
      //   type: RelatedUsersSettingsType,
      //   description: 'Return User data connected to the Provided Args, and that Users associated Settings data',
      //   args: {
      //     users_id: { type: GraphQLInt}
      //   },
      //   resolve: async (parent, args) => {
      //     const {users_id} = args
      //     return RelatedUserSettings = prisma.users.findUnique({
      //       where: {
      //         id: users_id
      //       },
      //       include: {
      //         settings: true
      //       }
      //     }).then( (data) => {
      //       googleId,icon,username,password,email,age,height,weight,start_time,end_time,reminder,activity,users_id
      //       const s = data.settings
      //         return {
      //           googleId: data.googleId, icon: data.googleIcon, username: data.username, password: data.password, email: data.email, age: data.age, 
      //           start_time: s.start_time, end_time: s.end_time, reminder: s.reminder, activity: s.activity, users_id: s.users_id
      //         }
      //         // return {data}
      //     })
      //   }
      // },
