import {Component, OnInit, ViewChild} from '@angular/core';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { PodDescartavel } from '../../../models/podDescartavel.model';
import { PodDescartavelService } from '../../../services/podDescartavel.service';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {CoilService} from "../../../services/coil.service";
import {MatDialog} from "@angular/material/dialog";
import {catchError, tap, throwError} from "rxjs";

@Component({
  selector: 'app-podDescartavel-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
  , MatButtonModule, RouterModule],
  templateUrl: './podDescartavel-list.component.html',
  styleUrl: './podDescartavel-list.component.css'
})
export class PodDescartavelListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'valor', 'descricao', 'sabor', 'puff', 'marca', 'acao'];
  podDescartaveis: PodDescartavel[] = [];


  totalRecords = 0;
  filtro: FormGroup;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private podDescartavelService: PodDescartavelService, public dialog:MatDialog, private formBuilder:FormBuilder) {
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
      this.podDescartavelService.findAll(this.paginator?.pageIndex ?? 0, this.paginator?.pageSize ?? 5)
        .pipe(
          tap(produtos => {
            this.podDescartaveis = produtos
          }),
          catchError(err => {
            console.log("Erro carregando produtos");
            alert("Erro carregando produtos.");
            return throwError((() => err));
          })
        )
        .subscribe();
    } else {
      this.podDescartavelService.findAll(this.paginator?.pageIndex ?? 0, this.paginator?.pageSize ?? 5)
        .pipe(
          tap(produtos => {this.podDescartaveis = produtos
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
      this.podDescartavelService.count()
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
      this.podDescartavelService.count()
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
