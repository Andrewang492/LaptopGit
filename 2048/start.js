// start.js

require('babel-register')({
    presets: ['env']
});

module.exports = require('./game2048.js')