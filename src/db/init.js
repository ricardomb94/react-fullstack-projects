import mongoose from 'mongoose'

//Define and export a function that will initialize the database connection:
export function initDatabase() {
  //First, we define DATABASE_URL to point to our local MongoDB instance running via Docker and specify blog as the database name:
  const DATABASE_URL = process.env.DATABASE_URL

  mongoose.connection.on('open', () => {
    console.info('Successfully connected to database: ', DATABASE_URL)
  })
  const connection = mongoose.connect(DATABASE_URL)
  return connection
}
