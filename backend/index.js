import app from "./server.js"
import mongodb from "mongodb"
//allows you to access .env file
import dotenv from "dotenv"
import BooksDAO from "./dao/booksDAO.js"
//loads in env vars
dotenv.config()
//gets access to mongo client
const MongoClient = mongodb.MongoClient

//accessing env vars
const port = process.env.PORT || 5000


MongoClient.connect(
  process.env.MONGODB_URI,
  )
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
    await BooksDAO.injectDB(client)
    app.listen(port, () => { //listen on the port
      console.log(`listening on port ${port}`)
    })
  })