import { Component, OnInit , Input} from '@angular/core';
import {Card, ICard, IDeck} from 'src/interfaces/card';
import {CardApiService} from 'src/services/card-api.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() cardData:IDeck;

  playerPoints;
  dealerPoints;

  constructor(private  _cardApiService: CardApiService) { }

  ngOnInit(): void {
    this.addTotalPoints();
  }

  addTotalPoints(){
    //Loop through cards to check for ACE, JACK, QUEEN, KING
    for (let i = 0; i < 4; i++) {
      if(this.cardData.cards[i].value == "ACE"){
        if(this.playerPoints > 10){
          this.cardData.cards[i].value = 1
        }
        else{
          this.cardData.cards[i].value = 11
        }
      }
      else if(this.cardData.cards[i].value == "JACK"){
        this.cardData.cards[i].value = 11
      }
      else if(this.cardData.cards[i].value == "QUEEN"){
        this.cardData.cards[i].value = 12
      }
      else if(this.cardData.cards[i].value == "KING"){
        this.cardData.cards[i].value = 13
      }
    }

    //Calculate the Points for both Player and Dealer
    this.playerPoints = Number(this.cardData.cards[0].value) + Number(this.cardData.cards[1].value);
    this.dealerPoints = Number(this.cardData.cards[2].value) + Number(this.cardData.cards[3].value);

    //Log points to console for testing
    console.log("Player Points: " + this.playerPoints + "\nDealer Points: " + this.dealerPoints);
  }
}
