const MongoClient = require( 'mongodb' ).MongoClient;

class DatabaseHandler {

    constructor() {
        this.url = 'mongodb+srv://admin:<PASSWORD>@clustertest-wgpdz.mongodb.net/test?retryWrites=true';
        this.databaseName = 'whishlist';
    }

    fetchItems( callback ) {
        MongoClient.connect( this.url, ( err, db ) => {
            if ( err ) {
                return callback( err, null );
            }
            // Maybe separate collection names into another class?
            db.collection( 'items' ).find( {}, { sort: { _id: -1} } ).toArray( ( err, items ) => {
                if ( err ) {
                    return callback( err, null );
                }
                
                callback( null, items );

                db.close();
            });
            
        });
    }

}

module.exports = DatabaseHandler;
