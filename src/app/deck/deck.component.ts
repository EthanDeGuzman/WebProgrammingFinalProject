import { Component, OnInit } from '@angular/core';
import {ICard, IDeck, Card} from 'src/interfaces/card';
import {CardApiService} from 'src/services/card-api.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

  cardData:ICard[];

  constructor(private  _cardApiService: CardApiService) { }

  ngOnInit(){
    this._cardApiService.getDeckId().subscribe(
      data => this._cardApiService.getCard(data.deck_id).subscribe(
      data => {this.cardData = data}
      )
      )
      console.log("Console: " + this.cardData)
  }

  addTheCard(image:string, value:string, suit:string) :boolean{
    let tempCard:ICard;
    tempCard = new Card(image, value, suit);
    this._cardApiService.addCardData(tempCard);
    return false;
  }

}
