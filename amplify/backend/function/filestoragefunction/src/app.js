/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var authInternprojectdb3ae7e4UserPoolId = process.env.AUTH_INTERNPROJECTDB3AE7E4_USERPOOLID
var storageInternprojstorageBucketName = process.env.STORAGE_INTERNPROJSTORAGE_BUCKETNAME

Amplify Params - DO NOT EDIT */

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser({limit: '5mb'}));
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

const AWS = require('aws-sdk');
AWS.config.update({region: process.env.REGION});
const s3 = new AWS.S3();

/**********************
 * Example get method *
 **********************/

app.get('/files', function(req, res) {
    const params = { Bucket : process.env.STORAGE_INTERNPROJSTORAGE_BUCKETNAME };
    s3.listObjects(params, (err, data) => { if (err) { throw err } else { res.json({ body: data }); } });
});

app.get('/files/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/files', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/files/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/files', function(req, res) {
    const base64 = req.body.file;
    const buffer = Buffer.from(base64, 'base64');
    const params = {
        Bucket: process.env.STORAGE_INTERNPROJSTORAGE_BUCKETNAME,
        Key: req.body.filename,
        Body: buffer
    };
    s3.upload(params, (err, data) => { if (err) { throw err } else { res.json({ body: data }); } }); });
});

app.put('/files/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/files', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/files/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app