'use strict';
const { ERROR_REASONS } = require('../config/constants.config');
const { response } = require("express");

exports.createResponseHandler = createResponseHandler;
exports.createErrorHandler = createErrorHandler;

function createResponseHandler(response, statusCode) {
    return function(apiResponse) {
        return handleResponse(response, statusCode, apiResponse);
    }
}

function createErrorHandler(response) {
    return function(error) {
        return handleError(response, error);
    }
}

function handleError(response, error) {
    if (!error) return sendServerErrorResponse(response);
    switch(error.reason) {
        case ERROR_REASONS.NOT_FOUND:
            response.status(404);
            break;
        default:
            // TODO - Need to confirm the statusCode for this case
            response.status(400);
    }
    response.send(error)
}

function handleResponse(response, statusCode, apiResponse) {
    if (!data) return sendServerErrorResponse(response);
    if (statusCode) return response.status(statusCode);
    response.send(data);
}

function sendServerErrorResponse(response) {
    response.status(500).send({
        error: true,
        message: "Something went wrong, please try again later."
    })
}