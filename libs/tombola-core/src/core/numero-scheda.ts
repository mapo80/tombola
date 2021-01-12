import { Estrazione } from "./estrazione.enum";
import { Utente } from './utente';
import { Scheda } from './scheda';

export class NumeroScheda {

    public numero: number;
    public estratto: boolean;

    constructor(numero: number) {
        this.numero = numero;
        this.estratto = false;
    }

}

export class SchedaRigaEstrazione {
    public estrazione: Estrazione;
    public composizioneEstrazione: number[];

    constructor(estrazione: Estrazione, composizioneEstrazione: number[]) {
        this.estrazione = estrazione;
        this.composizioneEstrazione = composizioneEstrazione;
    }
}

export class SchedaEstrazione {
    public scheda: Scheda;
    public estrazioni: SchedaRigaEstrazione[];

    constructor(scheda: Scheda, estrazioni: SchedaRigaEstrazione[]) {
        this.scheda = scheda;
        this.estrazioni = estrazioni;
    }
}

export class UtenteSchedaEstrazione {
    public utente: Utente;
    public schedeEstrazione: SchedaEstrazione[];

    constructor(utente: Utente, schedeEstrazione: SchedaEstrazione[]) {
        this.utente = utente;
        this.schedeEstrazione = schedeEstrazione
    }
}

export class PartitaUtenteSchedaEstrazione {
    public estratti: number[];
    public utentiSchedeEstrazioni: UtenteSchedaEstrazione[];

    constructor(estratti: number[], utentiSchedeEstrazioni: UtenteSchedaEstrazione[]) {
        this.estratti = estratti;
        this.utentiSchedeEstrazioni = utentiSchedeEstrazioni;
    }
}