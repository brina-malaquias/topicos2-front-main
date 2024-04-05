import { Component, OnInit } from '@angular/core';

import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Marca } from '../../../models/marca.model';
import { MarcaService } from '../../../services/marca.service';

@Component({
  selector: 'app-marca-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
    , MatButtonModule, RouterModule, MatPaginatorModule],
  templateUrl: './marca-list.component.html',
  styleUrl: './marca-list.component.css'
})
export class MarcaListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'marca', 'acao'];
  marcas: Marca[] = [];

  // variaveis de controle de paginacao
  totalRemarcads = 0;
  pageSize = 2;
  page = 0;

  constructor(private marcaService: MarcaService) {

  }

  ngOnInit(): void {
    this.marcaService.findAll(this.page, this.pageSize).subscribe(data => {
      this.marcas = data;
      console.log(this.marcas);
    });

    this.marcaService.count().subscribe(data => {
      this.totalRemarcads = data;
      console.log(this.totalRemarcads);
    });
  }
  // Método para paginar os resultados
  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }


}
