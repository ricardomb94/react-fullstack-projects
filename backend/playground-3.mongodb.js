/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('ch2')

// Search for documents in the current collection.
db.getCollection('users')
  .find(
    {
      age: { $gte: 26 },
    },
    {
      _id: 0,
      username: 1,
      age: 1,
    },
  )
  .sort({
    age: -1,
  })
