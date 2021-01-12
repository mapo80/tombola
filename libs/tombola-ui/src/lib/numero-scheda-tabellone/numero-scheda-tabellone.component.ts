import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tombola-numero-scheda-tabellone',
  templateUrl: './numero-scheda-tabellone.component.html',
  styleUrls: ['./numero-scheda-tabellone.component.scss']
})
export class NumeroSchedaTabelloneComponent implements OnInit {

  @Input()
  public numero: number;
  @Input()
  public isEstratto: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
