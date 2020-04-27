const _ = require('lodash')
exports.Query = {
    hello(){
        return "Test Success!"
    },
    users(){
        return db.Users
    },
    user(parent, args, { db }){
        return _.find(db.Users, {id: args.id})
    },
    posts(){
        return db.Posts
    },
    post(parent, args, { db }){
        return _.find(db.Posts, {id: args.id})
    },
    comments(){
        return db.Comments
    }
};