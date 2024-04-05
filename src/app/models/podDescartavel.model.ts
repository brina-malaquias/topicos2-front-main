import { Marca } from "./marca.model";
import { Puff } from "./puff.model";
import { Sabor } from "./sabor.model";


export class PodDescartavel {
    id!: number;
    nome!: string;
    valor!: number;
    descricao!: string;
    sabor!: Sabor;
    puff!: Puff;
    marca!: Marca;
}