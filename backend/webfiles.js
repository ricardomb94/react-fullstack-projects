import { readFileSync } from 'node:fs'
import { createServer } from 'node:http'

//------The createServer function is asynchronous, so it requires us to pass a callback function to it. This function will be executed when a request comes in from the server. It has two arguments, a request object (req) and a response object (res).-----//

//Use the createServer function to define a new server
const server = createServer((req, res) => {
  //For now, we will ignore the request object and only return a static response. First, we set the status code to 200:
  res.statusCode = 200

  //Then, we set the Content-Type header to text/plain, such that the browser knows what kind of response data it is dealing with:
  res.setHeader('Content-Type', 'application/json')

  res.end(readFileSync('users.json'))
})

const host = 'localhost'
const port = 5000

//The server.listen function is also asynchronous and requires us to pass a callback function, which will execute as soon as the server is up and running. We can simply log something here for now:
server.listen(port, host, () => {
  console.log(`Server is listening on http://${host}:${port}`)
})
