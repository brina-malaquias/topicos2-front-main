import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CoilService } from '../../../services/coil.service';
import { Coil } from '../../../models/coil.models';

@Component({
  selector: 'app-coil-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
  , MatButtonModule, RouterModule],
  templateUrl: './coil-list.component.html',
  styleUrl: './coil-list.component.css'
})
export class CoilListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'valor', 'descricao', 'resistencia', 'marca', 'acao'];
  coils: Coil[] = [];

  totalRecords = 0;
  pageSize = 2;
  page = 0;

  constructor(private coilService: CoilService) {

  }

  ngOnInit(): void {
    this.coilService.findAll().subscribe(data => {
      this.coils = data;
    })

    this.coilService.count().subscribe(data => {
      this.totalRecords = data;
      console.log(this.totalRecords);
    });

  }

}
