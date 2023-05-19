const mongoose = require('mongoose');

mongoose.set('strictQuery',false);

const connectDB = async()=>{
    try{
 const conn = await mongoose.connect(process.env.MONGODB_URI);
 console.log(`mongoDB is Connected:${conn.connection.host}`)}catch(error){
    console.log('Error:'+error)
 }
}
module.exports = connectDB;
