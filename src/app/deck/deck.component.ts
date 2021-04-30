import { Component, OnInit } from '@angular/core';
import {ICard, IDeck, Card} from 'src/interfaces/card';
import {CardApiService} from 'src/services/card-api.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

  cardData:IDeck;
  deckId:IDeck;

  constructor(private  _cardApiService: CardApiService) { }

  //On Initialise get the DeckID and draw the 4 Cards
  ngOnInit(){
    this._cardApiService.getDeckId().subscribe(
      data => {       
        this._cardApiService.getCard(data.deck_id).subscribe(
          data => {
            this.cardData = JSON.parse(JSON.stringify(data))

            //Add the four cards drawn from the deck to our firebase Database
            for(let i = 0; i < 4; i++){
              this.addTheCard(this.cardData.cards[i].image, this.cardData.cards[i].value, this.cardData.cards[i].suit);
            }
          }
       )
      }
      )
  }

  addTheCard(image:string, value:string, suit:string):boolean{
    let tempCard:ICard;
    tempCard = new Card(image, value, suit);
    this._cardApiService.addCardData(tempCard);
    return false;
   }
}
