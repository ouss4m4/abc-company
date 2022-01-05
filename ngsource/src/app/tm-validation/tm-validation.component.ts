import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ITournament } from '../types/tournament';

@Component({
  selector: 'app-tm-validation',
  templateUrl: './tm-validation.component.html',
  styleUrls: ['./tm-validation.component.scss'],
})
export class TmValidationComponent implements OnInit {
  public tmid: string | null;
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {
    this.tmid = this.route.snapshot.paramMap.get('id');
  }
  public dataLoaded = false;
  public tournamentData: ITournament | null = null;
  ngOnInit(): void {
    if (this.tmid !== null) {
      this.api.getTournamentDetails(this.tmid).subscribe((res) => {
        console.log('tournament data', res);
        this.tournamentData = res;
        this.dataLoaded = true;
      });
    }
  }
}
