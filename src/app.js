const config = require('./config');
const express = require('express');
const { connectDB } = require('./db');
const { ApolloServer } = require('apollo-server-express');
//-------------------------------------------
const  typeDefs  = require('./merge/mergeSchema');
const  resolvers  = require('./merge/mergeResolvers');
const { makeExecutableSchema } = require('@graphql-tools/schema');
//--------------- cambio de la interfaz --------------------
const { ApolloServerPluginLandingPageProductionDefault } = require('apollo-server-core');
//-------------------------------------------

const app = express();

app.get('/', (req, res) => res.send('welcome'))
//connectDB(); 


async function start() {
  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const apolloServer = new ApolloServer({
    schema,
    //--------------- cambio de la interfaz --------------------
    plugins: [ApolloServerPluginLandingPageProductionDefault({
      embed: true
    })]
  })

  await apolloServer.start();
  apolloServer.applyMiddleware({app})

  app.use('*',  (req, res) => res.send('Not found'));

  app.listen(config.port, ()=> {
    console.log(`server on port ${config.port}`) 
  })
}


start()

