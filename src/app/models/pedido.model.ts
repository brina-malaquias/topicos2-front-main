import {Endereco} from "./endereco.model";
import {StatusCompra} from "./status-compra.model";
import {ItemCarrinho} from "./itemcarrinho.model";

export class Pedido {
  id!: number;
  data!: Date;
  dataPagamento!: Date;
  totalCompra!: number;
  enderecoCompra!: Endereco;
  statusCompra!: StatusCompra;
  itensCompra!: ItemCarrinho[];
}
