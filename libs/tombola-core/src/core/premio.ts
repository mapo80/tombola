import { Estrazione } from "./estrazione.enum";
import { UtenteSchedaEstrazione } from "./numero-scheda";

export class Premio {
    public estrazione: Estrazione;
    public taken: boolean;
    private _winnners: UtenteSchedaEstrazione[];
    public get winnners(): UtenteSchedaEstrazione[] {
        return this._winnners;
    }

    constructor(estrazione: Estrazione, taken?: boolean, winnners?: UtenteSchedaEstrazione[]) {
        this.estrazione = estrazione;
        this.taken = taken || false;
        this._winnners = winnners || [];
    }

    public addWinners(winnners: UtenteSchedaEstrazione[]) {
        this._winnners = winnners;
    }
}