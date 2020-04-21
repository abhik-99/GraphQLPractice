const {GraphQLServer} = require('graphql-yoga')
const PORT = process.env.PORT || 3000;
const _ = require('lodash')

const Users =[
    {id:1, name: "AB", age:23},
    {id:2, name: "BC", age:30},
    {id:3, name: "BDC", age:32}
]

const Posts = [
    {id: 1, name: "Post 1", genre: 'fiction', authorId: 1, published: true},
    {id: 2, name: "Post 1", genre: 'non-fiction', authorId: 1, published: false},
    {id: 3, name: "Post 2", genre: 'non-fiction', authorId: 2, published: false},
    {id: 4, name: "Post 3", genre: 'fiction', authorId: 2, published: true},
]

const Comments = [
    {id: 1, text: 'This post could have been made better', authorId: 1, postId: 1},
    {id: 2, text: 'This post could not have been made better', authorId: 2, postId: 1},
    {id: 3, text: 'This post should have been made better', authorId: 1, postId: 2},
    {id: 4, text: 'This post must be made better', authorId: 3, postId: 3},
]

const typeDefs = `
type Query{
    hello: String!,
    users: [User!],
    user(id: Int!): User,
    posts: [Post!],
    post(id: Int!): Post,
    comments: [Comment!]!
}

type User{
    id: ID!,
    name: String!,
    age: Int,
    posts: [Post],
    comments: [Comment!]!
}
type Post{
    id: ID!,
    name: String,
    genre: String!,
    published: Boolean,
    author: User,
    comments: [Comment!]!
}
type Comment{
    id: ID!,
    text: String!,
    author: User!,
    post: Post!
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
        },
        comments(){
            return Comments
        }
    },
    Post:{
        author(parent, args, ctx){
            return _.find(Users, { id: parent.authorId})
        },
        comments(parent, args, ctx){
            return _.filter(Comments, {postId: parent.id})
        }
    },
    User:{
        posts(parent, args, ctx){
            return _.filter(Posts, {authorId: parent.id})
        },
        comments(parent, args, ctx){
            return _.filter(Comments, {id: parent.id})
        }
    },
    Comment:{
        author(parent, args, ctx){
            return _.find(Users, {id: parent.authorId})
        },
        post(parent, args, ctx){
            return _.find(Posts, {id: parent.id})
        }
    }
}

const server = new GraphQLServer({typeDefs, resolvers})

server.start({port: PORT},()=> console.log('Server Up and running!'))