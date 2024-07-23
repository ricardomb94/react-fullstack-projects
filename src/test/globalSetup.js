import { MongoMemoryServer } from 'mongodb-memory-server'

//Now let's define a globalSetup function, which creates a memory server for MongoDB
export default async function globalSetup() {
  const instance = await MongoMemoryServer.create({
    //When creating the MongoMemoryServer, set the binary version to 6.0.4, which is the same version that we installed for our Docker container:
    binary: {
      version: '6.0.4',
    },
  })
  //We will store the MongoDB instance as a global variable to be able to access it later in the globalTeardown function
  global.__MONGOINSTANCE = instance
  process.env.DATABASE_URL = instance.getUri()
}
