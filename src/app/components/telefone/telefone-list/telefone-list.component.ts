import { Component, OnInit } from '@angular/core';
import { Telefone } from '../../../models/telefone.model';
import { TelefoneService } from '../../../services/telefone.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-telefone-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
    , MatButtonModule, RouterModule, MatPaginatorModule],
  templateUrl: './telefone-list.component.html',
  styleUrl: './telefone-list.component.css'
})
export class telefoneListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'codigoArea', 'numero', 'acao'];
  telefones: Telefone[] = [];

  // variaveis de controle de paginacao
  totalRecords = 0;
  pageSize = 2;
  page = 0;

  constructor(private telefoneService: TelefoneService) {

  }

  ngOnInit(): void {
    this.telefoneService.findAll(this.page, this.pageSize).subscribe(data => {
      this.telefones = data;
      console.log(this.telefones);
    });

    this.telefoneService.count().subscribe(data => {
      this.totalRecords = data;
      console.log(this.totalRecords);
    });
  }
  // Método para paginar os resultados
  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

}
