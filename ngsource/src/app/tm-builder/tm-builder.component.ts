import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ITournament } from '../types/tournament';

/*  details such as number of players, game streaming link, upload logo, select branding colors etc. */
@Component({
  selector: 'app-tm-builder',
  templateUrl: './tm-builder.component.html',
  styleUrls: ['./tm-builder.component.scss'],
})
export class TmBuilderComponent {
  constructor(private api: ApiService, private router: Router) {}
  public companyName = '';
  public tournamentName = '';
  public brandColor = '#ff4000';
  public accentColor = '#0D00C2';
  public imageSrc = '#';
  public players: number = 0;
  public streamLink = '#';
  public get previewData(): ITournament {
    return {
      name: this.companyName,
      brandColor: this.brandColor,
      accentColor: this.accentColor,
      logoLink: this.imageSrc,
      playersNumber: this.players,
      streamLink: this.streamLink,
      tournamentName: this.tournamentName,
    };
  }

  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      /* setup event before calling uploaded file */
      reader.onload = (e) => (this.imageSrc = reader.result as string);

      reader.readAsDataURL(file);
    }
  }

  createTournament() {
    const tmData: ITournament = this.previewData;
    tmData.logoLink = '/assets/images/pepsi-logo.png';
    this.api.createTournament(tmData).subscribe((res) => {
      this.router.navigate(['tournament', res.result._id]);
    });
  }
}
