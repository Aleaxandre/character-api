// lib/app.ts
import express = require('express');
import url = require('url');

import { Character } from "./character";

// Create a new express application instance
const app: express.Application = express();

app.use(express.json());

var characterList: Character[] = []

app.get('/api/greet', function (req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  if (query.name) {
    res.send(`Hello ${query.name} !`);
  } else {
    res.status(404).send(`Welcome to our character API.`);
  }
});

// READ ALL
app.get('/api/characters', function (req, res) {
  res.status(200).json(characterList);
});

// CREATE
app.post('/api/character', function (req, res) {
  let character = new Character(req.body.name, Number(req.body.skill));
  characterList.push(character);
  res.status(200).json(`Created character n°${character.id}`);
});

// READ
app.get('/api/character/:id', function (req, res) {
  let filteredCharacterList = characterList.filter((character) => {
    return "id" in character && character.id === req.params.id;
  });
  if (filteredCharacterList.length > 0) {
    res.status(200).json({ "success": filteredCharacterList[0] });
  } else {
    res.status(200).json({ "error": `Could not find character n°${req.params.id}` });
  }
});

// UPDATE
app.put('/api/character/:id', function (req, res) {
  let charToUpdate = characterList.find((character) => {
    return "id" in character && character.id === req.params.id;
  });

  if (!!charToUpdate) {
    charToUpdate.name = req.body.name;
    charToUpdate.skill = req.body.skill;
    res.status(200).end(`Successfully updated character n°${req.params.id}`);
  } else {
   res.status(200).json({ "error": `Could not find character n°${req.params.id}` }); 
  }
});

// DELETE
app.delete('/api/character/:id', function (req, res) {
  characterList.forEach( (character, index) => {
    if(character.id === req.params.id) characterList.splice(index,1);
  });
  
  res.status(200).end(`Successfully deleted character n°${req.params.id}`);
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