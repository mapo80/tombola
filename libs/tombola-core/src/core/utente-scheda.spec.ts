import { Utente } from './utente';
import { UtenteScheda } from './utente-scheda';
import { Scheda } from './scheda';
import { FoglioSchede } from './foglio-schede';

describe('Utente scheda', () => {

    var utenteScheda: UtenteScheda;
    var utente: Utente;
    var schede: Scheda[];

    beforeEach(async () => {
        utente = new Utente("Matteo");
        utenteScheda = new UtenteScheda(utente);

        const foglioSchede = new FoglioSchede();
        foglioSchede.generateSchede();
        schede = foglioSchede.schede;
    });

    it('Utente name is Matteo', () => {
        expect(utenteScheda.utente.nome).toEqual("Matteo");
    });

    it('Utente has one scheda', () => {
        var scheda = schede[0];
        utenteScheda.addScheda(scheda);
        expect(utenteScheda.schede.length).toEqual(1);
    });
    
    it('Utente is equal to the one generated', () => {
        var scheda = schede[0];
        utenteScheda.addScheda(scheda);
        expect(scheda).toEqual(utenteScheda.schede[0]);
    });      
});