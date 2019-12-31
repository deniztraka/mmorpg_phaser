const appRoot = require('app-root-path');
var Logger = require(appRoot + "/common/logger");
var BaseCommand = require(appRoot + "/server/commands/baseCommand");

/**
 * Module exports.
 */

module.exports = DownKeyPressedCommand;

function DownKeyPressedCommand(server, socketId) {
    var self = this;
    BaseCommand.call(this, server, socketId, function() {
        var player = self.server.world.getPlayer(self.socketId);
        var currentPosition = player.getPosition();
        var updatedPosition = {
            x: currentPosition.x,
            y: currentPosition.y + 1
        };
        self.server.world.updatePlayerMovementData(self.socketId, updatedPosition)
    });
}

DownKeyPressedCommand.prototype = new BaseCommand();
DownKeyPressedCommand.prototype.constructor = DownKeyPressedCommand;