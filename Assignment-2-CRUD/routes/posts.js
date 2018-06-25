let store = require( '../lib/store.js' );

const express = require( 'express' );
const router = express.Router();

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

router.put( '/:id', ( req, res ) => {
    // Check for any missing
    if ( !req.body.name || !req.body.url || !req.body.text ) {
        return res.status( 400 ).send( { error: "Data not correct" } );
    }
    // Check for bounds
    if ( req.params.id < 0 || req.params.id >= store.posts.length ) {
        return res.status( 400 ).send( { error: "Id is out of bounds" } );
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

    res.status( 201 ).send( { newPostId: newId } );
});
