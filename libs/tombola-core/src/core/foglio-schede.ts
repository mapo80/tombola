import { Scheda } from "./scheda";
import { Utility } from '../lib/utility';
import { Tombolone } from './tombolone';
import { NumeroScheda } from "./numero-scheda";

/**
 * Ogni foglio è composto da 6 schede fino a completare i 90 numeri
 * Ogni scheda è composta da 15 caselle, per ogni riga della scheda ci sono sempre 4 spazi
 */
export class FoglioSchede {

    public static ROWS = 18;
    public static COLS = 9;
    public static ROW_SCHEDE = 3;
    public static H_EMPTY_CELLS: number = 4;
    public static V_EMPTY_CELLS: number[] = [9, 8, 8, 8, 8, 8, 8, 8, 7];

    private _cells: number[][];
    private _schede: Scheda[];

    public get schede(): Scheda[] {
        return this._schede;
    }
    public get cells(): number[][] {
        return this._cells;
    }

    constructor() {
        this.initSchede();
        this.initGrid();
        this.randomizeGrid();
    }
    private initSchede() {
        this._schede = [];
    }
    
    public isSafe(row: number, col: number, num: number) {

        var rowCount = 0;
        for(var i = 0; i < FoglioSchede.COLS; i++) {
            const val = i == col ? num : this._cells[row][i];
            rowCount += val === 0 ? 1 : 0;
        }
        if (rowCount > FoglioSchede.H_EMPTY_CELLS) {
            return false;
        }

        if (rowCount < FoglioSchede.H_EMPTY_CELLS && 
            FoglioSchede.COLS - (1 + col) < FoglioSchede.H_EMPTY_CELLS - rowCount) {
            return false;
        }

        var colCount = 0;
        for(var i = 0; i < FoglioSchede.ROWS; i++) {
            const val = i == row ? num : this._cells[i][col];
            colCount += val === 0 ? 1 : 0;
        }

        if (colCount > FoglioSchede.V_EMPTY_CELLS[col]) {
            return false;
        }    

        return true;
    }

    public solve(): boolean {

        var row = -1;
        var col = -1;
        var isEmpty = true;

        for(var i = 0; i < FoglioSchede.ROWS; i++) {
            for (var j = 0; j < FoglioSchede.COLS; j++) {
                if (this._cells[i][j] === -1) {
                    row = i;
                    col = j;
 
                    isEmpty = false;
                    break;
                }
            }

            if (!isEmpty) {
                break;
            }            
        }

        /**
         * No more items
         */
        if (isEmpty) {
            return true;
        }

        for (var num = 0; num <= 1; num++) {
            if (this.isSafe(row, col, num)) {
                this._cells[row][col] = num;
                if (this.solve()) {
                    return true;
                } else {
                    this._cells[row][col] = -1;
                }
            }
        }
    
        return false;
    }

    public print() {
        var rows = "";
        for(var i = 0; i < FoglioSchede.ROWS; i++) {
            for (var j = 0; j < FoglioSchede.COLS; j++) {
                rows += this._cells[i][j];
            }
            rows += "\n";
        }

        console.log(rows);
    }

    public generateSchede(fogli: number = 1) {

        for(var n = 0; n < fogli; n++) {
            if (!this.solve()) {
                throw new Error("Attenzione c'è stato un errore in fase di generazione delle celle");
            }
    
            const sacco = this.fillSacco();
            const filledCells: number[][] = Object.assign([], this._cells);
            for (var j = 0; j < FoglioSchede.COLS; j++) {
                var i = 0;
                for(var k = 0; k < FoglioSchede.ROWS; k++){
                    if (filledCells[k][j] != 0) {
                        filledCells[k][j] = sacco[j][i];
                        i++;    
                    }
                }
            }
    
            const numeroSchede = FoglioSchede.ROWS / FoglioSchede.ROW_SCHEDE;
            var k = 0;
            for (var i = 0; i < numeroSchede; i++) {
                var composizione: NumeroScheda[][] = [];
                for (var j = 0; j < FoglioSchede.ROW_SCHEDE; j++) {
                    composizione.push(Object.assign([], filledCells[k].map ((numero) => new NumeroScheda(numero))));
                    k++;
                }
                const scheda = new Scheda((n * numeroSchede) + (i + 1), composizione);
                this._schede.push(scheda);
            }
        }
    }

    private fillSacco() {
        const tombolone = new Tombolone();
        const sacco = tombolone.sacco;
        const sortedSacco: number[][] = [];
        for (var j = 0; j < FoglioSchede.COLS; j++) {
            const newSacco = sacco.filter( estratto => estratto >= j * 10 && estratto <  (j + 1) * 10 || (j >= 8 && estratto == 90));
            sortedSacco[j] = newSacco;
        } 

        return sortedSacco;
    }

    private initGrid() {
        this._cells = [];
        for(var i = 0; i < FoglioSchede.ROWS; i++) {
            this._cells[i] = [];
            for (var j = 0; j < FoglioSchede.COLS; j++) {
                this._cells[i][j] = -1;
            }
        }
    }

    private randomizeGrid() {
        const arr = [];

        while(arr.length < 50) {
            const row = Utility.getRandomInt(0, FoglioSchede.ROWS - 1);
            const col = Utility.getRandomInt(0, FoglioSchede.COLS - 1);
            const key = row + "-" + col;
            if (arr.indexOf(key) < 0) {
                const val = Utility.getRandomInt(0, 1);
                if (this.isSafe(row, col, val)) {
                    this._cells[row][col] = val;
                    arr.push(row + "-" + col);    
                }
            }
        }

    }    
}