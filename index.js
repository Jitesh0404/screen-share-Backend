const {config} = require("dotenv");
config({
    path : ".env"
})
const express = require("express");
const app = express();
const userRoute = require("./routes/UserRoute");
const connectToDb = require("./mongodb/MongoDb");
const errorHandle = require("./middleware/ErrorHandler");

// Mongo Db connection
connectToDb();

app.use(express.json())

app.use("/user",userRoute)

app.use(errorHandle)


app.listen(process.env.PORT,()=>{
    console.log("Server running on port ",process.env.PORT)
})
