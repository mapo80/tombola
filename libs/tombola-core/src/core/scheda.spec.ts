import { Scheda } from './scheda';

describe('Scheda', () => {
  var scheda: Scheda;

  beforeEach(async () => {
    scheda = new Scheda(0, []);
  });

  it('Scheda is created', () => {
    expect(scheda).toBeTruthy();
  });

  it('Scheda number is zero', () => {
    expect(scheda.numero).toEqual(0);
  });

  it('Scheda has no composition', () => {
    expect(scheda.composizione.length).toEqual(0);
  });

});
