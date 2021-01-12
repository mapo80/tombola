import { threadId } from "worker_threads";
import { Utility } from '../lib/utility';

export class Utente {

    private _id: string;
    public get id(): string {
        return this._id;
    }
    public nome: string;

    constructor(nome: string) {
        this._id = Utility.createGuid();
        this.nome = nome;
    }

}