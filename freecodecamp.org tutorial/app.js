const express = require('express');
const app = express();
const graphHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const {COL_NAME} = require('./config/config')
const PORT = process.env.PORT || 3000;

mongoose.connect(`mongodb://localhost:27017/${COL_NAME}`,{ 
    useUnifiedTopology: true ,
    useNewUrlParser: true
},(err)=>{
    if(err) console.log("Error Occured!", err)
    else console.log("Connected Succesfully to MongoDB!")
})

app.use('/graphql', graphHTTP({
    graphiql: true,
    schema
}))

app.get('/', (req,res)=> res.send("ALL OK! API Working."))
app.listen(PORT, ()=> console.log("Listening on PORT-", PORT))