import {stringify} from 'querystring';

export interface ICard{
    image:string;
    value:string;
    suit:string;
}

export interface IDeck{
    deck_id:string;
    cards:ICard[];
}

export class Card{
    image:string;
    value:string;
    suit:string;

    constructor(image:string, value:string, suit:string){
        this.image = image;
        this.value = value;
        this.suit = suit;
    }
}

