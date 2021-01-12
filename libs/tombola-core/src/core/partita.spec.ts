import { Estrazione } from './estrazione.enum';
import { FoglioSchede } from './foglio-schede';
import { Partita } from './partita';
import { Utente } from './utente';
import { UtenteScheda } from './utente-scheda';
import { from } from "linq-to-typescript"

describe('Partita', () => {

    var partita: Partita;

    beforeEach(async () => {
        partita = new Partita();
    });

    function testEstrazione(tipoEstrazione: Estrazione): number[] {
        const utente = new Utente("Matteo");
        const foglioSchede = new FoglioSchede();
        foglioSchede.generateSchede();

        partita.addUtente(utente, foglioSchede.schede);

        var estratti: number[] = [];
        var hasEstrazione = false;
        while (!hasEstrazione) {
            const estrazione = partita.estrai();

            const estrazioni = estrazione.utentiSchedeEstrazioni
            .map(p => {

                const schede = p.schedeEstrazione
                                .reduce((accumulator, currentValue ) => accumulator.concat(currentValue),[])
                                .filter(scheda => scheda.estrazioni
                                                .filter( k => k.estrazione === tipoEstrazione)
                                                .length > 0);

                p.schedeEstrazione = schede;

                return p
            });                                         
            
            hasEstrazione = estrazioni
                            .map(p => p.schedeEstrazione)
                            .reduce((accumulator, currentValue ) => accumulator.concat(currentValue),[])
                            .length > 0;

            if (hasEstrazione) {
                var output = "Estrazione " + Estrazione[tipoEstrazione] + " dopo "+ estrazione.estratti.length + " estrazioni\n";
                estrazioni.forEach(utente => {
                    output += "Utente: " + utente.utente.nome + "\n";
                    utente.schedeEstrazione.forEach(scheda => {
                        estratti.push(...scheda.estrazioni.map(p => p.estrazione).filter(p => p === tipoEstrazione));
                        output += scheda.scheda.toString() + "\n";
                    });
                });
                console.log(output);
            }

        }

        return estratti;
    }

    it('Partita has no utenti', () => {
        expect(partita.utenti.length).toEqual(0);
    });

    it('Partita has one utente', () => {
        const utente = new Utente("Matteo");
        const utenteScheda = new UtenteScheda(utente);

        const foglioSchede = new FoglioSchede();
        foglioSchede.generateSchede();

        partita.addUtente(utente, [foglioSchede.schede[0]]);
        expect(partita.utenti.length).toEqual(1);
    });

    it('Partita has estratto', () => {
        const tipoEstrazione = Estrazione.estratto;
        const estratti: number[] = testEstrazione(tipoEstrazione);
        estratti.forEach(estratto => {
            expect(estratto).toEqual(tipoEstrazione);
        })
    });

    it('Partita has ambo', () => {
        const tipoEstrazione = Estrazione.ambo;
        const estratti: number[] = testEstrazione(tipoEstrazione);
        estratti.forEach(estratto => {
            expect(estratto).toEqual(tipoEstrazione);
        })
    });    
    it('Partita has terno', () => {
        const tipoEstrazione = Estrazione.terno;
        const estratti: number[] = testEstrazione(tipoEstrazione);
        estratti.forEach(estratto => {
            expect(estratto).toEqual(tipoEstrazione);
        })
    });    

    it('Partita has quaterna', () => {
        const tipoEstrazione = Estrazione.quaterna;
        const estratti: number[] = testEstrazione(tipoEstrazione);
        estratti.forEach(estratto => {
            expect(estratto).toEqual(tipoEstrazione);
        })
    });

    it('Partita has cinquina', () => {
        const tipoEstrazione = Estrazione.cinquina;
        const estratti: number[] = testEstrazione(tipoEstrazione);
        estratti.forEach(estratto => {
            expect(estratto).toEqual(tipoEstrazione);
        })
    }); 
    
    it('Partita has tombola', () => {
        const tipoEstrazione = Estrazione.tombola;
        const utente = new Utente("Matteo");
        const foglioSchede = new FoglioSchede();
        foglioSchede.generateSchede();

        partita.addUtente(utente, foglioSchede.schede);

        var estratti: number[] = [];
        var hasEstrazione = false;
        while (!hasEstrazione) {
            const estrazione = partita.estrai();
        
            const estrazioni = estrazione.utentiSchedeEstrazioni
            .map(p => {

                const schede = p.schedeEstrazione
                                .reduce((accumulator, currentValue ) => accumulator.concat(currentValue),[])
                                .filter(scheda => scheda.estrazioni
                                                .map (p => p.estrazione)
                                                .reduce((accumulator, currentValue) => accumulator + currentValue) === Estrazione.tombola);
                p.schedeEstrazione = schede;

                return p
            });

            hasEstrazione = estrazioni
                            .map(p => p.schedeEstrazione)
                            .reduce((accumulator, currentValue ) => accumulator.concat(currentValue),[])
                            .length > 0;

            if (hasEstrazione) {
                var output = "Tombola dopo "+ estrazione.estratti.length + " estrazioni\n";
                estrazioni.forEach(utente => {
                    output += "Utente: " + utente.utente.nome + "\n";
                    utente.schedeEstrazione.forEach(scheda => {
                        estratti.push(scheda.estrazioni.map(p => p.estrazione).reduce((accumulator, currentValue) => accumulator + currentValue));
                        output += scheda.scheda.toString() + "\n";
                    });
                });
                console.log(output);
            }
        }

        estratti.forEach(estratto => {
            expect(estratto).toEqual(tipoEstrazione);
        })
        
    });     
    it('Partita finished with premi won', () => {
        const fogli = 100;
        const foglioSchede = new FoglioSchede();
        foglioSchede.generateSchede(fogli);

        partita.addUtente(new Utente("Matteo"), foglioSchede.schede.slice(0, (fogli * 3 - 1)));
        partita.addUtente(new Utente("Mario"), foglioSchede.schede.slice(fogli * 3, fogli * 6 -1));
        // partita.addUtente(new Utente("Elisa"), [foglioSchede.schede[2]]);

        partita.start((premio, estratti) => {
            const estrazioni = premio.winnners;
            const tipoEstrazione = premio.estrazione;

            var output = "Estrazione " + Estrazione[tipoEstrazione] + " dopo " + estratti.length + " estrazioni\n";
            estrazioni.forEach(utente => {
                output += "Utente: " + utente.utente.nome + "\n";
                utente.schedeEstrazione.forEach(scheda => {
                    output += scheda.scheda.toString() + "\n";
                });
            });
            console.log(output);
        }, 
        () => {
            console.log("Gioco terminato");
            expect(partita.premi.filter(p => !p.taken).length).toBe(0);
        });

    });
});