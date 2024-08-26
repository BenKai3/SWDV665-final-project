import express from 'express'
import { MongoClient, ObjectId } from 'mongodb'
import cors from 'cors'
import morgan from 'morgan'
import { handleError, connect_to_database } from './utils.js'

const app = express()
const port = 8080

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/sweetspot"
const client = new MongoClient(uri)

// middleware
app.use(morgan('tiny'))
app.use(express.json({ limit: '10mb' }))
app.use(cors({
  origin: ['http://localhost:8100', 'https://0c02-2601-603-1001-47d0-4ca5-cb3e-11c9-5f72.ngrok-free.app'],
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

// get list of places
app.get('/places', async (req, res) => {
  try {
    const collection = await connect_to_database(client)
    const places = await collection.find({}).toArray()
    console.log("-- most recent place: ", places[places.length - 1].name)
    res.status(200).send(places)
  } catch (err) {
    handleError(res, err)
  } finally {
    await client.close()
  }
})

// delete place associated with the received param placeId
app.delete('/places/:placeId', async (req, res) => {
  console.log("-- req.params.placeId: ", req.params.placeId)
  // convert string to ObjectId for MongoDB
  const placeIdObject = new ObjectId(req.params.placeId)
  try {
    const collection = await connect_to_database(client)
    const result = await collection.deleteOne({ _id: placeIdObject })
    console.log("-- DELETED place successfully")
    res.status(200).send(result)
  } catch (err) {
    handleError(res, err)
  } finally {
    await client.close()
  }
})

// add a new place to the database, using req.body
app.post('/places', async (req, res) => {
  console.log("-- req.body: ", req.body)
  try {
    const collection = await connect_to_database(client)
    const result = await collection.insertOne(req.body)
    console.log("-- SUBMITTED place successfully")
    res.status(200).send(result)
  } catch (err) {
    handleError(res, err)
  } finally {
    await client.close()
  }
})

app.listen(port, () => {
  console.log("")
  console.log(`-- Server is running on http://localhost:${port}`)
})