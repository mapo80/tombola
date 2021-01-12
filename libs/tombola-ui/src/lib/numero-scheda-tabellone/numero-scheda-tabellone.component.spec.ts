import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumeroSchedaTabelloneComponent } from './numero-scheda-tabellone.component';

describe('NumeroSchedaTabelloneComponent', () => {
  let component: NumeroSchedaTabelloneComponent;
  let fixture: ComponentFixture<NumeroSchedaTabelloneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumeroSchedaTabelloneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumeroSchedaTabelloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
