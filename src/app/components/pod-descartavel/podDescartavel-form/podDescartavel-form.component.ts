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
import { PodDescartavelService } from '../../../services/podDescartavel.service';
import { PodDescartavel } from '../../../models/podDescartavel.model';
import { SaborService } from '../../../services/sabor.service';
import { MarcaService } from '../../../services/marca.service';
import { Marca } from '../../../models/marca.model';
import { PuffService } from '../../../services/puff.service';
import { Sabor } from '../../../models/sabor.model';
import { Puff } from '../../../models/puff.model';

@Component({
  selector: 'app-podDescartavel-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, 
    RouterModule, MatSelectModule],
  templateUrl: './podDescartavel-form.component.html',
  styleUrl: './podDescartavel-form.component.css'
})
export class PodDescartavelFormComponent implements OnInit {

  formGroup: FormGroup;
  sabores: Sabor[] = [];
  puffs: Puff[] = [];
  marcas: Marca[] = [];

  constructor(private formBuilder: FormBuilder,
    private podDescartavelService: PodDescartavelService,
    private saborService: SaborService,
    private puffService: PuffService,
    private marcaService: MarcaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.formGroup = formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      valor: ['', Validators.required],
      descricao: ['', Validators.required],
      sabor: [null],
      puff: [null],
      marca: [null]
    });
  }
  ngOnInit(): void {
    this.saborService.findAll().subscribe(data => {
      this.sabores = data;
      this.initializeForm();
    }),
    this.puffService.findAll().subscribe(data => {
      this.puffs = data;
      this.initializeForm();
    }),
    this.marcaService.findAll().subscribe(data => {
      this.marcas = data;
      this.initializeForm();
    });
  }

  initializeForm() {

    const podDescartavel: PodDescartavel = this.activatedRoute.snapshot.data['podDescartavel'];

    // selecionando o estado
    const sabor = this.sabores
      .find(sabor => sabor.id === (podDescartavel?.sabor?.id || null));
    const puff = this.puffs
      .find(puff => puff.id === (podDescartavel?.puff?.id || null));
    const marca = this.marcas
      .find(marca => marca.id === (podDescartavel?.marca?.id || null));

    this.formGroup = this.formBuilder.group({
      id: [(podDescartavel && podDescartavel.id) ? podDescartavel.id : null],
      nome: [(podDescartavel && podDescartavel.nome) ? podDescartavel.nome : '', Validators.required],
      valor: [(podDescartavel && podDescartavel.valor) ? podDescartavel.valor : '', Validators.required],
      descricao: [(podDescartavel && podDescartavel.descricao) ? podDescartavel.descricao : '', Validators.required],
      sabor: [sabor],
      puff: [puff],
      marca: [marca]
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const podDescartavel = this.formGroup.value;
      if (podDescartavel.id ==null) {
        this.podDescartavelService.insert(podDescartavel).subscribe({
          next: (podDescartavelCadastrado) => {
            this.router.navigateByUrl('/podDescartavels');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.podDescartavelService.update(podDescartavel).subscribe({
          next: (podDescartavelAlterado) => {
            this.router.navigateByUrl('/podDescartavels');
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
      const podDescartavel = this.formGroup.value;
      if (podDescartavel.id != null) {
        this.podDescartavelService.delete(podDescartavel).subscribe({
          next: () => {
            this.router.navigateByUrl('/podDescartavels');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

}