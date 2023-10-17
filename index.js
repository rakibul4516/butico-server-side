const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();
require('dotenv').config()
const cors = require('cors');
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());








app.get('/',(req,res)=>{
    res.send('Butico Server is running')
})

app.listen(port,()=>{
    console.log(`Butico server is running into port no: ${port}`)
})