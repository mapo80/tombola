import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SchedaTabelloneComponent } from '../scheda-tabellone/scheda-tabellone.component';

@Component({
  selector: 'tombola-tabellone',
  templateUrl: './tabellone.component.html',
  styleUrls: ['./tabellone.component.scss']
})
export class TabelloneComponent implements OnInit {

  /** Get handle on cmp tags in the template */
  @ViewChildren('schedeTabellone') 
  public schedeTabelloneItems: QueryList<SchedaTabelloneComponent>;

  private _estratti: number[];
  public get estratti(): number[] {
    return this._estratti;
  }

  private _schedeTabellone: number[];
  public get schedeTabellone(): number[] {
    return this._schedeTabellone;
  }

  constructor() { 
    this._estratti = [];
    this._schedeTabellone = [1, 2, 3, 4, 5, 6];
  }
  
  ngOnInit(): void {
  }

  public estraiNumero(estratto: number) {
    this._estratti.push(estratto);
    this.schedeTabelloneItems.forEach((item) => { item.updateEstrazione() });
  }
}
