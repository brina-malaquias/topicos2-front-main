import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Puff } from '../../../models/puff.model';
import { PuffService } from '../../../services/puff.service';

@Component({
  selector: 'app-puff-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
    , MatButtonModule, RouterModule, MatPaginatorModule],
  templateUrl: './puff-list.component.html',
  styleUrl: './puff-list.component.css'
})
export class PuffListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'quantidade', 'acao'];
  puffs: Puff[] = [];

  // variaveis de controle de paginacao
  totalRecords = 0;
  pageSize = 2;
  page = 0;

  constructor(private puffService: PuffService) {

  }

  ngOnInit(): void {
    this.puffService.findAll(this.page, this.pageSize).subscribe(data => {
      this.puffs = data;
      console.log(this.puffs);
    });

    this.puffService.count().subscribe(data => {
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
