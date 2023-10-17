const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { BookRouter } = require("./Routers/BookRouters");

const app = express();
app.use(cors())
app.use(express.json());
app.use("/books", BookRouter)

app.get("/", (req, res)=>{
    res.send("This is Homepage")
})

app.listen(4000, async()=>{
    try {
        await connection;
        console.log('Connected to DB')
        console.log("Server is running on port 4000")
    } catch (error) {
        console.log(error)
    }
})

