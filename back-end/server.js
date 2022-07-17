const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");


const cors = require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

process.on("uncaughtException", (err)=>{
    console.log(err.message);
    process.exit(1)
})
dotenv.config({path: "back-end/config/config.env"});

connectDatabase();
// console.log(sdnfksdnfks)

app.get("/", (req, res, next)=>{
    res.send("<h1>hello<h1>")
})
const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})

process.on("unhandledRejection", (err)=>{
    server.close(()=>{
        process.exit(1);
    })
})