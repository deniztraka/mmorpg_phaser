const appRoot = require('app-root-path');
var Logger = require(appRoot + "/common/logger");
var BaseCommand = require(appRoot + "/server/commands/baseCommand");

/**
 * Module exports.
 */

module.exports = LeftKeyPressedCommand;

function LeftKeyPressedCommand(server, socketId) {
    var self = this;
    BaseCommand.call(this, server, socketId, function() {
        var player = self.server.world.getPlayer(self.socketId);
        var currentPosition = player.getPosition();
        var updatedPosition = {
            x: currentPosition.x - 1,
            y: currentPosition.y
        };
        self.server.world.updatePlayerMovementData(self.socketId, updatedPosition)
    });
}

LeftKeyPressedCommand.prototype = new BaseCommand();
LeftKeyPressedCommand.prototype.constructor = LeftKeyPressedCommand;