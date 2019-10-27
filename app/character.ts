import {v4 as uuid} from 'uuid';
//import UUID from 'uuid/v4';

export class Character {
    id: string
    name: string
    skill: number
    constructor(name:string, skill:number) {
        this.id = uuid()
        this.skill = skill;
        this.name = name;
    }
}