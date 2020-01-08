export class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'BootScene',
            active: true
        });
    }

    preload() {
        // map tiles
        this.load.image('tiles', 'assets/map/spritesheet-extruded.png');
        // map in json format
        this.load.tilemapTiledJSON('map', 'assets/map/map.json');
        // our two characters
        this.load.spritesheet('player', 'assets/RPG_assets.png', {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet('pixelman', 'assets/pixelman.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.image('golem', 'assets/images/coppergolem.png');
        this.load.image('ent', 'assets/images/dark-ent.png');
        this.load.image('demon', 'assets/images/demon.png');
        this.load.image('worm', 'assets/images/giant-worm.png');
        this.load.image('wolf', 'assets/images/wolf.png');
        this.load.image('sword', 'assets/images/attack-icon.png');
    }

    create() {
        this.scene.start('WorldScene');
    }
}