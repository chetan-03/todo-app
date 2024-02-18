"use server"
import connectToDatabase from "../mongoDB"
import User from "../model/user"
export default async function createUser(values) {
  connectToDatabase()
  let newUser = new User(values)
  newUser.save().then(data => {
    console.log(data, "successfully saved!!");
  }).catch(e => {
    console.log(e,"error while saving new user")
  })
    console.log({ values }, "from creatUser server function")
}


