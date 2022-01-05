import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ITMresponse, ITournament } from './types/tournament';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  /* public testTournament: ITournament = {
    name: 'Pepsi Co',
    brandColor: '#004892',
    accentColor: '#e40028',
    logoLink: '/assets/images/pepsi-logo.png',
    playersNumber: 24,
    streamLink: 'https://www.pepsi.com/',
    tournamentName: 'FIFA World Cup',
  }; */
  constructor(private httpClient: HttpClient) {}
  private url = `${environment.api_url}/tournament`;
  public createTournament(tmData: FormData) {
    return this.httpClient.post<ITMresponse>(this.url, tmData);
  }
  public getTournamentDetails(tmid: string) {
    // return of(this.testTournament).pipe(delay(650));
    return this.httpClient.get<ITournament>(`${this.url}/${tmid}`);
  }

  public downloadFile(tmid: string) {
    return this.httpClient.get(`${this.url}/download/${tmid}`);
  }
}
