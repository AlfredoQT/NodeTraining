const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const logger = require( 'morgan' );
const routes = require( './routes' );

let app = express();

// Parse the incoming data
app.use( bodyParser.json() );

// Log requests
app.use( logger( 'dev' ) );

app.use( '/posts', routes.posts );

module.exports = app;
