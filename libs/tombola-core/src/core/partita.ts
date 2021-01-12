import { Tombolone } from './tombolone';
import { UtenteScheda } from './utente-scheda';
import { Scheda } from './scheda';
import { Utente } from './utente';
import { PartitaUtenteSchedaEstrazione, SchedaEstrazione, UtenteSchedaEstrazione } from './numero-scheda';
import { Premio } from './premio';
import { Estrazione } from './estrazione.enum';

type PremioVincitaCallback = (Premio, Array) => void;
type PartitaEndedCallback = () => void;

export class Partita {

    
    private _tombolone: Tombolone;
    public get tombolone(): Tombolone {
        return this._tombolone;
    }
    private _utenti: UtenteScheda[];
    public get utenti(): UtenteScheda[] {
        return this._utenti;
    }

    private _premi: Premio[];
    public get premi(): Premio[] {
        return this._premi;
    }
    
    private currentPremio: Premio;

    constructor() {
        this._tombolone = new Tombolone();
        this._utenti = [];
        this._premi = this.addPremi();
        this.currentPremio = this.premi[0];
    }

    public addUtente(utente: Utente, schede: Scheda[]) {
        var user = this.utenti.find ((user) => user.utente.id === utente.id);
        if (user == null) {
            user = new UtenteScheda(utente);
        }

        schede.map ((scheda) => user.addScheda(scheda));

        this._utenti.push(user);
    }    

    public estrai(): PartitaUtenteSchedaEstrazione {
        const estratto = this.tombolone.estrai();
        const estrazioni = this.checkSchede(estratto);

        return new PartitaUtenteSchedaEstrazione(this.tombolone.estrazioni, estrazioni);
    }

    public start(premioVincitaCallback?: PremioVincitaCallback,
                 partitaEndCallback?: PartitaEndedCallback) {

        var isTombola = false;
        while (!isTombola) {

            const estrazione = this.estrai();
            const premioEstrazioni = this.checkPremio(estrazione);

            isTombola = this.premi.filter(p => !p.taken).length <= 0;
            if (premioEstrazioni && premioEstrazioni.taken && premioEstrazioni.winnners) {


                if (premioVincitaCallback) {
                    premioVincitaCallback(premioEstrazioni, estrazione.estratti);
                }
            }
        }
        if (partitaEndCallback) {
            partitaEndCallback();
        }
    }

    private checkSchede(estratto: number): UtenteSchedaEstrazione[] {
        const utentiSchede: UtenteSchedaEstrazione[] = [];
        this._utenti.forEach((utente) => {
            // console.time('utente.checkAndAddEstratto')
            const schede = utente.checkAndAddEstratto(estratto);
            // console.timeEnd('utente.checkAndAddEstratto')
            utentiSchede.push(schede);
        });

        return utentiSchede;
    }

    private addPremi(): Premio[] {
        const premi: Premio[] = []

        premi.push(new Premio(Estrazione.ambo));
        premi.push(new Premio(Estrazione.terno));
        premi.push(new Premio(Estrazione.quaterna));
        premi.push(new Premio(Estrazione.cinquina));
        premi.push(new Premio(Estrazione.tombola));

        return premi;
    }

    private checkPremio(estrazione: PartitaUtenteSchedaEstrazione) {

        var hasEstrazione = false;
        const current = this.currentPremio.estrazione;

        // console.time('estrazioni');

        const estrazioni = estrazione.utentiSchedeEstrazioni
            .map(p => {

                if (this.currentPremio.estrazione !== Estrazione.tombola) {
                    console.time('check ' + this.currentPremio.estrazione + "- " + p.utente.nome);
                    const schede = p.schedeEstrazione
                    .reduce<SchedaEstrazione[]>((accumulator, currentValue ) => accumulator.concat(currentValue),[])
                    // .filter(scheda => scheda.scheda.estrazione
                    //     .filter( k => k === this.currentPremio.estrazione)
                    //     .length > 0);                    
                    .filter(scheda => scheda.estrazioni
                                    .filter( k => k.estrazione === this.currentPremio.estrazione)
                                    .length > 0);

                    p.schedeEstrazione = schede;
                    console.timeEnd('check ' + this.currentPremio.estrazione + "- " + p.utente.nome);
                    return p
                }
                // console.time('check tombola');
                const schede = p.schedeEstrazione
                .reduce<SchedaEstrazione[]>((accumulator, currentValue ) => accumulator.concat(currentValue),[])
                // .filter(scheda => scheda.scheda.estrazione
                // .map (p => p.estrazioni)
                // .reduce((accumulator, currentValue) => accumulator + currentValue) === this.currentPremio.estrazione);
                .filter(scheda => scheda.estrazioni
                                .map (p => p.estrazione)
                                .reduce((accumulator, currentValue) => accumulator + currentValue) === this.currentPremio.estrazione);
                // console.timeEnd('check tombola');
                p.schedeEstrazione = schede;
                return p
            })
            .filter (p => p.schedeEstrazione.length > 0);                                      
        
        // console.timeEnd('estrazioni');


        // console.time('hasEstrazione');
        hasEstrazione = estrazioni
                        .map(p => p.schedeEstrazione)
                        .reduce((accumulator, currentValue ) => accumulator.concat(currentValue),[])
                        .length > 0;

        // console.timeEnd('hasEstrazione');

        if (hasEstrazione) {
            this.currentPremio.taken = true;
            this.currentPremio.addWinners(estrazioni);
            /**
             * Se il premio è stato vinto passo al premio successivo se non il corrente non è la tombola
             */
            this.currentPremio = this.currentPremio.estrazione === Estrazione.tombola ? null : this.premi[this.premi.findIndex(p => p.estrazione === this.currentPremio.estrazione) + 1];
        }

        return new Premio(current, hasEstrazione, estrazioni);
    }

}