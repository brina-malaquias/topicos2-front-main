import { Marca } from "./marca.model";
import { Sabor } from "./sabor.model";


export class NicSalt {
    id!: number;
    nome!: string;
    valor!: number;
    descricao!: string;
    sabor!: Sabor;
    marca!: Marca;
}