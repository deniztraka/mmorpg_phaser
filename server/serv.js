const appRoot = require('app-root-path');
var Logger = require(appRoot + "/common/logger");
const utils = require(appRoot + "/common/utils");

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

    this.init();
}

Serv.prototype.init = function() {
    let self = this;

    this.io.on('connection', function(socket) {
        self.logger.info("a user connected: " + socket.id);
        // create a new player and add it to our players object
        self.players[socket.id] = {
            flipX: false,
            x: Math.floor(Math.random() * 400) + 50,
            y: Math.floor(Math.random() * 500) + 50,
            playerId: socket.id
        };
        // send the players object to the new player
        socket.emit('currentPlayers', self.players);
        // update all other players of the new player
        socket.broadcast.emit('newPlayer', self.players[socket.id]);

        // when a player disconnects, remove them from our players object
        socket.on('disconnect', function() {
            console.log('user disconnected: ', socket.id);
            delete self.players[socket.id];
            // emit a message to all players to remove this player
            self.io.emit('disconnect', socket.id);
        });

        // when a player moves, update the player data
        socket.on('playerMovement', function(movementData) {
            self.players[socket.id].x = movementData.x;
            self.players[socket.id].y = movementData.y;
            self.players[socket.id].flipX = movementData.flipX;
            // emit a message to all players about the player that moved
            socket.broadcast.emit('playerMoved', self.players[socket.id]);
        });
    });
};

Serv.prototype.start = function() {
    let self = this;

    self.timer = setInterval(function() {
        self.mainLoop();
    }, 1000 * self.serverProcessFrequency);
};

Serv.prototype.mainLoop = function() {
    let self = this;

    this.totalElapsedTimeFromSeconds += this.serverProcessFrequency;
    let deltaTime = this.totalElapsedTimeFromSeconds - this.lastTimeSeconds;

    //TODO: process gameworld here

    this.lastTimeSeconds = this.totalElapsedTimeFromSeconds;
    //total elapsed time logging
    utils.timerMechanics.executeByIntervalFromSeconds(this.serverProcessFrequency, this.totalElapsedTimeFromSeconds, 1,
        function() {
            self.logger.debug("Total elapsed time from seconds: " + Math.floor(self.totalElapsedTimeFromSeconds));
        });
};

Serv.prototype.stop = function() {
    clearInterval(this.timer);
};