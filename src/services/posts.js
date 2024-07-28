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

//define a getPostById function
export async function getPostById(postId) {
  return await Post.findById(postId)
}
//It may seem a bit trivial to define a service function that just calls Post.findById, but it is good practice to define it anyway. Later, we may want to add some additional restrictions, such as access control. Having the service function allows us to change it only in one place and we do not have to worry about forgetting to add it somewhere. Another benefit is that if we, for example, want to change the database provider later, the developer only needs to worry about getting the service functions working again, and they can be verified with the test cases.

//define the updatePost function. It will take an ID of an existing post, and an object of parameters to be updated. We are going to use the findOneAndUpdate function from Mongoose, together with the $set operator, to change the specified parameters. As a third argument, we provide an options object with new: true so that the function returns the modified object instead of the original:
export async function updatePost(postId, { title, author, contents, tags }) {
  return await Post.findOneAndUpdate(
    { _id: postId },
    { $set: { title: title, author: author, contents: contents, tags: tags } },
    { new: true },
  )
}
export async function deletePost(postId) {
  return await Post.deleteOne({ _id: postId })
}
