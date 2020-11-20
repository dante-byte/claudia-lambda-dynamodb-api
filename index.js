const ApiBuilder = require('claudia-api-builder');
const AWS = require('aws-sdk');
const uuid = require('uuidv4');


var api = new ApiBuilder();

var dynamoDB = new AWS.DynamoDB.DocumentClient({apiVersion: '2019.11.21'});





api.post('/parts', function (request) {

    var params = {

        TableName: "parts-demo",
        Item: {
            id: uuid,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            year: request.body.year,
            make: request.body.make,
            model: request.body.model,
            bodytrim: request.body.bodytrim,
            category: request.body.category,
            partname: request.body.partname


        }
    }
    console.log(params);

    return dynamoDB.put(params).promise();

}, {success: 201});

api.get('/parts', function (request) {

    return dynamoDB.scan({TableName: 'inventory-demo'}).promise()
        .then((response) => response.Items)

})


module.exports = api;