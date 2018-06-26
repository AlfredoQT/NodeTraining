const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

class DatabaseHandler {

    constructor() {
        this.url = 'mongodb+srv://admin:admin@clustertest-wgpdz.mongodb.net/test?retryWrites=true';
        this.databaseName = 'whishlist';
    }

    fetchItems( callback ) {
        MongoClient.connect( this.url, ( err, client ) => {
            if ( err ) {
                return callback( err, null );
            }
            // Maybe separate collection names into another class?
            client.db( this.databaseName ).collection( 'items' ).find( {}, { sort: { _id: -1} } ).toArray( ( err, items ) => {
                if ( err ) {
                    client.close();
                    return callback( err, null );
                }
                
                callback( null, items );

                client.close();
            });
            
        });
    }

    insertItem( item, callback ) {
        MongoClient.connect( this.url, ( err, client ) => {
            if ( err ) {
                return callback( err, null );
            }

            client.db( this.databaseName ).collection( 'items' ).insertOne( item, ( err, result ) => {
                if ( err ) {
                    client.close();
                    return callback( err, null );
                }
                // Does not matter for this exercise, but result.ops[0] contains the actual info of the inserted object, including its id
                callback( null, result );
                client.close();
            });
        });
    }

}

module.exports = DatabaseHandler;
