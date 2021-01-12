import { Estrazione } from './estrazione.enum';
import { NumeroScheda, SchedaRigaEstrazione } from './numero-scheda';

export class Scheda {

    public numero: number;
    public composizione: NumeroScheda[][];
    
    public estrazione: Estrazione[];
    
    constructor(numero: number, composizione: NumeroScheda[][]) {
        this.numero = numero;
        this.composizione = composizione;
        this.estrazione = [Estrazione.none, Estrazione.none, Estrazione.none];
    }

    public checkAndAddEstratto(estrazione: number): SchedaRigaEstrazione[] {
        const composizioneEstrazione: SchedaRigaEstrazione[] = [];
        
        this.composizione.forEach((riga, index) => {
            var isEstratto = false;
            riga.forEach((item) => {

                if (item.numero <= 0) {
                    return;
                }

                isEstratto = item.numero === estrazione;
                if (isEstratto) {
                    item.estratto = isEstratto;
                    return;
                }
            });
        
            const estratti = riga.filter((estratto) => estratto.estratto).map((estratto) => estratto.numero);
            if (estratti && estratti.length > 0) {
                const newEstrazione = Estrazione[Estrazione[estratti.length]];
                this.estrazione[index] = newEstrazione;
                composizioneEstrazione.push(new SchedaRigaEstrazione(newEstrazione, estratti));    
            }
        })

        return composizioneEstrazione;
    }
    
    public toString() {
        var rappresentazione = "Scheda numero: " + this.numero + "\n";
        this.composizione.forEach((riga) => {
            const rigaNumeri = riga.filter(p => p.numero > 0).map( p => (p.estratto ? "* " : "") + p.numero);
            rappresentazione += rigaNumeri + "\n";
        });

        return rappresentazione;
    }
}