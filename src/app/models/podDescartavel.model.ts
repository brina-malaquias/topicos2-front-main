import { Marca } from "./marca.model";
import { Puff } from "./puff.model";
import { Sabor } from "./sabor.model";


export class PodDescartavel {
    id!: number;
    nome!: string;
    valor!: number;
    descricao!: string;
    listaSabor!: Sabor[];
    listaPuff!: Puff[];
    listaMarca!: Marca[];
    nomeImagem!: string;
}
