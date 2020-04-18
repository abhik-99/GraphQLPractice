const express = require('express');
const app = express();
const graphHTTP = require('express-graphql');
const schema = require('./schema/schema')


const PORT = process.env.PORT || 3000;

app.use('/graphql', graphHTTP({
    graphiql: true,
    schema
}))

app.get('/', (req,res)=> res.send("ALL OK! API Working."))
app.listen(PORT, ()=> console.log("Listening on PORT-", PORT))