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
    //Loop through cards to check for ACE, JACK, QUEEN, KING and give its respective value
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

        //If a card is drawn and either player or dealer busts, automatically finish the game
        if(this.playerPoints > 21 || this.dealerPoints > 21){
          this.checkPoints();
        }

        //Add the cards drawn from the deck to our firebase Database
        for(let i = 0; i < 2; i++){
          this.addTheCard(this.cardData.cards[i].image, this.cardData.cards[i].value, this.cardData.cards[i].suit);
        }
      }
   )
  }

  //Adds the value of the cards drawn to the total points and also show drawn cards on HTML
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

    //Update Image source to the newly drawn card
    var playerCard = document.getElementById("imgPlayerContainer");
    var dealerCard = document.getElementById("imgDealerContainer");

    //Create Img tags for new drawn card
      const playerImg = document.createElement('img');
      const dealerImg = document.createElement('img');

    //Append it inside the div
    playerCard.appendChild(playerImg);
    dealerCard.appendChild(dealerImg);

    playerImg.src = this.cardData.cards[0].image
    this.playerPoints += Number(this.cardData.cards[0].value);

    //If dealer is above 17 points then he automatically stands
    if(this.dealerPoints < 17){
      dealerImg.src = this.cardData.cards[1].image
      this.dealerPoints += Number(this.cardData.cards[1].value);
    }

    //Log points to console for testing
    console.log("Player Points: " + this.playerPoints + "\nDealer Points: " + this.dealerPoints);
  }

  //Checks the points of both player and dealer to see who won
  checkPoints(){
    var winner = document.getElementById("winner");
    if(this.playerPoints > 21){
      console.log("Dealer Wins!");
      winner.innerHTML = "Player Busts, Dealer WINS!";
    }
    else if (this.dealerPoints > 21){
      console.log("Player Wins!")
      winner.innerHTML = "Dealer Busts, Player WINS!";
    }
    else if(this.playerPoints > 21 && this.dealerPoints > 21){
      console.log("Dealer Wins!");
      winner.innerHTML = "Player and Dealer Busts, Dealer WINS by default";
    }
    else if (this.playerPoints > this.dealerPoints){
      console.log("Player Wins!");
      winner.innerHTML = "Player WINS!";
    }
    else if (this.playerPoints < this.dealerPoints){
      console.log("Dealer Wins!");
      winner.innerHTML = "Dealer WINS!";
    }
    else if (this.playerPoints == this.dealerPoints){
      console.log("Its a Tie!");
      winner.innerHTML = "It's a TIE!";
    }

    //Hide the Hit and Stand Button as game is finished
    var hitBtn = document.getElementById("hit");
    var standBtn = document.getElementById("stand");

    hitBtn.className= "d-none";
    standBtn.className = "d-none";
  }

  //Method to add our cards drawn into our database
  addTheCard(image:string, value:string, suit:string):boolean{
    let tempCard:ICard;
    tempCard = new Card(image, value, suit);
    this._cardApiService.addCardData(tempCard);
    return false;
   }
}
