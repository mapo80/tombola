import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabelloneComponent } from './tabellone/tabellone.component';
import { SchedaTabelloneComponent } from './scheda-tabellone/scheda-tabellone.component';
import { NumeroSchedaTabelloneComponent } from './numero-scheda-tabellone/numero-scheda-tabellone.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TabelloneComponent, SchedaTabelloneComponent, NumeroSchedaTabelloneComponent],
  exports: [TabelloneComponent, SchedaTabelloneComponent]
})
export class TombolaUiModule {}
