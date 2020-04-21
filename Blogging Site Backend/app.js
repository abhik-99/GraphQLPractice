const {GraphQLServer} = require('graphql-yoga')
const PORT = process.env.PORT || 3000;
const _ = require('lodash')

const Users =[
    {id:1, name: "AB", age:23},
    {id:2, name: "BC", age:30}
]

const Posts = [
    {id: 1, name: "Post 1", genre: 'fiction', authorId: 1, published: true},
    {id: 2, name: "Post 1", genre: 'non-fiction', authorId: 1, published: false},
    {id: 3, name: "Post 2", genre: 'non-fiction', authorId: 2, published: false},
    {id: 4, name: "Post 3", genre: 'fiction', authorId: 2, published: true},
]
const typeDefs = `
type Query{
    hello: String!,
    users: [User!],
    user(id: Int!): User,
    posts: [Post!],
    post(id: Int!): Post
}

type User{
    id: ID!,
    name: String!,
    age: Int,
    posts: [Post]
}
type Post{
    id: ID!,
    name: String,
    genre: String!,
    published: Boolean,
    author: User,
}
`

const resolvers = {
    Query:{
        hello(){
            return "Test Success!"
        },
        users(){
            return Users
        },
        user(parent, args, ctx){
            return _.find(Users, {id: args.id})
        },
        posts(){
            return Posts
        },
        post(parent, args, ctx){
            return _.find(Posts, {id: args.id})
        }
    },
    Post:{
        author(parent, args, ctx){
            return _.find(Users, { id: parent.authorId})
        }
    },
    User:{
        posts(parent, args, ctx){
            return _.filter(Posts, {authorId: parent.id})
        }
    }
}

const server = new GraphQLServer({typeDefs, resolvers})

server.start({port: PORT},()=> console.log('Server Up and running!'))