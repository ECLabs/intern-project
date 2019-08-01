/*
  Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
  Licensed under the Apache License, Version 2.0 (the "License").
  You may not use this file except in compliance with the License.
  A copy of the License is located at http://aws.amazon.com/apache2.0/
    or in the "license" file accompanying this file.
  This file is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
    limitations under the License.
*/

/*
  Amplify Params - DO NOT EDIT
  You can access the following resource attributes as environment variables
    from your Lambda function.
  var environment = process.env.ENV
  var region = process.env.REGION
  var storageInternprojstorageBucketName =
    process.env.STORAGE_INTERNPROJSTORAGE_BUCKETNAME
  Amplify Params - DO NOT EDIT
*/

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware =
  require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  var headers = "Origin, X-Requested-With, Content-Type, Accept"
  res.header("Access-Control-Allow-Headers", headers)
  next()
});

const domain = 'search-internproject-kodwdicd7hu3ibx2v46kerni2m.us-east-1';
const host = 'https://' + domain + '.es.amazonaws.com';
const es = require('elasticsearch').Client({
  hosts: [ host ],
  connectionClass: require('http-aws-es')
});

/**********************
 * Example get method *
 **********************/

app.get('/es', function(req, res) {
  es.search({
    index: 'files',
    q: req.query['q']
  }, (err, data) => {
    if (err) { throw err; }
    else { res.json({ body: data }) }
  });
});

app.get('/es/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/es', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/es/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/es', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/es/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/es', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/es/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
  console.log("App started")
});

// Export the app object.
// When executing the application local this does nothing.
// However, to port it to AWS Lambda, we will create a wrapper around
// that will load the app from this file.
module.exports = app
