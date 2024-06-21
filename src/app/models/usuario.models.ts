import { Telefone } from "./telefone.model";
import {Endereco} from "./endereco.model";

export class Usuario {
    id!: number;
    nome!: string;
    idade!: string;
    email!: string;
    senha!: string;
    cpf!: string;
    telefone!: Telefone;
    enderecos!: Endereco[];
}
