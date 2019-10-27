"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// lib/app.ts
const express = require("express");
const url = require("url");
const character_1 = require("./character");
// Create a new express application instance
const app = express();
app.use(express.json());
var characterList = [
    new character_1.Character("Alex", 1),
    new character_1.Character("Nico", 100),
    new character_1.Character("Caroline", 100)
];
app.get('/greet', function (req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    if (query.name) {
        res.send(`Hello ${query.name} !`);
    }
    else {
        res.status(404).send(`Welcome to our character API.`);
    }
});
// READ ALL
app.get('/characters', function (req, res) {
    res.status(200).json(characterList);
});
// CREATE
app.post('/character', function (req, res) {
    let character = new character_1.Character(req.body.name, Number(req.body.skill));
    characterList.push(character);
    res.status(200).json(`Created character n°${character.id}`);
});
// READ
app.get('/character/:id', function (req, res) {
    characterList.filter(function (character) { return character.id == req.params.id; });
    res.status(200).json({ id: req.params.id, name: "Alex", skill: 0 });
});
// UPDATE
app.put('/character/:id', function (req, res) {
    res.status(200).end(`Successfully updated character n°${req.params.id}`);
});
// DELETE
app.delete('/character/:id', function (req, res) {
    res.status(200).end(`Successfully updated character n°${req.params.id}`);
});
app.get('/', function (req, res) {
    res.status(404).send(`<b>Non existing content<b>`);
});
app.get('/test', function (req, res) {
    res.status(404).send(new character_1.Character("Bob", 100));
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
//# sourceMappingURL=app.js.map