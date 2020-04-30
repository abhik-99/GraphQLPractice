const uuidv4 = require('uuid/v4')
exports.Mutation = {
    createUser(parent, args, { db }){
        const {email, name, age} = args.data;
        if(_.find(db.Users, { email: email})){
            throw 'User already Exists!'
        }
        var ob = {id: uuidv4(), email, name, age}
        db.Users.push(ob)
        return ob

    },
    createPost(parent, args, { db }){
        var {name, genre, authorId, published} = args.data;
        published = (published)? published: false;
        if(!_.find(db.Users, {id: authorId})) throw 'User not found!'
        var ob = {id:uuidv4(), name, genre, authorId, published}
        db.Posts.push(ob);
        return ob;
    },
    createComment(parent, args, { db }){
        const {text, authorId, postId} = args.data;
        if( !_.find(db.Users, {id: authorId}) || !_.find(Posts, {id: postId})) throw 'Author or Post not found!'
        var ob = {id: uuidv4, text, authorId, postId};
        db.Comments.push(ob);
        return ob
    },
    deleteUser(parent, args, { db }){
        const id = args.id;
        const index = db.Users.findIndex((user)=> user.id === id)
        if( index === -1) throw 'User not found!'
        
        db.Posts = db.Posts.filter(post => {
            if(post.authorId !== id) return true
            db.Comments = db.Comments.filter(comment => comment.postId === post.id)
            return false
        });
        db.Comments = db.Comments.filter( comment => comment.authorId !== id);
        return db.Users.splice(index, 1)[0]
    },
    deletePost(parent, args, { db }){
        if(db.Posts.findIndex(post=> post.id === args.id) === -1) throw 'Post not Found!'
        const delPost = db.Posts.findIndex(post=> post.id === args.id)
        db.Posts = db.Post.filter(post => {
           if(post.id !== args.id) return true
           db.Comments = db.Comments.filter(comment => comment.postId !== post.id)
           return false
        });
        return delPost
    },
    deleteComment(parent, args, { db }){
        if(db.Comments.findIndex((comment)=> comment.id === args.id) === -1) throw 'Comment not found!'
        return db.Comments.splice(db.Comments.findIndex((comment)=> comment.id === args.id),1)[0]
    }
}