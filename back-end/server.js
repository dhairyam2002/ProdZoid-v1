const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");


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
    console.log(`Server is working on https://localhost:${process.env.PORT}`);
})

process.on("unhandledRejection", (err)=>{
    server.close(()=>{
        process.exit(1);
    })
})