const mongoose = require('mongoose');
require('dotenv').config();

const DBconnect = async()=>{
    mongoose.set('strictQuery', false);
    const connect = await mongoose.connect(process.env.DB_CONNECT)
    console.log(`DB connected sucessful ${connect.connection.host}`);
}

module.exports = DBconnect ;