import { createServer } from 'node:http'
import { MongoClient } from 'mongodb'

//Define the connection URL and database name and then create a new MongoDB client:
const url = 'mongodb://localhost:27017/'
const dbName = 'ch2'
const client = new MongoClient(url)

//Connect to the database and log a message after we are connected successfully, or when there is an error with the connection:
try {
  await client.connect()
  console.log('Successfully connect to the database!')
} catch (err) {
  console.error('Error connecting to database: ', err)
}

//Next, create an HTTP server
const server = createServer(async (req, res) => {
  //Then, select the database from the client, and the users collection from the database:
  const db = client.db(dbName)
  const users = db.collection('users')

  //Now, execute the find() method on the users collection. In the MongoDB Node.js driver, we also need to call the toArray() method to resolve the iterator to an array:
  const usersList = await users.find().toArray()

  //Finally, set the status code and response header , and return the users list:
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(usersList))
})
//Now that we have defined our server, copy over the code from before to listen to localhost on port 3000:
const host = 'localhost'
const port = 3000
server.listen(port, host, () => {
  console.log(`Server listen on port http://${host}:${port}`)
})
