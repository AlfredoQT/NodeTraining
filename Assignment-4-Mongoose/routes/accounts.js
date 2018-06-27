const express = require( 'express' );
const router = express.Router();
const Account = require( '../lib/account-model' );

const paramsCheck = ( req, res, next ) => {
    if ( !req.body.name || !req.body.balance || Number.isNaN( Number.parseFloat( req.body.balance ) ) ) {
        return res.status( 400 ).send( { error: 'Wrong data' } );
    }
    next();
};

router.get( '/', ( req, res ) => {
    // Retrieve by id in descending order
    Account
    .find()
    .sort( { _id: -1 } )
    .exec( ( err, results ) => {
        if ( err ) {
            return res.status( 500 ).send();
        }
        res.status( 200 ).send( results );
    });
});

router.post( '/', paramsCheck, ( req, res ) => {
    let newAccount = new Account( { name: req.body.name, balance: Number.parseFloat( req.body.balance ) } );
    newAccount.save( ( err ) => {
        if ( err ) {
            return res.status( 500 ).send();
        }
        res.status( 201 ).send( { createdAccount: newAccount } );
    });
});

router.put( '/:id', paramsCheck, ( req, res ) => {
    Account.findByIdAndUpdate( req.params.id, { $set: { name: req.body.name, balance: Number.parseFloat( req.body.balance ) } }, ( err, result ) => {
        if ( err ) {
            return res.status( 500 ).send();
        }
        console.log( req.body.balance );
        res.status( 200 ).send( { updatedAccount: result } );
    });
});

router.delete( '/:id', paramsCheck, ( req, res ) => {
    Account.findByIdAndDelete( req.params.id, ( err, result ) => {
        if ( err ) {
            return res.status( 500 ).send();
        }
        console.log( req.body.balance );
        res.status( 200 ).send( { deletedAccount: result } );
    });
});

module.exports = router;
