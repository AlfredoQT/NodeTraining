const express = require( 'express' );
const router = express.Router();
const Account = require( '../lib/account-model' );

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

router.post( '/', ( req, res ) => {
    if ( !req.body.name || !req.body.balance || Number.isNaN( Number.parseFloat( req.body.balance ) ) ) {
        return res.status( 400 ).send( { error: 'Wrong data' } );
    }
    let newAccount = new Account( { name: req.body.name, balance: Number.parseFloat( req.body.balance ) } );
    newAccount.save( ( err ) => {
        if ( err ) {
            return res.status( 500 ).send();
        }
        res.status( 201 ).send( { createdAccount: newAccount } );
    });
});

module.exports = router;
