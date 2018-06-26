/**
 * @author: Alfredo Quintero Tlacuilo
 * @summary: Migrate new data from customers
 */

const async = require( 'async' );
const path = require( 'path' );
const mongodb  = require( 'mongodb' )
const MongoClient = mongodb.MongoClient;
const url = 'mongodb+srv://admin:admin@clustertest-wgpdz.mongodb.net/test?retryWrites=true';
const databaseName = 'store';

// The files, we don't need to write to them
let address = require( path.join(__dirname, 'lib', 'm3-customer-address-data.json') );
let customer = require( path.join(__dirname, 'lib', 'm3-customer-data.json') );

const queriesInParallel = Math.floor( customer.length / ( process.argv[2] % customer.length ) );
const toInsertInQuery = process.argv[2] % customer.length;

let tasks = [];

// Construct the tasks
for ( let i = 0; i < queriesInParallel; ++i) {

    tasks.push( () => {
        // Just a simple connection, no need to write a complex database handler
        MongoClient.connect( url, ( err, client ) => {
            if ( err ) {
                return; // I don't know whether I should exit or no
            }
    
            let fullCustomers = [];
            for (let j = 0 + toInsertInQuery * i; j < toInsertInQuery * ( i + 1 ); ++j) {
                // Basically create an object combining both
                fullCustomers.push( Object.assign( customer[j], address[j] ) );
            }
    
            // Insert to the database
            client.db( databaseName ).collection( 'customers' ).insertMany( fullCustomers, ( err, result ) => {
                if ( err ) {
                    client.close();
                    return;
                }
                client.close();
            });
        });    
    });
}

// Run!!
async.parallel( tasks, ( error, results ) => {
    if ( error ) {
        return;
    }
});
