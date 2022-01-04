import { Component, Input, OnInit } from '@angular/core';
import { ITournament } from '../types/tournament';

@Component({
  selector: 'app-tm-template',
  templateUrl: './tm-template.component.html',
  styleUrls: ['./tm-template.component.scss'],
})
export class TmTemplateComponent implements OnInit {
  @Input('tournament') tournament!: ITournament;
  constructor() {}

  ngOnInit(): void {}
}
