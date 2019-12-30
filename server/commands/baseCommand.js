const appRoot = require('app-root-path');
var Logger = require(appRoot + "/common/logger");

/**
 * Module exports.
 */

module.exports = BaseCommand;

function BaseCommand(serv, socketId, execute){
    this.executeFunc = execute;
    this.socketId = socketId;
    this.server = serv;
}

BaseCommand.prototype.execute = function () {
    this.executeFunc();
};