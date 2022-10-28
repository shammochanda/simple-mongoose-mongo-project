import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import helmet from "helmet";

import books from "./api/books.route.js"

const app = express()

//Cross-origin resource sharing (CORS) allows AJAX requests to skip the Same-origin policy and access resources from remote hosts.
//express.json() means server accepts json in the body of a request

app.use(cors())
app.use(express.json())
app.use(cookieParser());
app.use(helmet());

//api route
app.use("/api/v1/books", books)
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))

export default app