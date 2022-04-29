const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');

require('dotenv').config();
const app = express();

const port = process.env.PORT || 7000;

const cors = require('cors');
const res = require('express/lib/response');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
      res.send("Hurray!!! server is running")
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gv79d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect();
const collection = client.db('luxuriousCar').collection('cars');

app.get('/cars', async (req, res) => {
      const query = {};
      const cursor = collection.find(query)
      const cars = await cursor.toArray();

      res.send(cars)
})

app.listen(port, () => console.log("listening to port", port))