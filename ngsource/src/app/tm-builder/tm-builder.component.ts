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
  public companyName = 'Pepsi Co';
  public tournamentName = 'FIFA World Cup';
  public brandColor = '#0D00C2';
  public accentColor = '#ff4000';
  public imageSrc = '#';
  public imgFile: any;
  public playersNumber: number = 0;
  public streamLink = '#';
  public get previewData(): ITournament {
    return {
      name: this.companyName,
      brandColor: this.brandColor,
      accentColor: this.accentColor,
      logoLink: this.imageSrc,
      playersNumber: this.playersNumber,
      streamLink: this.streamLink,
      tournamentName: this.tournamentName,
    };
  }

  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.imgFile = file;
      const reader = new FileReader();
      /* setup event before calling uploaded file */
      reader.onload = (e) => (this.imageSrc = reader.result as string);

      reader.readAsDataURL(file);
    }
  }

  createTournament() {
    const form = new FormData();
    form.append('image', this.imgFile);
    form.append('name', this.companyName);
    form.append('tournamentName', this.tournamentName);
    form.append('brandColor', this.brandColor);
    form.append('accentColor', this.accentColor);
    form.append('playersNumber', this.playersNumber.toString());
    form.append('streamLink', this.streamLink);

    // const tmData: ITournament = this.previewData;
    // tmData.logoLink = '/assets/images/pepsi-logo.png';
    this.api.createTournament(form).subscribe((res) => {
      this.router.navigate(['tournament', res.result._id]);
    }),
      console.log;
  }
}
