import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ICard, IDeck} from '../interfaces/card';
import {observable, Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {AngularFirestoreCollection, AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class CardApiService {

  deckDataCollection:AngularFirestoreCollection<IDeck>;

  cardData:Observable<IDeck[]>;

  apiDeckUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=5';
  apiUrl;

  constructor(private _http:HttpClient, private _afs:AngularFirestore) { 
    this.deckDataCollection=_afs.collection<IDeck>("deck_data");
  }

  getDeckId(){
    return this._http.get<IDeck>(this.apiDeckUrl);
  }

  getCard(deckId) : Observable<IDeck[]>{
    console.log("DeckId: " + deckId);
    this.apiUrl = 'https://deckofcardsapi.com/api/deck/' + deckId + '/draw/?count=4';
    this.cardData = this._http.get<IDeck[]>(this.apiUrl);

    return this._http.get<IDeck[]>(this.apiUrl)
  
    .pipe(
      tap(data => console.log('string data:' + JSON.stringify(data)),
    ),
      catchError(this.handleError)
    );
  }

  addCardData(card:ICard) : void{
    this.deckDataCollection.add(JSON.parse(JSON.stringify(card)));
  }

  private handleError(err:HttpErrorResponse){
    console.log('CardApiService' + err.message);
    return Observable.throw(err.message);
  }
}
