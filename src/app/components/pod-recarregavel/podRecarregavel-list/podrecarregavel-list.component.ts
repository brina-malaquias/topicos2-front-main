import {Component, OnInit, ViewChild} from '@angular/core';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { PodRecarregavel } from '../../../models/podRecarregavel.model';
import { PodRecarregavelService } from '../../../services/podRecarregavel.service';
import {catchError, Observable, tap, throwError} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {PodDescartavelService} from "../../../services/podDescartavel.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-podrecarregavel-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
  , MatButtonModule, RouterModule],
  templateUrl: './podrecarregavel-list.component.html',
  styleUrl: './podrecarregavel-list.component.css'
})
export class PodRecarregavelListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'valor', 'descricao', 'cor', 'marca', 'acao'];
  podrecarregaveis: PodRecarregavel[] = [];

  totalRecords = 0;
  filtro: FormGroup;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private podRecarregavelService: PodRecarregavelService, public dialog:MatDialog, private formBuilder:FormBuilder) {
    this.filtro = formBuilder.group({
      nome: ['']
    })

  }

  ngOnInit(): void {
    this.carregarDadosPaginados();
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.carregarDadosPaginados())
      )
      .subscribe();

    this.carregarTotal();
  }

  carregarDadosPaginados() {

    if (this.filtro.value?.nome != '' || this.filtro.value?.ativo != null) {
      this.podRecarregavelService.findAll(this.paginator?.pageIndex ?? 0, this.paginator?.pageSize ?? 5)
        .pipe(
          tap(produtos => {
            this.podrecarregaveis = produtos
          }),
          catchError(err => {
            console.log("Erro carregando produtos");
            alert("Erro carregando produtos.");
            return throwError((() => err));
          })
        )
        .subscribe();
    } else {
      this.podRecarregavelService.findAll(this.paginator?.pageIndex ?? 0, this.paginator?.pageSize ?? 5)
        .pipe(
          tap(produtos => {this.podrecarregaveis = produtos
          }),
          catchError( err => {
            console.log("Erro carregando especies");
            alert("Erro carregando especies.");
            return throwError((() => err));
          })
        )
        .subscribe();
    }
  }

  carregarTotal() {
    if (this.filtro.value?.nome != '') {
      this.podRecarregavelService.count()
        .pipe(
          tap(count => this.totalRecords = count),
          catchError(err => {
            console.log("Erro carregando o total de produtos");
            alert("Erro carregando produtos.");
            return throwError((() => err));
          })
        )
        .subscribe()
    } else {
      this.podRecarregavelService.count()
        .pipe(
          tap(count => this.totalRecords = count),
          catchError( err => {
            console.log("Erro carregando o total de produtos");
            alert("Erro carregando produtos.");
            return throwError((() => err));
          })
        )
        .subscribe()
    }
  }

  aplicarFiltro() {
    this.carregarDadosPaginados();
    this.carregarTotal();
  }

  limparFiltro() {
    this.filtro = this.formBuilder.group({
      nome: [''],
      ativo: [null]
    })

    this.aplicarFiltro();
  }

  onEnterKey(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.aplicarFiltro();
    }
  }
}
