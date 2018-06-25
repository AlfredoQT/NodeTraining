let postsRoute = require( './posts' );
let commentsRoute = require( './comments' );

let routes = {
    posts : postsRoute,
    comments: commentsRoute
};

module.exports = routes;
