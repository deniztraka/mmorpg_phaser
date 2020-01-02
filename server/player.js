const appRoot = require('app-root-path');
var Logger = require(appRoot + "/common/logger");
const utils = require(appRoot + "/common/utils");

/**
 * Module exports.
 */

module.exports = Player;


function Player(id, _x, _y) {
    this.id = id;

    this.position = {
        x: _x,
        y: _y
    };

    this.oldPosition = {
        x: _x,
        y: _y
    };

    this.flipX = false;
};

Player.prototype.getPosition = function() {
    return this.position;
};

Player.prototype.setPosition = function(position) {
    this.position = position;
};

Player.prototype.getOldPosition = function() {
    return this.oldPosition;
};

Player.prototype.setOldPosition = function(position) {
    this.oldPosition = position;
};

Player.prototype.isPositionChanged = function() {
    return this.position != this.oldPosition;
};