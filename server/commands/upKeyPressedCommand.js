const appRoot = require('app-root-path');
var Logger = require(appRoot + "/common/logger");
var BaseCommand = require(appRoot + "/server/commands/baseCommand");

/**
 * Module exports.
 */

module.exports = UpKeyPressedCommand;

function UpKeyPressedCommand(server, socketId) {
    var self = this;
    BaseCommand.call(this, server, socketId, function() {
        var player = self.server.world.getPlayer(self.socketId);
        var currentPosition = player.getPosition();
        var updatedPosition = {
            x: currentPosition.x,
            y: currentPosition.y - 1
        };
        self.server.world.updatePlayerMovementData(self.socketId, updatedPosition)
    });
}

UpKeyPressedCommand.prototype = new BaseCommand();
UpKeyPressedCommand.prototype.constructor = UpKeyPressedCommand;