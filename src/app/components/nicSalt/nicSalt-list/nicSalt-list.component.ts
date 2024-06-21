import {Component, OnInit, ViewChild} from '@angular/core';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { NicSalt } from '../../../models/nicSalt.model';
import { NicSaltService } from '../../../services/nicSalt.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CoilService} from "../../../services/coil.service";
import {MatDialog} from "@angular/material/dialog";
import {catchError, tap, throwError} from "rxjs";

@Component({
  selector: 'app-nicSalt-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
  , MatButtonModule, RouterModule, MatPaginatorModule],
  templateUrl: './nicSalt-list.component.html',
  styleUrl: './nicSalt-list.component.css'
})
export class NicSaltListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'valor', 'descricao', 'sabor', 'marca', 'acao'];
  nicSalts: NicSalt[] = [];

  totalRecords = 0;
  filtro: FormGroup;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private nicsaltService: NicSaltService, public dialog:MatDialog, private formBuilder:FormBuilder) {
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
      this.nicsaltService.findAll(this.paginator?.pageIndex ?? 0, this.paginator?.pageSize ?? 5)
        .pipe(
          tap(produtos => {
            this.nicSalts = produtos
          }),
          catchError(err => {
            console.log("Erro carregando produtos");
            alert("Erro carregando produtos.");
            return throwError((() => err));
          })
        )
        .subscribe();
    } else {
      this.nicsaltService.findAll(this.paginator?.pageIndex ?? 0, this.paginator?.pageSize ?? 5)
        .pipe(
          tap(produtos => {
            console.log(produtos);
            this.nicSalts = produtos;
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
      this.nicsaltService.count()
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
      this.nicsaltService.count()
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
