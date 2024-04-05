import { Marca } from "./marca.model";
import { Resistencia } from "./resistencia";


export class Coil {
    id!: number;
    nome!: string;
    valor!: number;
    descricao!: string;
    resistencia!: Resistencia;
    marca!: Marca;
}