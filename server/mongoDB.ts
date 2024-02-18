import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;

console.log(MONGODB_URI)

// if (!MONGODB_URI) throw new Error("Add Mongo URI to .env.local");

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

console.log("inside mongoDB")
export default async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => mongoose)

  }


  cached.conn = await cached.promise

  return cached.conn


}