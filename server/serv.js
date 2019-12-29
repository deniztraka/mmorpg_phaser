const appRoot = require('app-root-path');
var Logger = require(appRoot + "/common/logger");
const utils = require(appRoot + "/common/utils");
const World = require(appRoot + "/server/world");

/**
 * Module exports.
 */

module.exports = Serv;

/**
 * Server constructor.
 *
 * @param {Object} options
 * @api public
 */

function Serv(opts, io) {
    this.io = io;
    this.logger = new Logger();
    this.players = {};
    this.serverProcessFrequency = opts && opts.serverProcessFrequency ? opts.serverProcessFrequency : 1 / 60;

    this.lastTimeSeconds = 0;
    this.totalElapsedTimeFromSeconds = 0;
    this.timer = null;
    this.world = new World(opts);
    this.init();
}

Serv.prototype.init = function () {
    let self = this;

    this.io.on('connection', function (socket) {

        // add player to world
        self.world.addPlayer(socket.id);

        // send current player infos to the new player
        socket.emit('currentPlayers', self.world.getPlayers());

        // update all other players about the new player
        socket.broadcast.emit('newPlayer', self.world.getPlayer(socket.id));

        // when a player disconnects, remove them from our world
        socket.on('disconnect', function () {
            self.world.removePlayer(socket.id);

            // emit a message to all players to remove this player
            self.io.emit('disconnect', socket.id);
        });

        // when a player moves, update the player data
        socket.on('playerMovement', function (movementData) {
            self.world.updatePlayerMovementData(socket.id, movementData);

            // emit a message to all players about the player that moved
            socket.broadcast.emit('playerMoved', self.world.getPlayer(socket.id));
        });
    });
};

Serv.prototype.start = function () {
    let self = this;

    self.timer = setInterval(function () {
        self.mainLoop();
    }, 1000 * self.serverProcessFrequency);
};

Serv.prototype.mainLoop = function () {
    let self = this;

    this.totalElapsedTimeFromSeconds += this.serverProcessFrequency;
    let deltaTime = this.totalElapsedTimeFromSeconds - this.lastTimeSeconds;

    this.world.update(deltaTime);

    this.lastTimeSeconds = this.totalElapsedTimeFromSeconds;
    //total elapsed time logging
    utils.timerMechanics.executeByIntervalFromSeconds(this.serverProcessFrequency, this.totalElapsedTimeFromSeconds, 1,
        function () {
            self.logger.debug("Total elapsed time from seconds: " + Math.floor(self.totalElapsedTimeFromSeconds));
        });
};

Serv.prototype.stop = function () {
    clearInterval(this.timer);
};