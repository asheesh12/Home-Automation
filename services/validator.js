const { validationResult } = require('express-validator');

exports.validateRequest = validateRequest;

/**
 * Validates the request based on the validators used in the API
 * @author Asheesh Bhuria
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 */
function validateRequest(request, response, next) {
    const errors = validationResult(request);
    if (errors.isEmpty()) next();
    // TODO - Test the response in case of error
    return res.status(400).json({ errors: errors.array() });
} 