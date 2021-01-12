import { Scheda } from './scheda';
import { Utente } from './utente';
import { SchedaEstrazione, UtenteSchedaEstrazione } from './numero-scheda';

export class UtenteScheda {
    public utente: Utente;
    public schede: Scheda[];

    constructor(utente: Utente, schede?: Scheda[]) {
        this.utente = utente;
        this.schede = [];

        if (schede) {
            this.schede = schede;
        }
    }
    
    public addScheda(scheda: Scheda) {
        this.schede.push(scheda);
    }

    public checkAndAddEstratto(estrazione: number): UtenteSchedaEstrazione {
        const schedeEstrazioni: SchedaEstrazione[] = [];
        this.schede.forEach((scheda) => {
            const estratti = scheda.checkAndAddEstratto(estrazione);
            if(estratti &&  estratti.length > 0) {
               schedeEstrazioni.push(new SchedaEstrazione(scheda, estratti)); 
            }
        })

        return new UtenteSchedaEstrazione(this.utente, schedeEstrazioni);
    }

}