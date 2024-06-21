import { Cor } from "./cor.model";
import { Marca } from "./marca.model";


export class PodRecarregavel {
    id!: number;
    nome!: string;
    valor!: number;
    descricao!: string;
    listaCor!: Cor[];
    listaMarca!: Marca[];
    nomeImagem!: string;
}
