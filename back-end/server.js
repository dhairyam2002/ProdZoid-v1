const app = require("./app");

const connectDatabase = require("./config/database");


// const cors = require('cors');
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
//     res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();

// }) 
process.on("uncaughtException", (err) => {
    console.log(err.message);
    process.exit(1)
})

if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({ path: "back-end/config/config.env" });
}


connectDatabase();
// console.log(sdnfksdnfks)

app.get("/", (req, res, next) => {

    res.send("<h1>hello<h1>")
})
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})

process.on("unhandledRejection", (err) => {
    server.close(() => {
        process.exit(1);
    })
})