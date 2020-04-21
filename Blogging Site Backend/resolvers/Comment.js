const _ = require('lodash')
exports.Comment = {
    author(parent, args, { db }){
        return _.find(db.Users, {id: parent.authorId})
    },
    post(parent, args, { db }){
        return _.find(db.Posts, {id: parent.id})
    }
}