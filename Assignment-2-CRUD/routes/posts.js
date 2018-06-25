let store = require( '../lib/store.js' );

const express = require( 'express' );
const router = express.Router();

const idBoundsChecker = ( req, res, next ) => {
    if ( req.params.id < 0 || req.params.id >= store.posts.length ) {
        return res.status( 400 ).send( { error: "Id is out of bounds" } );
    }
    next();
};

router.get( '/', ( req, res ) => {
    // Just return all posts
    res.status( 200 ).send( store.posts );
});

router.post( '/', ( req, res ) => {
    // Check for any missing
    if ( !req.body.name || !req.body.url || !req.body.text ) {
        return res.status( 400 ).send( { error: "Data not correct" } );
    }

    // Creation
    const newId = store.posts.length;
    const newPost = {
        name: req.body.name,
        url: req.body.url,
        text: req.body.text,
        comments: []
    }

    // Store it
    store.posts.push( newPost );

    res.status( 201 ).send( { newPostId: newId } );
});

router.put( '/:id', idBoundsChecker, ( req, res ) => {
    // Check for any missing
    if ( !req.body.name || !req.body.url || !req.body.text ) {
        return res.status( 400 ).send( { error: "Data not correct" } );
    }
    // Update
    const updatedPost = {
        name: req.body.name,
        url: req.body.url,
        text: req.body.text,
        comments: store.posts[req.params.id].comments // Leave these in here
    }

    // Update it
    store.posts[req.params.id] = updatedPost;

    res.status( 201 ).send( { updatedPostId: req.params.id } );
});

router.delete( '/:id', idBoundsChecker, ( req, res ) => {
    // Delete the one
    store.posts.splice( req.params.id, 1 );
    res.status( 204 ).send();
});

module.exports = router;
