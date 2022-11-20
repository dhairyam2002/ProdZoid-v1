const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const path = require('path');
app.use(express.json());
app.use(cookieParser());



if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({ path: "back-end/config/config.env" });
}

//Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");


app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/", order);

app.use(express.static(path.join(__dirname, '../front-end/build')));

// app.get("*", function (req, res, next){
//     res.sendFile(path.resolve(__dirname, '../front-end/build/index.html'));
// })

module.exports = app;