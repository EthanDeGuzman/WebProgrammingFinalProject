import { Component, OnInit } from '@angular/core';
import { ICard } from 'src/interfaces/card';
import { CardApiService } from 'src/services/card-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private _cardApiService: CardApiService){

  }

  ngOnInit(){

  }
  
  reloadPage() {
    window.location.reload();
 }
}
