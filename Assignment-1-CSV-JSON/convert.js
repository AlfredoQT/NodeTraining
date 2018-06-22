// Using file converter
/* const fileConverter = require( './file-converter.js' );
const path = require( 'path' );

fileConverter.csvToJSON(path.join(__dirname, 'customer-data.csv'), path.join(__dirname, 'customer-data.json')); */

// Using csvtojson

const csv = require( 'csvtojson' );
const path = require( 'path' );
const fs = require( 'fs' );

csv().fromFile(path.join(__dirname, 'customer-data.csv'))
.then( ( value ) => {
    
    // Write the value to the JSON file, I guess this is better for error handling
    fs.writeFile(path.join(__dirname, 'customer-data.json'), JSON.stringify(value), ( err ) => {
        // If error is different than null
        if (err) {
            console.log(err.message);
            // Exit with an error 
            return process.exit(1);
        }
        return process.exit(0);
    });

});

// let results = [];

// // This is better for the second method, did not worked for me though
// csv().fromFile(path.join(__dirname, 'customer-data.csv'))
// .on( 'json', (jsonObj) => { // Called many times
//     console.log(jsonObj);
//     results.push( jsonObj );
// })
// .on( 'done', ( err ) => {
//     // Handle any error
//     if (err) {
//         console.log( err.message );
//         return process.exit(1);
//     }
//     // Write the value to the JSON file, I guess this is better for error handling
//     fs.writeFile(path.join(__dirname, 'customer-data.json'), JSON.stringify(results), ( err ) => {
//         // If error is different than null
//         if (err) {
//             console.log(err.message);
//             // Exit with an error 
//             return process.exit(1);
//         }
//         return process.exit(0);
//     });
// });