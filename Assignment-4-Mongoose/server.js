const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const logger = require( 'morgan' );
const errorhandler = require( 'errorhandler' );
const mongoose = require( 'mongoose' );
const accountsRouter = require( './routes/accounts' );

const app = express();

mongoose.connect( 'mongodb+srv://admin:admin@clustertest-wgpdz.mongodb.net/store?retryWrites=true')

app.use( bodyParser.json() );
app.use( logger( 'dev' ) );
app.use( errorhandler() );

app.use( '/accounts', accountsRouter );

module.exports = app;
