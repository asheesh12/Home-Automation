exports.decodeUserToken = decodeUserToken;
 
function decodeUserToken(request, response, next) {
    // Code to decode token, for the time being using manual authentication
    request.loggedInUserDetails = { userId: '5f9c591792eb3f3fcb89131e' };
    next();
}