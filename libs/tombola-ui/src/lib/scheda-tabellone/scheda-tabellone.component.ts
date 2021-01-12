import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NumeroTombolone } from '../../model/numero-tombolone';
import { NumeroSchedaTabelloneComponent } from '../numero-scheda-tabellone/numero-scheda-tabellone.component';

@Component({
  selector: 'tombola-scheda-tabellone',
  templateUrl: './scheda-tabellone.component.html',
  styleUrls: ['./scheda-tabellone.component.scss']
})
export class SchedaTabelloneComponent implements OnInit {

  @Input()
  public number: number;
  @Input()
  public estratti: number[];

  private _numbers: NumeroTombolone[];
  public get numbers(): NumeroTombolone[] {
    return this._numbers;
  }

  constructor() {
  }

  ngOnInit(): void {
    this.createDatasource();    
  }

  public updateEstrazione() {
    for(const numero of this.numbers) {
      numero.isEstratto = this.isEstratto(numero.numero);
    }
  }

  private createDatasource() {
    this._numbers = [];

    const k = this.number % 2 === 0 ? 5 : 0;
    const padding = (Math.round(this.number / 2) - 1) * 30;
    for(var i = 0; i < 3; i++) {
      for(var j = 1; j <= 5; j++) {
        const numero = 10 * i + (j + k) + padding;
        const isEstratto = this.isEstratto(numero);
        this.numbers.push(new NumeroTombolone(numero, isEstratto));
      }
    }
  }

  private isEstratto(numero: number) {
    const filtered = this.estratti.filter(p => p === numero);
    return filtered && filtered.length > 0;
  }
}
