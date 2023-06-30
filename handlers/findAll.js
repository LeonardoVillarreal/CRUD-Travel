const mongoose = require('mongoose')
const connectDatabase = require('../database/db')
const Fare = require('../models/fare')

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try{
        await connectDatabase();
        
        fareObj = await Fare.find();
        return{
            statusCode: 200,
            body: JSON.stringify(fareObj)
        }
    }catch(error){
        console.error(error);
        return {
            statusCode: error.statusCode || 500,
            body: JSON.stringify({error: error.message})
        }
    }
};