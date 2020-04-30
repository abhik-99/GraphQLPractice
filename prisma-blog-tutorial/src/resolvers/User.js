const _ = require('lodash')
exports.User = {
    posts(parent, args, { db }){
        return _.filter(db.Posts, {authorId: parent.id})
    },
    comments(parent, args, { db }){
        return _.filter(db.Comments, {id: parent.id})
    }
}