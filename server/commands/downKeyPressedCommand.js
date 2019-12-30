const appRoot = require('app-root-path');
var Logger = require(appRoot + "/common/logger");
var BaseCommand = require(appRoot + "/server/commands/baseCommand");

/**
 * Module exports.
 */

module.exports = DownKeyPressedCommand;

function DownKeyPressedCommand(server, socketId) {
    var self = this;
    BaseCommand.call(this, server, socketId, function () {        
        self.server.world.players[self.socketId].y = self.server.world.players[self.socketId].y + 1;
    });
}

DownKeyPressedCommand.prototype = new BaseCommand();
DownKeyPressedCommand.prototype.constructor = DownKeyPressedCommand;