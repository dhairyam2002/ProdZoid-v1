const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");


const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:4000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();

});
process.on("uncaughtException", (err) => {
    console.log(err.message);
    process.exit(1)
})
dotenv.config({ path: "back-end/config/config.env" });

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