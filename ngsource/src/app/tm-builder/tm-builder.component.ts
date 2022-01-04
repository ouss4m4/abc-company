import { Component, OnInit } from '@angular/core';

/*  details such as number of players, game streaming link, upload logo, select branding colors etc. */
@Component({
  selector: 'app-tm-builder',
  templateUrl: './tm-builder.component.html',
  styleUrls: ['./tm-builder.component.scss'],
})
export class TmBuilderComponent implements OnInit {
  constructor() {}
  public mainColor = '#ff4000';
  public accentColor = '#0D00C2';
  public imageSrc = '/assets/images/logo.png';
  public players: number = 0;
  public streamLink = '#';

  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      /* setup event before calling uploaded file */
      reader.onload = (e) => (this.imageSrc = reader.result as string);

      reader.readAsDataURL(file);
    }
  }

  ngOnInit(): void {}
}
