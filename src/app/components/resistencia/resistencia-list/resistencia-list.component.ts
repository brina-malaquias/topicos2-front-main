import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ResistenciaService } from '../../../services/resistencia.service';
import { Resistencia } from '../../../models/resistencia';

@Component({
  selector: 'app-resistencia-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
    , MatButtonModule, RouterModule, MatPaginatorModule],
  templateUrl: './resistencia-list.component.html',
  styleUrl: './resistencia-list.component.css'
})
export class ResistenciaListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'ohms', 'acao'];
  resistencias: Resistencia[] = [];

  // variaveis de controle de paginacao
  totalRecords = 0;
  pageSize = 2;
  page = 0;

  constructor(private resistenciaService: ResistenciaService) {

  }

  ngOnInit(): void {
    this.resistenciaService.findAll(this.page, this.pageSize).subscribe(data => {
      this.resistencias = data;
      console.log(this.resistencias);
    });

    this.resistenciaService.count().subscribe(data => {
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
