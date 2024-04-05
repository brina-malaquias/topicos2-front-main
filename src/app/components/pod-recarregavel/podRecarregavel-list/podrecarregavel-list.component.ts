import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { PodRecarregavel } from '../../../models/podRecarregavel.model';
import { PodRecarregavelService } from '../../../services/podRecarregavel.service';

@Component({
  selector: 'app-podrecarregavel-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
  , MatButtonModule, RouterModule],
  templateUrl: './podrecarregavel-list.component.html',
  styleUrl: './podrecarregavel-list.component.css'
})
export class PodRecarregavelListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'valor', 'descricao', 'cor', 'marca', 'acao'];
  podrecarregaveis: PodRecarregavel[] = [];

  constructor(private podrecarregavelService: PodRecarregavelService) {

  }

  ngOnInit(): void {
    this.podrecarregavelService.findAll().subscribe(data => {
      this.podrecarregaveis = data;
    })
  }

}
