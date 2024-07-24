import mongoose from 'mongoose'
import { describe, expect, test, beforeEach } from '@jest/globals'
import {
  createPost,
  listAllPosts,
  listAllPostsByAuthor,
  listPostsByTag,
} from '../services/posts.js'
import { Post } from '../db/models/post.js'

//use the describe() function to define a new test. This function describes a group of tests. We can call our group creating posts:
describe('creating post', () => {
  //Inside the group, we will define a test by using the test() function. We can pass an async function here to be able to use async/await syntax. We call the first test creating posts with all parameters should succeed:
  test('with all parameters should succeed', async () => {
    const post = {
      title: 'Hello mongoose',
      author: 'Daniel Bugl',
      contents: 'This post is stored in a MongoDB database using Mongoose.',
      tags: ['mongoose', 'mongodb'],
    }
    const createdPost = await createPost(post)

    //Then, verify that it returns a post with an ID by using the expect() function from Jest and the toBeInstanceOf matcher to verify that it is an ObjectId:
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)

    //Now use Mongoose directly to find the post with the given ID:
    const foundPost = await Post.findById(createdPost._id)
    expect(foundPost).toEqual(expect.objectContaining(post))
    expect(foundPost.createdAt).toBeInstanceOf(Date)
    expect(foundPost.updatedAt).toBeInstanceOf(Date)
  })

  //Additionally, define a second test, called creating posts without title should fail. As we defined the title to be required, it should not be possible to create a post without one:
  test('without title should fail ', async () => {
    const post = {
      author: 'Daniel Bugl',
      contents: 'Post with no title',
      tags: ['empty'],
    }
    //Use a try/catch construct to catch the error and expect() the error to be a Mongoose ValidationError, which tells us that the title is required:
    try {
      await createPost(post)
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.message).toContain('`title` is required')
    }
  })
  //Finally, make a test called creating posts with minimal parameters should succeed and only enter the title:

  test('with minimal parameters should succeed', async () => {
    const post = {
      title: 'Only a title',
    }
    const createdPost = await createPost(post)
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
})

//an array of sample post:
const samplePosts = [
  { title: 'Learning Redux', author: 'Daniel Bugl', tags: ['redux'] },
  { title: 'Learn React Hooks', author: 'Daniel Bugl', tags: ['react'] },
  {
    title: 'Full-Stack React Projects',
    author: 'Daniel Bugl',
    tags: ['react', 'nodejs'],
  },
  { title: 'Guide to TypeScript' },
]

//Now, define an empty array, which will be populated with the created posts.
let createdSamplePosts = []

//Then, define a beforeEach function, which first clears all posts from the database and clears the array of created sample posts and then creates the sample posts in the database again for each of the posts defined in the array earlier. This ensures that we have a consistent state of the database before each test case runs and that we have an array to compare against when testing the list post functions:
beforeEach(async () => {
  await Post.deleteMany({})
  createdSamplePosts = []
  for (const post of samplePosts) {
    const createdPost = new Post(post)
    createdSamplePosts.push(await createdPost.save())
  }
})

//To ensure that our unit tests are modular and independent from each other, we insert posts into the database directly by using Mongoose functions (instead of the createPost function).

// Now that we have some sample posts ready, let’s write our first test case, which should simply list all posts. We will define a new test group for listing posts and a test to verify that all sample posts are listed by () function:
describe('listing posts', () => {
  test('should return all posts', async () => {
    const posts = await listAllPosts()
    expect(posts.length).toEqual(createdSamplePosts.length)
  })

  //Next, make a test that verifies that the default sort order shows newest posts first. We sort the createdSamplePosts array manually by createdAt (descending) and then compare the sorted dates to those returned from () function:
  test('should return posts sorted by creation date descending by default', async () => {
    const posts = await listAllPosts()
    const sortedSamplePosts = createdSamplePosts.sort(
      (a, b) => b.createdAt - a.createdAt,
    )
    expect(posts.map((post) => post.createdAt)).toEqual(
      sortedSamplePosts.map((post) => post.createdAt),
    )
  })

  //Note

  //The .map() function applies a function to each element of an array and returns the result. In our case, we select the createdAt property from all elements of the array. We cannot directly compare the arrays with each other because Mongoose returns documents with a lot of additional information in hidden metadata, which Jest will attempt to compare.

  //Additionally, define a test case where the sortBy value is changed to updatedAt, and the sortOrder value is changed to ascending (showing oldest updated posts first):
  test('should take into account provided sorting options', async () => {
    const posts = await listAllPosts({
      sortBy: 'updatedAt',
      sortOrder: 'ascending',
    })
    const sortedSamplePosts = createdSamplePosts.sort(
      (a, b) => a.updatedAt - b.updatedAt,
    )
    expect(posts.map((post) => post.updatedAt)).toEqual(
      sortedSamplePosts.map((post) => post.updatedAt),
    )
  })

  //Then, add a test to ensure that listing posts by author works:
  test('should able to filter posts by author', async () => {
    const posts = await listAllPostsByAuthor('Daniel Bugl')
    expect(posts.length).toBe(3)
  })

  //Note: We are controlling the test environment by creating a specific set of sample posts before each test case runs. We can make use of this controlled environment to simplify our tests. As we already know that there are only three posts with that author, we can simply check if the function returned exactly three posts. Doing so keeps our tests simple, and they are still safe because we control the environment completely.

  //Finally, add a test to verify that listing posts by tag works
  test('should be able to filter posts by tag', async () => {
    const posts = await listPostsByTag('nodejs')
    expect(posts.length).toBe(1)
  })
})

//Run the tests and watch them all pass:
