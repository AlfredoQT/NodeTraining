let store = require( '../lib/store.js' );

const express = require( 'express' );
const router = express.Router();

const idBoundsChecker = ( req, res, next ) => {
    if ( req.params.id < 0 || req.params.id >= store.posts[req.accessedPostID].comments.length ) {
        return res.status( 400 ).send( { error: "Id for comment is invalid. " } );
    }
    next();
};

// Just get all
router.get( '/', ( req, res ) => {
    res.status( 200 ).send( store.posts[req.accessedPostID].comments );
});

// Get a specific one
router.get( '/:id', idBoundsChecker, ( req, res ) => {
    res.status( 200 ).send( store.posts[req.accessedPostID].comments[req.params.id] );
});

// Post a comment
router.post( '/', (req, res) => {
    if ( !req.body.text ) {
        return res.status( 400 ).send( { error: "Data incorrect" } );
    }

    // Construct it
    const comment = {
        text: req.body.text
    };

    // Store it
    store.posts[req.accessedPostID].comments.push( comment );

    res.status( 201 ).send( { postId: req.accessedPostID, commentId: req.params.id} );
});

// Update one
router.put( '/:id', idBoundsChecker, ( req, res ) => {
    if ( !req.body.text ) {
        return res.status( 400 ).send( { error: "Data incorrect" } );
    }

    // Construct it
    const comment = {
        text: req.body.text
    };

    // Update it
    store.posts[req.accessedPostID].comments[req.params.id] =  comment;

    res.status( 204 ).send();
});

// Delete one
router.delete( '/:id', idBoundsChecker, ( req, res ) => {
    // Splice the guy
    store.posts[req.accessedPostID].comments.splice( req.params.id, 1 );
    res.send( 204 ).send();
});

module.exports = router;
