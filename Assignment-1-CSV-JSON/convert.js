const fileConverter = require( './file-converter.js' );
const path = require( 'path' );

fileConverter.csvToJSON(path.join(__dirname, 'customer-data.csv'), path.join(__dirname, 'customer-data.json'));
