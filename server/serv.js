const appRoot = require('app-root-path');
var Logger = require(appRoot + "/common/logger");
const utils = require(appRoot + "/common/utils");
const World = require(appRoot + "/server/world");
const PlayerCommandFactory = require(appRoot + "/server/commands/playerCommandFactory");

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
    this.sockets = {};
    this.serverProcessFrequency = opts && opts.serverProcessFrequency ? opts.serverProcessFrequency : 1 / 60;

    this.playerCommandQueu = [];
    this.playerCommandFactory = new PlayerCommandFactory(this);

    this.lastTimeSeconds = 0;
    this.totalElapsedTimeFromSeconds = 0;
    this.timer = null;
    this.world = new World(opts);
    this.init();
}

Serv.prototype.init = function () {
    let self = this;

    this.io.on('connection', function (socket) {

        self.sockets[socket.id] = socket;
        // add player to world
        self.world.addPlayer(socket.id);

        // send current player infos to the new player
        socket.emit('currentPlayers', self.world.getPlayers());

        // update all other players about the new player
        socket.broadcast.emit('newPlayer', self.world.getPlayer(socket.id));

        // when a player disconnects, remove them from our world
        socket.on('disconnect', function () {
            self.world.removePlayer(socket.id);

            delete self.sockets[socket.id];

            // emit a message to all players to remove this player
            self.io.emit('disconnect', socket.id);
        });

        //when a player command received
        socket.on("playerCommand", function (commandData) {
            self.playerCommandQueu.push({
                socketId: socket.id,
                data: commandData
            });
        });

        socket.on("playerCommands", function (commandData) {
            commandData.forEach(function (command) {
                self.playerCommandQueu.push({
                    socketId: socket.id,
                    data: command
                });
            });
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


    this.processCommandQueue();

    utils.timerMechanics.executeByIntervalFromSeconds(this.serverProcessFrequency, this.totalElapsedTimeFromSeconds, 1 / 60, function () {
        self.updateMovementDataOnClients();
    });

    this.world.update(deltaTime);

    this.lastTimeSeconds = this.totalElapsedTimeFromSeconds;

    //total elapsed time logging
    utils.timerMechanics.executeByIntervalFromSeconds(this.serverProcessFrequency, this.totalElapsedTimeFromSeconds, 1,
        function () {
            self.logger.debug("Total elapsed time from seconds: " + Math.floor(self.totalElapsedTimeFromSeconds));
        });
};

Serv.prototype.updateMovementDataOnClients = function () {
    var self = this;
    for (var socketId in this.sockets) {
        //get playerdata on this socketId
        var player = self.world.getPlayer(socketId);

        if (player.isPositionChanged()) {
            //emit to current player that it is moved
            self.sockets[socketId].emit("playerMoved", player);

            //inform other sockets about current player
            self.sockets[socketId].broadcast.emit('otherPlayerMoved', player);
        }
    }    
};

Serv.prototype.processCommandQueue = function () {
    var count = this.playerCommandQueu.length;
    for (let i = 0; i < count; i++) {
        var clientCommand = this.playerCommandQueu.shift();
        this.processCommand(clientCommand);
    }
    //this.logger.debug("Total command processed count: " + count);    
};

Serv.prototype.processCommand = function (command) {
    var playerCommand = this.playerCommandFactory.getCommand(command.data.key, command.socketId);
    playerCommand.execute();
};

Serv.prototype.stop = function () {
    clearInterval(this.timer);
};