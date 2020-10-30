exports.decodeUserToken = decodeUserToken;
 
function decodeUserToken(request, response, next) {
    // Code to decode token, for the time being using manual authentication
    request.loggedInUserDetails = { userId: 'USER_ID#1234' };
    next();
}