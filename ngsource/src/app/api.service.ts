import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ITournament } from './types/tournament';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public testTournament: ITournament = {
    name: 'Pepsi Co',
    brandColor: '#004892',
    accentColor: '#e40028',
    logoLink: '/assets/images/pepsi-logo.png',
    playersNumber: 24,
    streamLink: 'https://www.pepsi.com/',
    tournamentName: 'FIFA World Cup',
  };
  constructor(private httpClient: HttpClient) {}
  private url = 'http://localhost:5000/api/tournament';
  public updateTournamentDetails(tm: ITournament) {
    return this.httpClient.post(this.url, tm);
  }
  public getTournamentDetails(tmid: string) {
    // return of(this.testTournament).pipe(delay(650));
    return this.httpClient.get<ITournament>(this.url);
  }
}
