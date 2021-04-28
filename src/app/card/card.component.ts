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

  extraCard:IDeck;

  playerPoints;
  dealerPoints;

  constructor(private  _cardApiService: CardApiService) { }

  ngOnInit(): void {
    this.addInitialTotalPoints();
  }

  addInitialTotalPoints(){
    //Loop through cards to check for ACE, JACK, QUEEN, KING
    for (let i = 0; i < 4; i++) {
      console.log("Card " + i + ":" + this.cardData.cards[i].value);
      if(this.cardData.cards[i].value == "ACE"){
        if(this.playerPoints > 10){
          this.cardData.cards[i].value = 1
        }
        else{
          this.cardData.cards[i].value = 11
        }
      }
      else if(this.cardData.cards[i].value == "JACK" || this.cardData.cards[i].value == "QUEEN" || this.cardData.cards[i].value == "KING"){
        this.cardData.cards[i].value = 10
      }
    }
    //Calculate the Points for both Player and Dealer
    this.playerPoints = Number(this.cardData.cards[0].value) + Number(this.cardData.cards[1].value);
    this.dealerPoints = Number(this.cardData.cards[2].value) + Number(this.cardData.cards[3].value);
    //Log points to console for testing
    console.log("Player Points: " + this.playerPoints + "\nDealer Points: " + this.dealerPoints);
  }

  //Method to draw cards when Button Hit is Pressed
  drawCard(deck_id){
    this._cardApiService.getCard(deck_id).subscribe(
      data => {
        this.cardData = JSON.parse(JSON.stringify(data))
        this.addPoints();
      }
   )
  }

  //Adds the value of the cards drawn to the total points
  addPoints(){
    for (let i = 0; i < 2; i++) {
      console.log("Card " + i + ":" + this.cardData.cards[i].value);
      if(this.cardData.cards[i].value == "ACE"){
        if(this.playerPoints > 10){
          this.cardData.cards[i].value = 1
        }
        else{
          this.cardData.cards[i].value = 11
        }
      }
      else if(this.cardData.cards[i].value == "JACK" || this.cardData.cards[i].value == "QUEEN" || this.cardData.cards[i].value == "KING"){
        this.cardData.cards[i].value = 10
      }
    }

    this.playerPoints += Number(this.cardData.cards[0].value);
    //If dealer is above 17 points then he automatically stands
    if(this.dealerPoints < 17){
      this.dealerPoints += Number(this.cardData.cards[1].value);
    }
    //Log points to console for testing
    console.log("Player Points: " + this.playerPoints + "\nDealer Points: " + this.dealerPoints);
  }

  checkPoints(){
    console.log( "CHECKING POINTS " + "Player Points: " + this.playerPoints + "\nDealer Points: " + this.dealerPoints);
    if(this.playerPoints > 21){
      console.log("Dealer Wins!");
    }
    else if (this.playerPoints > this.dealerPoints){
      console.log("Player Wins!");
    }
    else if (this.playerPoints < this.dealerPoints){
      console.log("Dealer Wins!");
    }
    else if (this.playerPoints == this.dealerPoints){
      console.log("Its a Tie!");
    }
  }
}
