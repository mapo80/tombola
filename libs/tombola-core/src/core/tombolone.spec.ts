import { Tombolone } from './tombolone';
import { TestBed } from '@angular/core/testing';

describe('Tombolone', () => {
  var tombolone: Tombolone;

  beforeEach(async () => {
    tombolone = new Tombolone();
  });

  it('Sacco has 90 numbers', () => {
    expect(tombolone.sacco.length).toEqual(90);
  });

  it('Extracted number is >= 1 && <= 90', () => {
    const estrazione = tombolone.estrai();
    expect(estrazione).toBeGreaterThanOrEqual(1);
    expect(estrazione).toBeLessThanOrEqual(90);
  });

  it('Extracted numbers are 90', () => {
    for (var i = 0; i < 90; i++) {
        const estrazione = tombolone.estrai();
    }
    expect(tombolone.estrazioni.length).toEqual(90);
  });
  
  it('Numbers on array are equal to estrazioni array', () => {
    const estratti: number[] = [];
    for (var i = 0; i < 90; i++) {
        const estrazione = tombolone.estrai();
        estratti.push(estrazione);
    }
    expect(estratti).toEqual(tombolone.estrazioni);
  });


});
