import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Tombolone } from 'libs/tombola-core/src/core/tombolone';
import { TabelloneComponent } from 'libs/tombola-ui/src/lib/tabellone/tabellone.component';
@Component({
  selector: 'tombola-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'tombola';

  @ViewChild('tabellone', {static: true}) 
  public tabellone: TabelloneComponent;

  constructor() {

  }
  ngAfterViewInit(): void {
    const tombolone = new Tombolone();

    setInterval( () => {
      try {
        
        const estratto = tombolone.estrai();
        this.tabellone.estraiNumero(estratto);  

      } catch {
        
      }
    }, 500);
    
  }

  ngOnInit(): void {

  }



}
