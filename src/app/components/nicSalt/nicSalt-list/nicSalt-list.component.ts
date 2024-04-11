import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { NicSalt } from '../../../models/nicSalt.model';
import { NicSaltService } from '../../../services/nicSalt.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-nicSalt-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
  , MatButtonModule, RouterModule],
  templateUrl: './nicSalt-list.component.html',
  styleUrl: './nicSalt-list.component.css'
})
export class NicSaltListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'valor', 'descricao', 'sabor', 'marca', 'acao'];
  nicSalts: NicSalt[] = [];

  totalRecords = 0;
  pageSize = 2;
  page = 0;

  constructor(private nicSaltService: NicSaltService) {

  }

  ngOnInit(): void {
    this.nicSaltService.findAll().subscribe(data => {
      this.nicSalts = data;
    })

    this.nicSaltService.count().subscribe(data => {
      this.totalRecords = data;
      console.log(this.totalRecords);
    });
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  
}
