var Users =[
    {id:1, name: "AB", email: 'xyz@scx.com', age:23},
    {id:2, name: "BC", email: 'xyz@scx.com', age:30},
    {id:3, name: "BDC", email: 'xyz@scx.com', age:32}
]

var Posts = [
    {id: 1, name: "Post 1", genre: 'fiction', authorId: 1, published: true},
    {id: 2, name: "Post 1", genre: 'non-fiction', authorId: 1, published: false},
    {id: 3, name: "Post 2", genre: 'non-fiction', authorId: 2, published: false},
    {id: 4, name: "Post 3", genre: 'fiction', authorId: 2, published: true},
]

var Comments = [
    {id: 1, text: 'This post could have been made better', authorId: 1, postId: 1},
    {id: 2, text: 'This post could not have been made better', authorId: 2, postId: 1},
    {id: 3, text: 'This post should have been made better', authorId: 1, postId: 2},
    {id: 4, text: 'This post must be made better', authorId: 3, postId: 3},
]

exports.db ={
    Users, 
    Posts,
    Comments
}