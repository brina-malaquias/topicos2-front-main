import {Component, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardTitle } from '@angular/material/card';
import { NgFor } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {PodDescartavel} from "../../models/podDescartavel.model";
import {PodRecarregavel} from "../../models/podRecarregavel.model";
import {NicSalt} from "../../models/nicSalt.model";
import {Coil} from "../../models/coil.models";
import {PodDescartavelService} from "../../services/podDescartavel.service";
import {NicSaltService} from "../../services/nicSalt.service";
import {CoilService} from "../../services/coil.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CarrinhoService} from "../../services/carrinho.service";
import {PodRecarregavelService} from "../../services/podRecarregavel.service";
import {Router} from "@angular/router";

type Card = {
  id: number;
  titulo: string;
  preco: number;
  urlImagem: string;
  tipo: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCard, MatCardActions, MatCardContent, MatCardFooter,
            MatCardTitle, NgFor, MatButton, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  cards = signal<Card[]> ([]);
  podDescatarveis: PodDescartavel[] = [];
  podRecarregaveis: PodRecarregavel[] = [];
  nicSalts: NicSalt[] = [];
  coils: Coil[] = [];

  constructor(private podDescartavelService: PodDescartavelService,
              private podRecarregavelService: PodRecarregavelService,
              private nicsaltService: NicSaltService,
              private coilService: CoilService,
              private router: Router,
              private carrinhoService: CarrinhoService,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.carregarPodsDescartavel();
    this.carregarPodsRecarregavel();
    this.carregarNicSalts();
    this.carregarCoils();
  }

  carregarPodsDescartavel() {
    this.podDescartavelService.findAll(0, 10).subscribe(data => {
      this.podDescatarveis = data;
      this.carregarCards();
    });
  }

  carregarPodsRecarregavel() {
    this.podRecarregavelService.findAll(0, 10).subscribe(data => {
      this.podRecarregaveis = data;
      this.carregarCards();
    });
  }

  carregarNicSalts() {
    this.nicsaltService.findAll(0, 10).subscribe(data => {
      this.nicSalts = data;
      this.carregarCards();
    });
  }

  carregarCoils() {
    this.coilService.findAll(0, 10).subscribe(data => {
      this.coils = data;
      this.carregarCards();
    });
  }

  carregarCards() {
    const cards: Card[] = [];
    this.podDescatarveis.forEach(podDescartavel => {
      cards.push({
        id: podDescartavel.id,
        titulo: podDescartavel.nome,
        preco: podDescartavel.valor,
        urlImagem: this.podDescartavelService.getUrlImagem(podDescartavel.nomeImagem),
        tipo: "Pod Descartavel"
      });
    });

    this.podRecarregaveis.forEach(podRecarregavel => {
      cards.push({
        id: podRecarregavel.id,
        titulo: podRecarregavel.nome,
        preco: podRecarregavel.valor,
        urlImagem: this.podRecarregavelService.getUrlImagem(podRecarregavel.nomeImagem),
        tipo: "Pod Recarregavel"
      });
    });

    this.nicSalts.forEach(nicSalt => {
      cards.push({
        id: nicSalt.id,
        titulo: nicSalt.nome,
        preco: nicSalt.valor,
        urlImagem: this.podRecarregavelService.getUrlImagem(nicSalt.nomeImagem),
        tipo: "NicSalt"
      });
    });

    this.coils.forEach(coil => {
      cards.push({
        id: coil.id,
        titulo: coil.nome,
        preco: coil.valor,
        urlImagem: this.podRecarregavelService.getUrlImagem(coil.nomeImagem),
        tipo: "Coil"
      });
    });

    this.cards.set(cards);
  }

  adicionarAoCarrinho(card: Card) {
    this.showSnackbarTopPosition('Produto adicionado ao carrinho!', 'Fechar');
    this.carrinhoService.adicionar({
      id: card.id,
      nome: card.titulo,
      preco: card.preco,
      quantidade: 1,
      imagemProduto: ''
    })

  }

  showSnackbarTopPosition(content:any, action:any) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }

  showProduto(id: number) {
    this.router.navigateByUrl('/compras/show/'+id);
  }

}
