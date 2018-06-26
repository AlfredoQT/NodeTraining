const express = require( 'express' );
const DatabaseHandler = require( '../lib/databasehandler' );

const dbRequest = new DatabaseHandler();

let router = express.Router();

// Get all items
router.get( '/', ( req, res ) => {
    dbRequest.fetchItems( ( err, items ) => {
        if ( err ) {
            return res.status( 500 ).send();
        }

        console.log( 'Success on retrieving items' );
        res.status( 200 ).send( items );
    });
});

module.exports = router;
