const express = require('express');
const graphHTTP = require('express-graphql')

const PORT = process.env.PORT || 3000;

var app = express();

const graphql = require('graphql');
const {buildSchema } = graphql;

const Users = [
    {id: 1, name: "Test 1", age:23},
    {id: 2, name: "Test 2", age:34}
]

const Posts = [
    {id: 1, genre: "tech", published: false, author: 1},
    {id: 2, genre: "slice of life", published: true, author: 1},
    {id: 3, genre: "tech", published: false, author: 2},
]

const schema = buildSchema(`
type Query{
    quoteOfTheDay: String,
    users: [User!]!
    posts: [Post!]!
    user(data: User): User
}
type User{
    id: ID!,
    name: String,
    age: Int
}
type Post{
    id: ID!,
    genre: String, 
    published: Boolean,
    author: ID
}
`)
const resolver = {
    users: ()=>{
        return Users
    },
    quoteOfTheDay: ()=>{
        return "Test Success!"
    }
}

app.use('/graphql', graphHTTP({
    graphiql: true,
    schema,
    rootValue: resolver
}))
app.get('/', (req,res)=> res.send("API Working! Please head over to /graphql to use the backend"))
app.listen(PORT, ()=> console.log("Listening on Port", PORT));