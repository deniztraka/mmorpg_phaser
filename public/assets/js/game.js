const appRoot = require('app-root-path');

const inputMessage = document.getElementById('inputMessage');
const messages = document.getElementById('messages');
const {
    BootScene
} = require("./scenes/bootScene");
const {
    WorldScene
} = require("./scenes/worldScene");

window.addEventListener('keydown', event => {
    if (event.which === 13) {
        sendMessage();
    }
    if (event.which === 32) {
        if (document.activeElement === inputMessage) {
            inputMessage.value = inputMessage.value + ' ';
        }
    }
});

function sendMessage() {
    let message = inputMessage.value;
    if (message) {
        inputMessage.value = '';
        $.ajax({
            type: 'POST',
            url: '/submit-chatline',
            data: {
                message,
                refreshToken: getCookie('refreshJwt')
            },
            success: function(data) {},
            error: function(xhr) {
                console.log(xhr);
            }
        })
    }
}

function addMessageElement(el) {
    messages.append(el);
    messages.lastChild.scrollIntoView();
}





var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 320,
    height: 240,
    zoom: 3,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: false // set to true to view zones
        }
    },
    scene: [
        BootScene,
        WorldScene
    ]
};
var game = new Phaser.Game(config);