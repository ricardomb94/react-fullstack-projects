import { writeFileSync, readFileSync } from 'node:fs'

const users = [{ name: 'Ricardo MBK', email: 'ricardo@webcom.ing' }]

const usersJson = JSON.stringify(users)
writeFileSync('users.json', usersJson)

// Read the file with UTF-8 encoding
const readUsersJsonUtf8 = readFileSync('users.json', 'utf8')

// Parse the JSON string into a JavaScript object
const readUsers = JSON.parse(readUsersJsonUtf8)

// Printing the results
console.log(readUsers)
