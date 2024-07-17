import mongoose, { Schema } from 'mongoose'

//Define a new schema for posts
const postSchema = new Schema({
  //Now specify all properties of a blog post and the corresponding types. We have a required title, an author, and contents, which are all strings
  title: { type: String, required: true },
  author: String,
  contents: String,
  tags: [String],
})

export const Post = mongoose.model('post', postSchema)
