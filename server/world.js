const appRoot = require('app-root-path');
var Logger = require(appRoot + "/common/logger");
//const utils = require(appRoot + "/common/utils");

/**
 * Module exports.
 */

module.exports = World;

/**
 * Server constructor.
 *
 * @param {Object} options
 * @api public
 */
function World(opts) {
    this.opts = opts;
    this.players = {};
    this.logger = new Logger();
    this.init();
}

World.prototype.init = function () {
    let self = this;
};

World.prototype.update = function (deltaTime) {
    let self = this;
    //self.logger.debug("world update: " + deltaTime);
};

World.prototype.addPlayer = function (socketId) {
    this.players[socketId] = {
        flipX: false,
        x: Math.floor(Math.random() * 400) + 50,
        y: Math.floor(Math.random() * 500) + 50,
        playerId: socketId
    };
    this.logger.info("a user connected: " + socketId);
    return this.players[socketId];
};

World.prototype.removePlayer = function (socketId) {
    delete this.players[socketId];
    this.logger.info("user removed from world: " + socketId);    
};

World.prototype.getPlayers = function () {
    return this.players;
};

World.prototype.getPlayer = function (socketId) {
    return this.players[socketId];
};

World.prototype.updatePlayerMovementData = function (socketId, movementData) {
    this.players[socketId].x = movementData.x;
    this.players[socketId].y = movementData.y;
    this.players[socketId].flipX = movementData.flipX;
}