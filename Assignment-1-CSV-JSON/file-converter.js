const fs = require( 'fs' );

class FileConverter {

    static csvToJSON(csvPath, jsonOutPath) {
        const buffer = fs.readFileSync( csvPath );
        // Do not care about \r or \n
        const lines = buffer.toString().split(/[\n\r]+/);
        const keys = lines[0].split(",");

        let results = [];

        // Start looking from the next element
        for (let index = 1; index < lines.length; index++) {
            const line = lines[index];
            const atts = line.split(",");
            
            // Ignore this ones
            if (atts.length !== keys.length) {
                continue;
            }

            // Construct the element
            let element = {};

            for (let j = 0; j < keys.length; ++j) {
                element[keys[j]] = atts[j];
            }

            // Push the element back
            results.push(element);
        }
        // Write the contents of the array
        fs.writeFileSync( jsonOutPath, JSON.stringify(results));
    }
    
}

module.exports = FileConverter;
