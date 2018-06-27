const mongoose = require( 'mongoose' );

let accountSchema = new mongoose.Schema({

    name: String,
    balance: Number

});

let Account = mongoose.model( 'Account', accountSchema );

module.exports = Account;
