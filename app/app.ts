// lib/app.ts
import express = require('express');
import url = require('url');

import {Character} from "./character";

// Create a new express application instance
const app: express.Application = express();

app.use(express.json());

var characterList:Character[] = []

app.get('/greet', function (req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  if (query.name) {
    res.send(`Hello ${query.name} !`);
  } else {
    res.status(404).send(`Welcome to our character API.`);
  }
});

// READ ALL
app.get('/characters', function (req, res) {
    res.status(200).json(characterList);
});

// CREATE
app.post('/character', function (req, res) {
  let character = new Character(req.body.name, Number(req.body.skill));
  characterList.push(character);
  res.status(200).json(`Created character n°${character.id}`);
});

// READ
app.get('/character/:id', function (req, res) {
  let filteredCharacterList = characterList.filter(function(character){return "id" in character && character.id == req.params.id;})
  if (filteredCharacterList.length > 0) {
    res.status(200).json({"success": filteredCharacterList[0]});
  } else {
    res.status(200).json({"error": `Could not find character n°${req.params.id}`});
  }
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
  res.status(404).send(new Character("Bob", 100));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});