import { Telefone } from "./telefone.model";

export class Usuario {
    id!: number;
    nome!: string;
    idade!: string;
    email!: string;
    senha!: string;
    cpf!: string;
    telefone!: Telefone;
}
