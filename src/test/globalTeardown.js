export default async function globalTeardown() {
  //stop the MongoDB instance when our tests are finished
  await global.__MONGOINSTANCE.stop()
}
