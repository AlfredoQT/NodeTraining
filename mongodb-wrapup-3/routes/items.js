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

router.post( '/', ( req, res ) => {
    if ( !req.body.name || !req.body.description ) {
        return res.status( 400 ).send( { error: "Data is incorrect" } );
    }

    dbRequest.insertItem( { name: req.body.name, description: req.body.description }, ( err, result ) => {
        if ( err ) {
            return res.status( 500 ).send();
        }
        res.status( 200 ).send( result );
    });
});

module.exports = router;
