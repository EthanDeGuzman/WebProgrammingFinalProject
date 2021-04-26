import { Component, OnInit , Input} from '@angular/core';
import {ICard, IDeck} from 'src/interfaces/card';
import {CardApiService} from 'src/services/card-api.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(private  _cardApiService: CardApiService) { }

  ngOnInit(): void {
  }

  
}
