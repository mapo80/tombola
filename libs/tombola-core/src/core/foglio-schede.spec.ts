import { FoglioSchede } from './foglio-schede';

describe('Foglio schede', () => {
  var foglio: FoglioSchede;

  beforeEach(async () => {
    foglio = new FoglioSchede();
  });

  it('Grid is solved', () => {
    const solved = foglio.solve();
    expect(solved).toBeTruthy();
  });
  it('Horizonal empty cells in row are all equal to 4', () => {
    const solved = foglio.solve();
    const cells = foglio.cells;

    for(var i = 0; i < cells.length; i++) {
      var sum = 0;
      var cols = cells[i].length;
      for(var j = 0; j < cols; j++) {
        sum += cells[i][j];
      }
      const countEmtpty = cols - sum;
      expect(countEmtpty).toEqual(4);
    }

  });

  it('Vertical empty cells in columns are right', () => {
    const solved = foglio.solve();
    const cells = foglio.cells;

    for(var i = 0; i < FoglioSchede.COLS; i++) {
      var sum = 0;
      for(var j = 0; j < FoglioSchede.ROWS; j++) {
        sum += cells[j][i];
      }
      const countEmtpty = FoglioSchede.ROWS - sum;
      expect(countEmtpty).toEqual(FoglioSchede.V_EMPTY_CELLS[i]);
    }

  });

  it('Schede created are 6', () => {
    foglio.generateSchede();
    const schede = foglio.schede;

    expect(schede.length).toBe(6);

  });

  it('Every scheda has 3 rows', () => {
    foglio.generateSchede();
    const schede = foglio.schede;
    for(var i = 0; i < schede.length; i++) {
      expect(schede[i].composizione.length).toBe(3);
    }
  });

  it('Every scheda has different numbers', () => {
    foglio.generateSchede();
    const schede = foglio.schede;
    for(var i = 0; i < schede.length; i++) {
      const hasDuplicates = new Set(schede[i].composizione).size !== schede[i].composizione.length; 
      expect(hasDuplicates).toBeFalsy();
    }
  });  

});
