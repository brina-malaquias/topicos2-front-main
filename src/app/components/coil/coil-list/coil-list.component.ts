import {Component, OnInit, ViewChild} from '@angular/core';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CoilService } from '../../../services/coil.service';
import { Coil } from '../../../models/coil.models';
import {MatPaginator} from "@angular/material/paginator";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {catchError, tap, throwError} from "rxjs";

@Component({
  selector: 'app-coil-list',
  standalone: true,
    imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
        , MatButtonModule, RouterModule, MatPaginator],
  templateUrl: './coil-list.component.html',
  styleUrl: './coil-list.component.css'
})
export class CoilListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'valor', 'descricao', 'resistencia', 'marca', 'acao'];
  coils: Coil[] = [];

  totalRecords = 0;
  filtro: FormGroup;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private coilService: CoilService, public dialog:MatDialog, private formBuilder:FormBuilder) {
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
      this.coilService.findAll(this.paginator?.pageIndex ?? 0, this.paginator?.pageSize ?? 5)
        .pipe(
          tap(produtos => {
            this.coils = produtos
          }),
          catchError(err => {
            console.log("Erro carregando produtos");
            alert("Erro carregando produtos.");
            return throwError((() => err));
          })
        )
        .subscribe();
    } else {
      this.coilService.findAll(this.paginator?.pageIndex ?? 0, this.paginator?.pageSize ?? 5)
        .pipe(
          tap(produtos => {this.coils = produtos
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
      this.coilService.count()
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
      this.coilService.count()
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
