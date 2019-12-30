const appRoot = require('app-root-path');
var Logger = require(appRoot + "/common/logger");
var BaseCommand = require(appRoot + "/server/commands/baseCommand");

/**
 * Module exports.
 */

module.exports = RightKeyPressedCommand;

function RightKeyPressedCommand(server, socketId) {
    var self = this;
    BaseCommand.call(this, server, socketId, function () {
        self.server.world.players[self.socketId].x = self.server.world.players[self.socketId].x + 1;
    });
}

RightKeyPressedCommand.prototype = new BaseCommand();
RightKeyPressedCommand.prototype.constructor = RightKeyPressedCommand;