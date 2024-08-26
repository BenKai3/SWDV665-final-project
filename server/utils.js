// connect to the mongodb database and appropriate collection
export const connect_to_database = async client => {
    await client.connect()
    const database = client.db('sweetspot')
    const collection = database.collection('places')
    console.log("-- connected to database.")
    return collection
}

// gracefully handle errors
export const handleError = (res, err) => {
  console.log("-- Error: ", err)
  res.status(500).send(err)
}