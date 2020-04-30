const {GraphQLServer} = require('graphql-yoga')
const PORT = process.env.PORT || 3000;
const {db} = require('./db/db')
const {Query} = require('./resolvers/Query')
const {Mutation} = require('./resolvers/Mutation')
const {User} = require('./resolvers/User')
const {Post} = require('./resolvers/Post')
const {Comment} = require('./resolvers/Comment')

const server = new GraphQLServer({
    typeDefs: './schema/schema.graphql', 
    resolvers:{
        Query,
        Mutation,
        User,
        Post,
        Comment
    },
    context:{
        db
    }
})

server.start({port: PORT},()=> console.log('Server Up and running!'))