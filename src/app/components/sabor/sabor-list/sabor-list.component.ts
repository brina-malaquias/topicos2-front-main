import { Component, OnInit } from '@angular/core';

import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Sabor } from '../../../models/sabor.model';
import { SaborService } from '../../../services/sabor.service';

@Component({
  selector: 'app-sabor-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
    , MatButtonModule, RouterModule, MatPaginatorModule],
  templateUrl: './sabor-list.component.html',
  styleUrl: './sabor-list.component.css'
})
export class SaborListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'sabor', 'acao'];
  sabores: Sabor[] = [];

  // variaveis de controle de paginacao
  totalRecords = 0;
  pageSize = 2;
  page = 0;

  constructor(private saborService: SaborService) {

  }

  ngOnInit(): void {
    this.saborService.findAll(this.page, this.pageSize).subscribe(data => {
      this.sabores = data;
      console.log(this.sabores);
    });

    this.saborService.count().subscribe(data => {
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
