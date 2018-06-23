let csv = `Date,Host
2018-06-22,Alfredo
2018-06-21,Harish
2018-06-15,Harish
2018-06-07,Aecio`;

// Capture groups, capture date and name, date must be at the start, and name at the end
let dateAndHost = /^(\d{4}-\d{2}-\d{2}),(harish|alfredo|obama)$/i;

// // Should print something
// console.log("2018-06-22,Alfredo".match(dateAndHost));
// console.log("2018-06-22,Alfredo".replace(dateAndHost, "$2"));

let hosts = csv
.split("\n") // Split the csv
.filter( line => { // Filter
    return line.match(dateAndHost)
})
.map( line => {
    return line.replace(dateAndHost, "$2 hosted at $1");
})
.join(". ");

// // Could not use map, so I used this instead
// for (let index = 0; index < hosts.length; index++) {
//     hosts[index] = hosts[index].replace(dateAndHost, "$2 hosted at $1");
// }

hosts;

// Non captute groups ?:

let input = "Alfredo hosts Mexguest and the Crazy";
let incorrectInput = "Harish hosts HChannel";

// We still want to match for either Carlos or Alfredo, but we don't need to access that capture group
// Note the ? after o in Alfredo, it will also match alfred
let extractChannelIfCorrectHost = /(?:alfredo?|carlos) hosts (.+)/i;

// Note how it only extracts the channel
let channel = input.match(extractChannelIfCorrectHost);
channel;
