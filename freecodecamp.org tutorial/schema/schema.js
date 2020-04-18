const graphql = require('graphql')

const {
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLList
} = graphql;
const _ = require('lodash');

const Books = [{id: '1', name: 'Harry Potter 1', genre: 'fiction', authId: '1'},
{id: '2', name: 'Turning Point', genre: 'non-fiction', authId: "2"},
{id: '3', name: 'War & Peace', genre: 'fiction', authId: '3'},
{id: '4', name: 'Anna karenina', genre: 'fiction', authId: '3'},
{id: '5', name: 'Harry Potter 2', genre: 'fiction', authId: '1'}
]

const Authors = [
    {id: "1", name:"JK Rowled", sex: "F"},
    {id: "2", name:"Legend of India", sex: "M"},
    {id: "3", name:"Leo Tolstoy", sex: "M"}
]

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
                return _.find(Authors, { id: parent.authId})
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
                console.log(_.find(Books, { authId: parent.id}), parent.id)
                return _.filter(Books, { authId: parent.id})
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
                 return _.find(Books, {id: args.id})
            }
        },
        author:{
            type: AuthorType,
            args: { id: { type: GraphQLID}},
            resolve(parent, args, ){
                return _.find(Authors, { id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})