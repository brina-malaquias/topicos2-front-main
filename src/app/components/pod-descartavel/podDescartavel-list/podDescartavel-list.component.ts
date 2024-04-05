import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { PodDescartavel } from '../../../models/podDescartavel.model';
import { PodDescartavelService } from '../../../services/podDescartavel.service';

@Component({
  selector: 'app-podDescartavel-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
  , MatButtonModule, RouterModule],
  templateUrl: './podDescartavel-list.component.html',
  styleUrl: './podDescartavel-list.component.css'
})
export class PodDescartavelListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'valor', 'descricao', 'sabor', 'puff', 'marca', 'acao'];
  podDescartaveis: PodDescartavel[] = [];

  constructor(private podDescartavelService: PodDescartavelService) {

  }

  ngOnInit(): void {
    this.podDescartavelService.findAll().subscribe(data => {
      this.podDescartaveis = data;
    })
  }

}
