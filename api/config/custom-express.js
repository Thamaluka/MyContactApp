var express = require('express');
var consign = require('consign');
var bodyParse = require('body-parser');
var cors = require('cors');

module.exports = () => {
    var app = express();
    app.use(bodyParse.json());
    app.use(cors());
    consign()
        .include('routes')
        .then('database')
        .into(app)
    return app;
}