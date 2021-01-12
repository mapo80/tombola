import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedaTabelloneComponent } from './scheda-tabellone.component';

describe('SchedaTabelloneComponent', () => {
  let component: SchedaTabelloneComponent;
  let fixture: ComponentFixture<SchedaTabelloneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedaTabelloneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedaTabelloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
