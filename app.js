// reads in our .env file and makes those values available as environment variables
require('dotenv').config();

var appRoot = require('app-root-path');
var Logger = require(appRoot + "/common/logger");
var logger = new Logger();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const routes = require('./routes/main');
const lobbyRoutes = require('./routes/lobby');
const secureRoutes = require('./routes/secure');
const passwordRoutes = require('./routes/password');
const asyncMiddleware = require('./middleware/asyncMiddleware');
const ChatModel = require('./models/chatModel');

const Serv = require('./server/serv');


// setup mongo connection
const uri = process.env.MONGO_CONNECTION_URL;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.connection.on('error', (error) => {
    logger.error("error on mongo connection", error);
    process.exit(1);
});
mongoose.connection.on('connected', function () {
    logger.info("connected to mongo");
});
mongoose.set('useFindAndModify', false);

// create an instance of an express app
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);



// update express settings
app.use(bodyParser.urlencoded({
    extended: false
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(cookieParser());

// require passport auth
require('./auth/auth');

app.get('/game.html', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    res.sendFile(__dirname + '/public/game.html');
});

app.get('/lobby.html', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    res.sendFile(__dirname + '/public/lobby.html');
});

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

// main routes
app.use('/', routes);
app.use('/', passwordRoutes);
app.use('/', passport.authenticate('jwt', {
    session: false
}), secureRoutes);
app.use("/", passport.authenticate('jwt', {
    session: false
}), lobbyRoutes);

app.post('/submit-chatline', passport.authenticate('jwt', {
    session: false
}), asyncMiddleware(async (req, res, next) => {
    const {
        message
    } = req.body;
    const {
        email,
        name
    } = req.user;
    await ChatModel.create({
        email,
        message
    });
    io.emit('new message', {
        username: name,
        message,
    });
    res.status(200).json({
        status: 'ok'
    });
}));

// catch all other routes
app.use((req, res, next) => {
    res.status(404).json({
        message: '404 - Not Found'
    });
});

// handle errors
app.use((err, req, res, next) => {
    logger.error("error handler: ", err);
    res.status(err.status || 500).json({
        error: err.message
    });
});

server.listen(process.env.PORT || 3000, () => {
    logger.info(`Server started on port ${process.env.PORT || 3000}`);
});

var serv = new Serv({}, io);
serv.start();