const path = require('path');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        lobby: './public/assets/js/lobby.js',
        game: './public/assets/js/game.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    plugins: [
        //new CleanWebpackPlugin(),
        new CopyPlugin([{
            from: 'public',
            to: '',
            force: true
        }])
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};