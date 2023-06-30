const mongoose = require('mongoose')
const connectDatabase = require('../database/db')
const Fare = require('../models/fare')


module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    try{
        await connectDatabase();
        const {country} = JSON.parse(event.body);
        let option = country.toUpperCase();
        console.log(option);
        switch(option){
            case 'USA':
                
                newList = await Fare.find();
                newList.forEach(element => {
                    
                        element.currencyToDisplay =  element.currencySymbol + ' ' + element.price.toLocaleString('en-US')
                            
                });
                return{
                    statusCode: 200,
                    body: JSON.stringify(newList)
                }


            case 'ARG':

                newList = await Fare.find();
                newList.forEach(element => {
                    
                        element.currencyToDisplay =  element.currency + Math.round(element.price).toLocaleString('es-AR')
                              
                });
                return{
                    statusCode: 200,
                    body: JSON.stringify(newList)
                }

            case 'ESP':

                newList = await Fare.find();
                newList.forEach(element => {
                    //Locale String for Spain did not work as it did not set the , as the separator
                    //element.currencyToDisplay =  Math.round(element.price).toLocaleString('es-ES') + ' ' + element.currencySymbol
                    let newPrice = Math.round(element.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    element.currencyToDisplay = newPrice + ' ' + element.currencySymbol
                });
                return{
                    statusCode: 200,
                    body: JSON.stringify(newList)
                }

            case 'DEU':

                newList = await Fare.find();
                newList.forEach(element => {
                    
                            element.currencyToDisplay =  element.currencySymbol + ' ' + Math.round(element.price).toLocaleString('de-DE')
                        
                    });
                return{
                    statusCode: 200,
                    body: JSON.stringify(newList)
                }
            default:
                return {
                    statusCode: 201,
                    body: JSON.stringify({
                        error: "The option is not valid",
                    }),
                }
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