import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ItemCarrinho } from '../../models/itemcarrinho.model';
import { CarrinhoService } from '../../services/carrinho.service';
import {Endereco} from "../../models/endereco.model";
import {Usuario} from "../../models/usuario.models";
import {FormBuilder, FormGroup, FormsModule, NgModel} from "@angular/forms";
import {Router} from "@angular/router";
import {CompraService} from "../../services/compra.service";
import {UsuarioService} from "../../services/usuario.service";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [NgFor, NgIf,
            MatCardModule,
            MatToolbarModule,
            FormsModule,
            MatIconModule,
            MatRadioButton,
            MatRadioGroup],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit {
  carrinhoItens: ItemCarrinho[] = [];
  enderecoCompraForm: FormGroup;
  total: number = 0;
  quantidadeTotal: number = 0;
  usuarioLogado: Usuario | undefined;
  enderecoSelecionado: Endereco | null = null;
  metodoPagamentoSelecionado: number | null = null;
  primeiroEnderecoPrincipal: Endereco | undefined;

  constructor(private carrinhoService: CarrinhoService,
  private router: Router,
  private formBuilder: FormBuilder,
  private compraService: CompraService,
  private usuarioService: UsuarioService) {
    this.enderecoCompraForm = this.formBuilder.group({
      logradouro: [''],
      numero: [null],
      complemento: [''],
      cep: [''],
      bairro: [''],
      idMunicipio: [null]
    })

    this.usuarioService.getPerfilUsuario().subscribe(data => {
      this.usuarioLogado = data;

      this.primeiroEnderecoPrincipal = this.usuarioLogado?.enderecos.find(endereco => endereco.principal);

      if (this.enderecoSelecionado === null && this.primeiroEnderecoPrincipal) {
        this.enderecoSelecionado = this.primeiroEnderecoPrincipal;
      }
    });

  }

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe( itens => {
      this.carrinhoItens = itens;
    })
  }

  calcularTotalItens(): number {
    return this.carrinhoItens.reduce((total, item) => total + item.quantidade, 0);
  }

  atualizarTotal(): void {
    this.total = this.calcularTotal();
    this.quantidadeTotal = this.calcularTotalItens();
  }

  removerItem(item: ItemCarrinho): void {
    this.carrinhoService.remover(item);
  }

  finalizarCompra(): void {

  }

  calcularTotal(): number {
    return 1;
  }

}
