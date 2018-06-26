const express = require( 'express' );
const DatabaseHandler = require( '../lib/databasehandler' );

const dbRequest = new DatabaseHandler();

let router = express.Router();

// Get all items
router.get( '/', ( req, res ) => {
    dbRequest.fetchItems( ( err, items ) => {



    });
});

module.exports = router;
