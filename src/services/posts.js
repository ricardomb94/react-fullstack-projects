import { Post } from '../db/models/post.js'

//Define a new createPost function, which takes an object with title, author, contents, and tags as arguments and creates and returns a new post:
export async function createPost({ title, author, contents, tags }) {
  const post = new Post({ title, author, contents, tags })
  return await post.save()
}

//After defining a function to create posts, we are now going to define an internal listPosts function, which allows us to query posts and define a sort order. Then, we are going to use this function to define listAllPosts, listPostsByAuthor, and listPostsByTag functions:
export async function listPosts(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  return await Post.find(query).sort({ [sortBy]: sortOrder })
}

//Now we can define a function to list all posts, which simply passes an empty object as query:
export async function listAllPosts(options) {
  return await listPosts({}, options)
}

//Similarly, we can create a function to list all posts by a certain author by passing author to the query object:
export async function listAllPostsByAuthor(author, options) {
  return await listPosts({ author }, options)
}

export async function listPostsByTag(tags, options) {
  return await listPosts({ tags }, options)
}
