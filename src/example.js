import { initDatabase } from './db/init.js'
import { Post } from './db/models/post.js'

await initDatabase()

//Create a new blog post by calling new Post(), defining some example data
const post = new Post({
  title: 'Hello Mongoose!',
  author: 'Daniel Bugl',
  contents: 'This post is stored in a MongoDB database using Mongoose.',
  tags: ['mongoose', 'mongodb'],
})

//To see if the updatedAt timestamp works, let’s try updating the created blog post by using the findByIdAndUpdate method. Save the result of await post.save() in a createdPost constant, then add the following code close to the end of the src/example.js file, before the Post.find() call
const createdPost = await post.save()
await Post.findByIdAndUpdate(createdPost._id, {
  $set: { title: 'Hello again Mongoose!' },
})
//Call .save() on the blog post to save it to the database:
// await post.save()

//Now we can use the .find() function to list all posts, and log the result:
const posts = await Post.find()
console.log(posts)
