import { Component } from '@angular/core';
import { ITournament } from './types/tournament';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public testTournament: ITournament = {
    name: 'Pepsi Co',
    brandColor: '#004892',
    accentColor: '#e40028',
    logoLink: '/assets/images/pepsi-logo.png',
    playersNumber: 24,
    streamLink: 'https://www.pepsi.com/',
    tournamentName: 'FIFA World Cup',
  };
}
