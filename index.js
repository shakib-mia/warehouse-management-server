const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken')

const express = require('express');
const app = express();

require('dotenv').config();

const port = process.env.PORT || 5000;

const cors = require('cors');
const { response } = require('express');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
      res.send("Hurray!!! server is running")
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gv79d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
      try {
            const collection = client.db('luxuriousCar').collection('allCars');
            const allComments = client.db('luxuriousCar').collection('comments');
            const userItems = client.db('luxuriousCar').collection('userItems');

            client.connect();
            app.get('/allCars', async (req, res) => {
                  const query = {};
                  const cursor = collection.find(query);
                  const cars = await cursor.toArray();
                  res.send(cars)
            })

            app.put('/allCars', async (req, res) => {
                  const newCar = req.body;
                  const result = await collection.insertOne(newCar);
                  res.send(result)
            })

            app.get("/comments", async (req, res) => {
                  const query = {};
                  const cursor = allComments.find(query);
                  const comments = await cursor.toArray();
                  res.send(comments)
            })

            app.post("/comments", async (req, res) => {
                  const newComment = req.body;
                  const result = await allComments.insertOne(newComment)
                  res.send(result)
            })

            app.get('/allCars/:productId', async (req, res) => {
                  const query = {};
                  const cursor = collection.find(query);
                  const cars = await cursor.toArray();
                  const specialCar = cars.find(car => car.productId == req.params.productId);
                  res.send(specialCar)
            })

            app.put("/allCars/:productId", async (req, res) => {
                  const id = req.params.productId;
                  const filter = { _id: ObjectId(id) };
                  const update = {
                        $set: {
                              quantity: req.body.quantity
                        }
                  }
                  const result = await collection.updateOne(filter, update);
                  console.log("message for updating", result)
                  res.send(result)
            })

            app.get('/userItems', async (req, res) => {
                  const query = {};
                  const cursor = userItems.find(query);
                  const items = await cursor.toArray();
                  res.send(items)
            })

            app.post("/userItems", async (req, res) => {
                  const newItem = req.body;
                  const result = await userItems.insertOne(newItem)
                  res.send(result)
            })

            app.get('/userItems/:productId', async (req, res) => {
                  const query = {};
                  const cursor = collection.find(query);
                  const cars = await cursor.toArray();
                  const specialCar = cars.find(car => car.productId == req.params.productId);
                  res.send(specialCar)
            })

            app.delete('/userItems/:productId', async (req, res) => {
                  const id = req.params.productId;
                  const filter = { productId: ObjectId(id) }
                  const result = await userItems.deleteOne(filter);
                  res.send(result);
            })

            app.delete('/allCars/:productId', async (req, res) => {
                  const id = req.params.productId;
                  const filter = { productId: ObjectId(id) }
                  const result = await collection.deleteOne(filter);
                  res.send(result);
            })
      }
      finally { }
}

run().catch(console.dir)

app.listen(port, () => console.log("listening to port", port))