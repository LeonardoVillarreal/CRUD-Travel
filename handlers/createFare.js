const mongoose = require('mongoose')
const connectDatabase = require('../database/db')
const Fare = require('../models/fare')

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try{
        await connectDatabase();
        const {origin, destination, price, currency, currencySymbol} = JSON.parse(event.body)
        let fareObj = {
            origin,
            destination,
            price,
            currency,
            currencySymbol,
            currencyToDisplay: currency + ' ' + price.toString()
        }
        fareObj = await Fare.create(fareObj);
        return{
            statusCode: 201,
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