const appRoot = require('app-root-path');
var Logger = require(appRoot + "/common/logger");
var Player = require(appRoot + "/server/player");
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

World.prototype.init = function() {
    let self = this;
};

World.prototype.update = function(deltaTime) {
    let self = this;


    //check movement and update old position
    for (var playerId in this.players) {
        //get playerdata on this socketId
        if (this.players[playerId].isPositionChanged()) {
            //update oldPosition
            this.players[playerId].oldPosition = this.players[playerId].position;
        }
    }
};

World.prototype.addPlayer = function(socketId) {
    var randomX = Math.floor(Math.random() * 400) + 50;
    var randomY = Math.floor(Math.random() * 500) + 50;
    this.players[socketId] = new Player(socketId, randomX, randomY);

    this.logger.info("a user connected: " + socketId);
    return this.players[socketId];
};

World.prototype.removePlayer = function(socketId) {
    delete this.players[socketId];
    this.logger.info("user removed from world: " + socketId);
};

World.prototype.getPlayers = function() {
    return this.players;
};

World.prototype.getPlayer = function(socketId) {
    return this.players[socketId];
};

World.prototype.updatePlayerMovementData = function(socketId, movementData) {
    this.players[socketId].setOldPosition(this.players[socketId].getPosition());
    this.players[socketId].setPosition({
        x: movementData.x,
        y: movementData.y
    });    
}