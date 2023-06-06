// const {useState, useEffect} = require("react")
const express = require('express');
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
let allusersPSQL;

// useEffect( () => {
//   (async() => {
//     allusersPSQL = await prisma.users.findMany()    
//   })()

// }, [])


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

async function nameOrIdForData(key) {
  if (key) {
      // parameter can be an integer (pokemon.id) or a name (pokemon.name)
// access axios. check for pokeAPI related endpoint data.abilities. and render that data or empty array. 
      let predata = await axios.get(`https://pokeapi.co/api/v2/pokemon/${key}`)
      let data = predata.data.abilities ? predata.data : []            
      return data
  } else {
      return  
  }            
}

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
          // EUSER: { type: GraphQLString }
          // EUSER: { id, googleId, username, password, email, age }
        })})

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    puppeteer: {
      type: new GraphQLList(GraphQLString),    
      description: 'Invoke Puppeteer',
      resolve: async () => {
          let promises = [
            puppeteer.launch({headless: false}).then(async(browser) => {            
              // puppeteer.launch({headless: true}).then(async(browser) => {            
                  const page = await browser.newPage();
                  await page.goto('file:///Users/medium/Desktop/alert.html');  

                  return await page.evaluate(async() => {
                    // const tree = document.valuetree;
                    const tree = await window.valuetree
                      window.valuetree.branch_3 = "yew"
                    // const treearray = await window.valuearray
                    alert(`branch 1: ${tree.branch_1}`);
                    alert(`branch 2: ${tree.branch_2}`);
                    alert(`branch 3: ${tree.branch_3}`);
                    return [
                      `branch 1: ${tree.branch_1}`,
                      `branch 2: ${tree.branch_2}`,
                      `branch 3: ${tree.branch_3}`
                    ]                    
                  })
              
                  // await browser.close();
                })
              ];              

              return await Promise.all(promises)      
      }
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
  allDBusers: {
    type: new GraphQLList(UsersType),
    description: 'List of Users from Postgres & Prisma',
    resolve: async () => {
      let allusers = await prisma.users.findMany()
      return { id, googleId, icon, username, email, password, age } = allusers
    }
  },
  allDBdata: {
    // type: DataType,
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
        const { googleId, icon, username, password, email, age } = args;
        let allusers = await prisma.users.findMany()
        let autoIncrementUserId = allusers.length + 1

        return NewUser = await prisma.users.create({
          data: {
            id: autoIncrementUserId,
            username: username,
            password: password,
            email: email,
            age: age
          }
        }).then( (u) => {
            return { id: u.id, googleId: '', icon: '', username: u.username, password: u.password, email: u.email, age: u.age }
        })
      }
  },
  // linkUserWithGoogle: {
  //     type: UsersType,
  //     description: 'App Provides choice for user/human: | Sign-up with username | Google --> This query links: username, password, email with google.',
  //     args: {
  //       username: { type: GraphQLString },
  //       // id: { type: GraphQLInt },
  //       googleId: { type: GraphQLString },
  //       // icon: { type: GraphQLString }
  //     },
  //     resolve: async (parent, args) => {  // There will be 2 functions that perform this query. 1 for username and 1 for id.     
  //       if (args.username) {
  //         const { username, googleId } = args
  //           return prisma.users.findFirst({
  //             where: {
  //               username: username
  //             }
  //           }).then(async(newUser) => {
  //             console.log('newUser serverside')
  //             console.log(newUser)
  //             const googleUpdateUser = await prisma.users.update({
  //               where: {
  //                 googleId: newUser.username
  //               },
  //               data: {
  //                 googleId: newUser.googleId
  //               }
  //             })
  //           }).then(async(updatedUser) => {    // const { id, googleId, icon, username, password, email, age } = updatedUser
  //             return { id: 101, googleId: 'updateID', icon: 'updateIcon', username: 'updateusername', password: 'updatepassword', email: 'updateemail', age: 101 }
  //           })
  //       }
  //     }
  // },
  linkUserWithGoogle: {
    type: UsersType,
    description: 'List of Settings',
    args: {
      username: { type: GraphQLString },
      googleId: { type: GraphQLString },
      icon: { type: GraphQLString }
    },
    resolve: async (parent, args) => {
      const { username, googleId, icon  } = args
      // const { username, googleId, icon } = args
      let iconGIDconcat = `${googleId}///${icon}`

      let allusers = await prisma.users.findMany()
      let mastermiz = allusers.find(user => user.username === 'mastermizery')
      let miz = mastermiz.username
      let miz2 = mastermiz[0]



      return await prisma.users.update({
      // const updateUser = await prisma.users.update({
        where: {
          id: 1
        },
        data: {          
          google_id: iconGIDconcat,
          // icon: icon
        },
      }).then( (updatedUser) => {        
      return { id: updatedUser.id || 1, googleId: updatedUser.google_id || 'updateID', icon: updatedUser.icon ||'updateIcon', username: miz || 'updateusername', password: 'updatepassword', email: 'updateemail', age: 101 }      
      })
        
      // return { id: 101, googleId: 'updateID', icon: 'updateIcon', username: miz || 'updateusername', password: 'updatepassword', email: 'updateemail', age: 101 }

    // return { id: 101, googleId: 'updateID', icon: 'updateIcon', username: 'updateusername', password: 'updatepassword', email: 'updateemail', age: 101 }
    }
  },  

  singledata: {    
    type: DataType,
    description: 'Data from Postgres a psql table column named data',
    args: {
      users_id: { type: GraphQLInt }
    },
    resolve: async ( parent, args ) => {
      // have to fix this to parse args for the id or the name. robust code: edge cases. 
        if (typeof args.users_id === 'number') {
          let data = await prisma.data.findMany()          
          let my_data = data.filter(data => data.users_id === args.users_id)
          let my = my_data[0]          
            return { google_id: my.google_id, date: my.date, progress: my.progress, weekday: my.weekday, status: my.status, users_id: my.users_id  }
        } else {    
            return { google_id: 'empty', date: 'empty', progress: 'empty', weekday: 'empty', status: 'empty', users_id: 'empty'  }
        }
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
  },
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
