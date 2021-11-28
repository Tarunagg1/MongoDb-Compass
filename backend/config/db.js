// const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_KEY)
// .then(() => {
//     console.log("connection establish successfully")
// }).catch((err) => {
//     console.log("connection error", err)
// })


const { MongoClient } = require('mongodb');


let main = async ()=>{
    const client = new MongoClient(process.env.MONGODB_KEY);
    await client.connect();
    const collection = client.db().collection('data');
    return collection;
}

module.exports = main;