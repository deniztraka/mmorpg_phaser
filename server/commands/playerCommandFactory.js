const appRoot = require('app-root-path');
var Logger = require(appRoot + "/common/logger");
var LeftKeyPressedCommand = require(appRoot + "/server/commands/leftKeyPressedCommand");
var RightKeyPressedCommand = require(appRoot + "/server/commands/rightKeyPressedCommand");
var UpKeyPressedCommand = require(appRoot + "/server/commands/upKeyPressedCommand");
var DownKeyPressedCommand = require(appRoot + "/server/commands/downKeyPressedCommand");

/**
 * Module exports.
 */

module.exports = PlayerCommandFactory;

function PlayerCommandFactory(server) {
    this.server = server;
}

PlayerCommandFactory.prototype.getCommand = function (key, socketId) {


    switch (key) {
        case "left":
            return new LeftKeyPressedCommand(this.server, socketId);
        case "right":
            return new RightKeyPressedCommand(this.server, socketId);
        case "up":
            return new UpKeyPressedCommand(this.server, socketId);
        case "down":
            return new DownKeyPressedCommand(this.server, socketId);
        default:
            return null;
    }
}