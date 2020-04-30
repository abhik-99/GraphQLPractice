const _ = require('lodash')
exports.Post = {
    author(parent, args, { db }){
        return _.find(db.Users, { id: parent.authorId})
    },
    comments(parent, args, { db }){
        return _.filter(db.Comments, {postId: parent.id})
    }
}