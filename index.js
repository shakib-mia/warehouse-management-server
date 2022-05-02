const { MongoClient, ServerApiVersion } = require('mongodb');

const express = require('express');
const app = express();

require('dotenv').config();

const port = process.env.PORT || 7000;

const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
      res.send("Hurray!!! server is running")
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gv79d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect();
const collection = client.db('luxuriousCar').collection('allCars');
const allComments = client.db('luxuriousCar').collection('comments');

app.get('/cars', async (req, res) => {
      const query = {};
      const cursor = collection.find(query);
      const cars = await cursor.toArray();
      res.send(cars)
})

app.get('/cars/:_id', async (req, res) => {
      const query = {};
      const cursor = collection.find(query);
      const cars = await cursor.toArray();
      const specialCar = cars.find(car => car._id == req.params._id);
      res.send(specialCar)
})

app.get("/comments", async (req, res) => {
      const query = {};
      const cursor = allComments.find(query);
      const comments = await cursor.toArray();
      res.send(comments)
})

app.listen(port, () => console.log("listening to port", port))