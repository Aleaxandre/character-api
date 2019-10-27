"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
//import UUID from 'uuid/v4';
class Character {
    constructor(name, skill) {
        this.id = uuid_1.v4();
        this.skill = skill;
        this.name = name;
    }
}
exports.Character = Character;
//# sourceMappingURL=character.js.map