import { Component, OnInit } from '@angular/core';

import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Cor } from '../../../models/cor.model';
import { CorService } from '../../../services/cor.service';

@Component({
  selector: 'app-cor-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
    , MatButtonModule, RouterModule, MatPaginatorModule],
  templateUrl: './cor-list.component.html',
  styleUrl: './cor-list.component.css'
})
export class CorListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'cor', 'acao'];
  cores: Cor[] = [];

  // variaveis de controle de paginacao
  totalRecords = 0;
  pageSize = 2;
  page = 0;

  constructor(private corService: CorService) {

  }

  ngOnInit(): void {
    this.corService.findAll(this.page, this.pageSize).subscribe(data => {
      this.cores = data;
      console.log(this.cores);
    });

    this.corService.count().subscribe(data => {
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
