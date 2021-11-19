const mongoose = require("mongoose");

const config = require("./configEnvirroment")

exports.mongoConnect = () =>{
    const mongoStringConnectiont =`mongodb+srv://${config.USER_MONGO}:${config.PASS_MONGO}@cluster0.ainyd.mongodb.net/${config.BD}?retryWrites=true&w=majority`;
    mongoose.connect(mongoStringConnectiont);
    mongoose.Promise =global.Promise;
    const dbConnection =mongoose.connection;
    dbConnection.on("error", console.error.bind(console, "error en la conexion de mongodb"))
    
}