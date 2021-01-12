import { Utility } from '../lib/utility';

export class Tombolone {

    private static MAX_NUMBERS: number = 90;
    private _sacco: number[];
    private _estrazioni: number[];

    public get estrazioni() {
        return this._estrazioni;
    }
    public get sacco() {
        return this._sacco;
    }

    constructor() {
        this._estrazioni = [];
        this._sacco = Array.from({length: Tombolone.MAX_NUMBERS}, (_, index) => index + 1);
        this.shuffleSacco();
    }

    public estrai(): number {

        if (this._sacco && this._sacco.length <= 0) {
            throw new Error("Il sacco è vuoto, non si può procedere con l'estrazione");
        }

        const estrazione = this._sacco[0];
        /* Rimuovo l'estrazione dall'array */
        this._sacco.splice(0, 1);
        /**
         * Aggiungo l'estrazione nell'array degli estratti
         */
        this._estrazioni.push(estrazione);
        /**
         * Mescolo nuovamente l'array
         */
        this.shuffleSacco();

        return estrazione;
    }

    private shuffleSacco() {
        this._sacco = Utility.shuffleInPlace(this.sacco);
    }

}