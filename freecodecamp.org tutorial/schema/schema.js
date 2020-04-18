const graphql = require('graphql')

const {
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphql;
const _ = require('lodash');

const Author = require('../models/Author')
const Book = require('../models/Book')



const BookType = new GraphQLObjectType({
    name: 'Book',
    fields:()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                console.log(parent.authId, _.find(Authors, { id: parent.authId}))
                return Author.find({ id: parent.authId})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields:()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        sex: {type: GraphQLString},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({ authId: parent.authId})
            }
        }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields:{
        book:{
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                 return Book.findbyId(args.id)
            }
        },
        author:{
            type: AuthorType,
            args: { id: { type: GraphQLID}},
            resolve(parent, args, ){
                return Author.findById(args.id)
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return Author.find({})
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addAuthor:{
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                sex: { type: GraphQLString},
                age: { type: GraphQLInt},
            },
            resolve(parent, args){
                console.log("Arguments Received", args)
                let author = new Author({
                    name: args.name,
                    sex: args.sex,
                    age: args.age
                })

                return author.save()
            }
        },
        addBook:{
            type: BookType,
            args:{
                name: { type:  new GraphQLNonNull(GraphQLString)},
                genre: { type:  new GraphQLNonNull(GraphQLString)},
                authId: { type:  new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let book = new Book({
                    name : args.name,
                    genre: args.genre,
                    authorId: args.authId
                })
                return book.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})