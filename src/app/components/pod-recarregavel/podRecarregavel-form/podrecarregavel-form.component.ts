import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Estado } from '../../../models/estado.model';
import { EstadoService } from '../../../services/estado.service';
import { PodRecarregavelService } from '../../../services/podRecarregavel.service';
import { PodRecarregavel } from '../../../models/podRecarregavel.model';
import { CorService } from '../../../services/cor.service';
import { MarcaService } from '../../../services/marca.service';
import { Cor } from '../../../models/cor.model';
import { Marca } from '../../../models/marca.model';

@Component({
  selector: 'app-podrecarregavel-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, 
    RouterModule, MatSelectModule],
  templateUrl: './podrecarregavel-form.component.html',
  styleUrl: './podrecarregavel-form.component.css'
})
export class PodRecarregavelFormComponent implements OnInit {

  formGroup: FormGroup;
  cores: Cor[] = [];
  marcas: Marca[] = [];

  constructor(private formBuilder: FormBuilder,
    private podrecarregavelService: PodRecarregavelService,
    private corService: CorService,
    private marcaService: MarcaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.formGroup = formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      valor: ['', Validators.required],
      descricao: ['', Validators.required],
      cor: [null],
      marca: [null]
    });
  }
  ngOnInit(): void {
    this.corService.findAll().subscribe(data => {
      this.cores = data;
      this.initializeForm();
    }),
    this.marcaService.findAll().subscribe(data => {
      this.marcas = data;
      this.initializeForm();
    });
  }

  initializeForm() {

    const podrecarregavel: PodRecarregavel = this.activatedRoute.snapshot.data['podrecarregavel'];

    // selecionando o estado
    const cor = this.cores
      .find(cor => cor.id === (podrecarregavel?.cor?.id || null));
    const marca = this.marcas
      .find(marca => marca.id === (podrecarregavel?.marca?.id || null));

    this.formGroup = this.formBuilder.group({
      id: [(podrecarregavel && podrecarregavel.id) ? podrecarregavel.id : null],
      nome: [(podrecarregavel && podrecarregavel.nome) ? podrecarregavel.nome : '', Validators.required],
      valor: [(podrecarregavel && podrecarregavel.valor) ? podrecarregavel.valor : '', Validators.required],
      descricao: [(podrecarregavel && podrecarregavel.descricao) ? podrecarregavel.descricao : '', Validators.required],
      cor: [cor],
      marca: [marca]
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const podrecarregavel = this.formGroup.value;
      if (podrecarregavel.id ==null) {
        this.podrecarregavelService.insert(podrecarregavel).subscribe({
          next: (podrecarregavelCadastrado) => {
            this.router.navigateByUrl('/podrecarregavels');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.podrecarregavelService.update(podrecarregavel).subscribe({
          next: (podrecarregavelAlterado) => {
            this.router.navigateByUrl('/podrecarregavels');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          }
        });
      }
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const podrecarregavel = this.formGroup.value;
      if (podrecarregavel.id != null) {
        this.podrecarregavelService.delete(podrecarregavel).subscribe({
          next: () => {
            this.router.navigateByUrl('/podrecarregavels');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

}
