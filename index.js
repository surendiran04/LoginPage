const express = require("express");
const body_parser = require("body-parser");
const cors = require("cors");
const {initiateDBConnection } = require('./Database/DBconfig')
const dotenv = require('dotenv');
let PORT= process.env.PORT;

const app=express();
dotenv.config();
app.use(cors());
app.use(body_parser.json());
app.use("/api/auth", require('./Router/routes'));    // app.use(AuthRouter)

initiateDBConnection();

app.listen(PORT,()=>{
    console.log(`Server connected successfully at ${PORT}`);
})