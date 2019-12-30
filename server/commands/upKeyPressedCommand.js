const appRoot = require('app-root-path');
var Logger = require(appRoot + "/common/logger");
var BaseCommand = require(appRoot + "/server/commands/baseCommand");

/**
 * Module exports.
 */

module.exports = UpKeyPressedCommand;

function UpKeyPressedCommand(server, socketId) {
    var self = this;
    BaseCommand.call(this, server, socketId, function () {
        self.server.world.players[self.socketId].y = self.server.world.players[self.socketId].y - 1;
    });
}

UpKeyPressedCommand.prototype = new BaseCommand();
UpKeyPressedCommand.prototype.constructor = UpKeyPressedCommand;