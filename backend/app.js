const express = require("express")
const cors = require("cors")
const cookieParser=require('cookie-parser')
const { createServer } = require("http")
const socketSetup = require("./socket"); // Import the socket setup
require("dotenv").config()


const connectDb=require("./db/connectDb.js")
const authRoutes=require("./routes/authRoutes")
const adminRoutes=require("./routes/adminRoutes");
const userRoutes=require("./routes/userRoutes")
const app = express()


const server = createServer(app)

const frontend_url = process.env.MODE === "DEVELOPMENT" ? "http://localhost:5173" : process.env.FRONTEND_URL

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:  [frontend_url],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}))



app.use("/api/auth",authRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/user",userRoutes)

const port = process.env.PORT 

server.listen(port, () => {
    connectDb()
    console.log(`Server run on port http://localhost:${port}`)
    console.log(frontend_url)
})

socketSetup(server)