const { GraphQLServer} = require('graphql-yoga')
const { Prisma} = require('prisma-binding')

const PORT = process.env.PORT || 3000;
const resolvers = {
    Query: {
      posts: (_, args, {prisma}, info) => {
        return prisma.query.posts(
          {
            where: {
              OR: [
                { title_contains: args.searchString },
                { content_contains: args.searchString },
              ],
            },
          },
          info,
        )
      },
      user: (_, args, {prisma}, info) => {
        return prisma.query.user(
          {
            where: {
              id: args.id,
            },
          },
          info,
        )
      },
    },
    Mutation: {
      createPost: (_, args, {prisma}, info) => {
        return prisma.mutation.createPost(
          {
            data: {
              title: args.title,
              content: args.content,
              author: {
                connect: {
                  id: args.authorId,
                },
              },
            },
          },
          info,
        )
      },
      publish: (_, args, {prisma}, info) => {
        return prisma.mutation.updatePost(
          {
            where: {
              id: args.id,
            },
            data: {
              published: true,
            },
          },
          info,
        )
      },
      deletePost: (_, args, {prisma}, info) => {
        return prisma.mutation.deletePost(
          {
            where: {
              id: args.id,
            },
          },
          info,
        )
      },
      signup: (_, args, {prisma}, info) => {
        return prisma.mutation.createUser(
          {
            data: {
              name: args.name,
            },
          },
          info,
        )
      },
    },
  }
  const server = new GraphQLServer({
      typeDefs: 'src/schema.graphql',
      resolvers,
      context: {
          prisma: new Prisma({
              typeDefs: 'src/generated/prisma.graphql',
              endpoint: 'http://localhost:4466'
          })
      }
  })

server.start({port: PORT},()=> console.log('Server Up and running!'))