const mongoose = require('mongoose')
const connectDatabase = require('../database/db')
const Fare = require('../models/fare')


module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try{
        await connectDatabase();
        const ObjectId = require('mongodb').ObjectId
        const {id} = event.pathParameters;
        const searchId = new ObjectId(id);
        const {origin, destination, price, currency, currencySymbol} = JSON.parse(event.body)
        const {currencyToDisplay} = currency + ' ' + String.toString(price)
        let fareObj = {
            origin,
            destination,
            price,
            currency,
            currencySymbol,
            currencyToDisplay
        }
        fareObj = await Fare.updateOne(
            {_id: searchId},
            {$set:{origin: origin, destination:destination, price:price, currency: currency, currencySymbol: currencySymbol, currencyToDisplay: currencyToDisplay}});
        fareObj = await Fare.find({_id: searchId });
        return{
            statusCode: 200,
            body: JSON.stringify(fareObj)
        }
    }catch(error){
        console.error(error);
        return {
            statusCode: 404,
            body: JSON.stringify({
                error: "Requested fare is not found in the database",
            }),
        }
    }
};