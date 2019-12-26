const utils = require("./utils");
var colors = require('colors');

/**
 * Module exports.
 */

module.exports = Logger;

/**
 * Logger constructor.
 *
 * @param {Object} options
 * @api public
 */

function Logger() {
    this.logLevel = process.env.LOGLEVEL || 3;
};

Logger.prototype.debug = function(message) {
    if (this.logLevel >= 3) {
        console.log((utils.time.getDateTimeText()).gray + (" || DEBUG || " + message).gray);
    }
};

Logger.prototype.info = function(message) {
    if (this.logLevel >= 2) {
        console.log((utils.time.getDateTimeText()).gray + (" || INFO  || " + message).white);
    }
};

Logger.prototype.audit = function(message) {
    if (this.logLevel >= 1) {
        console.log((utils.time.getDateTimeText()).gray + (" || AUDIT || " + message).yellow);
    }
};

Logger.prototype.error = function(message, e) {
    if (this.logLevel >= 0) {
        console.log((utils.time.getDateTimeText()).gray + (" || ERROR || " + message + " ==> ExMessage: " + e.message).red);
    }
};