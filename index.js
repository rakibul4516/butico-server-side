const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const app = express();
require('dotenv').config()
const cors = require('cors');
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

// rakibulislam4516
// 0adHVAEKWH12N599


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ufdhagf.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        //Create database
        const productDatabase = client.db("productDB").collection("products");
        const brandsDatabase = client.db("productDB").collection("brands");
        const cartsDatabase = client.db("productDB").collection("carts");

        //CRUD Operations 

        // Post method
        app.post('/products', async (req, res) => {
            const product = req.body;
            const result = await productDatabase.insertOne(product);
            res.send(result)
        })
        app.post('/carts', async (req, res) => {
            const cart = req.body;
            const result = await cartsDatabase.insertOne(cart);
            res.send(result)
        })

        //get method
        app.get('/products', async (req, res) => {
            const cursor = productDatabase.find();
            const result = await cursor.toArray();
            res.send(result)

        })
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await productDatabase.findOne(query);;
            res.send(result)
        })
        app.get('/brands', async (req, res) => {
            const cursor = brandsDatabase.find();
            const result = await cursor.toArray();
            res.send(result)
        })
        app.get('/brands/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await brandsDatabase.findOne(query);;
            res.send(result)
        })



        //Delete method


        //Put method



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);






app.get('/', (req, res) => {
    res.send('Butico Server is running')
})

app.listen(port, () => {
    console.log(`Butico server is running into port no: ${port}`)
})