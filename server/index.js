const express = require('express');
const path = require("path");
const cors = require('cors');
const axios = require("axios");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const puppeteer = require("puppeteer");
require("dotenv").config();

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
  GraphQLNonNull
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
      end_time: { type: new GraphQLNonNull(GraphQLInt) },
      start_time: { type: new GraphQLNonNull(GraphQLInt) },
      users_id: { type: new GraphQLNonNull(GraphQLInt) },                  

//  id | age | height | weight | reminder | end_time | start_time | users_id 
    })})

    const UsersType = new GraphQLObjectType({
      name: 'Users',
      description: "Users Properties:",
      fields: () => ({      
        id: { type: new GraphQLNonNull(GraphQLInt) },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },        
  //  id | age | height | weight | reminder | end_time | start_time | users_id 
      })})
  
const TestType = new GraphQLObjectType({
  name: 'Test',
  description: 'We are testing yet',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    // : { type: new GraphQLNonNull(GraphQLString) },
  })
})

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    book: {
      type: BookType,
      description: 'A Single Book',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => books.find(book => book.id === args.id)
    },
    allbooks: {
      type: new GraphQLList(BookType),
      description: 'List of All Books',
      resolve: () => books
    },
    allAPIpokemon: {
        type: new GraphQLList(PokemonType),
        description: 'List of Pokemon',
        resolve: async () => {
            // let allpokemon = await allPokemonAPI()
            let bucket = []
    let pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`)
    // let pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`)
        let data = pokemon.data.results
        await data.forEach(data => bucket.push({name: data.name, poke_id: bucket.length + 1 }))
        if (bucket) { return bucket }            
        }
    },
    allDBpokemon: {
        type: new GraphQLList(PokemonType),
        // type: GraphQLString,
        description: 'hit the route please',
        resolve: async () => {

           let bucket = [];
           let pokemon = await prisma.pokemon.findMany()
           pokemon.forEach( (pokemon) => { 
             let obj = { name: pokemon.name, poke_id: pokemon.id }
             bucket.push(obj);
            })
            return bucket;                   
        }
    },    
    allDataAllPokemon: {
      type: PokemonType,
      // type: new GraphQLList(PokemonType),
      description: 'retrieve pokeAPI.co/pokemon data-> types, abilities, other data excluded from main pokeAPI.co/ endpoint ',// dont want either args: NonNull..  user can either enter a name or ID. if name as args and exlude NonNull ID from args. error from NonNull.
      args: {
        name: { type: GraphQLString },
        id: { type: GraphQLInt }
      },
      resolve: async(parent, args) => {
        let mydata = await nameOrIdForData(args.name||args.id);
        
        if (mydata) {
        // if (mydata && typeof mydata === 'object') {
          let obj = { 
            name: mydata.name, 
            poke_id: mydata.id, 
            type: mydata.types ? mydata.types[0].type.name : "no type", 
            moves: mydata.moves ? mydata.moves[0].move.name : "no moves", 
            abilities: mydata.abilities ? mydata.abilities[0].ability.name : "no abilities",
            image: mydata.sprites ? mydata.sprites.front_default : "no sprite images"
          }
          return obj

        } else { return "nothing"}        
      }
    },
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
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'List of All Authors',
      resolve: () => authors
    },
    author: {
      type: AuthorType,
      description: 'A Single Author',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => authors.find(author => author.id === args.id)
    },
    seesettings: {
      type: SettingsType,
      description: 'see all settings',
      // dont need args 
      resolve: () => {        
        return {weight: 300}
        // return "300lbs"
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


//    await settings.forEach( (stat) => { 
// let obj = { id: stat.id, weight: stat.weight, height: stat.height, age: stat.age, reminder: stat.reminder, start_time: stat.start_time, end_time: stat.end_time }        
//    bucket.push(obj);
//    })             
//           return bucket

return { id, weight, height, age, reminder, start_time, end_time, reminder, users_id } = settings 
// {id: 1, age: 30, height: 68, weight: 170, reminder: 0, start_time: 8, end_time: 8, users_id: 1 }, 
//   {id: set1.id, age: set1.age, height: set1.height, weight: set1.weight, reminder: set1.reminder, start_time: set1.start_time, end_time: set1.end_time, users_id: set1.users_id },
      }
  },   
  allUsers: {
    type: new GraphQLList(UsersType),
    description: 'List of Users from Postgres & Prisma',
    resolve: async () => {
      let allusers = await prisma.users.findMany()

      return { id, username, email, password, age } = allusers
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
