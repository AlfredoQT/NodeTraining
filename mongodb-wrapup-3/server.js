const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const logger = require( 'morgan' );

const itemsRoute = require( './routes/items' );

let app = express();

app.use( bodyParser.json() );
app.use( logger( 'dev' ) );

// Let the route handle itself
app.use( '/items', itemsRoute );

module.exports = app;
