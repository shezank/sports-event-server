const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.iyzg5.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const database = client.db("sportsVolenter");
        const eventCollection = database.collection("event");
        const volentersCollection = database.collection("volenter");

        app.get('/events', async (req, res) => {
            const quary = {};
            const events = await eventCollection.find(quary);
            const reslut = await events.toArray();
            res.send(reslut);
        });

        app.post('/events', async (req,res)=>{
            const events = req.body;
            const result = await eventCollection.insertOne(events);
            res.json(result);
        });

        app.post('/volenters', async (req,res)=>{
            const volentersDetails = req.body;
            const result = await volentersCollection.insertOne(volentersDetails);
            res.send(result);
        });
        app.get('/volenters', async (req,res)=>{
            const quary = {};
            const data = await volentersCollection.find(quary);
            const result = await data.toArray();
            res.send(result);
        });

        app.get('/volenters/:id', async(req,res)=>{
            const id = req.params.id;
            const quary = {_id: ObjectId(id)};
            const result = await volentersCollection.find(quary);
            const search = await result.toArray();
            res.send(search);
        });

        app.delete('/volenters/:id', async(req,res)=>{
            const id = req.params.id;
            const quary = {_id: ObjectId(id)};
            const result = await volentersCollection.deleteOne(quary);
            res.send(result)
        });

    } finally {
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Welcome TO Sport Volenter Network')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})