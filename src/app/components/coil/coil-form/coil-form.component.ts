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
import { CoilService } from '../../../services/coil.service';
import { MarcaService } from '../../../services/marca.service';
import { Marca } from '../../../models/marca.model';
import { Resistencia } from '../../../models/resistencia';
import { Coil } from '../../../models/coil.models';
import { ResistenciaService } from '../../../services/resistencia.service';
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-coil-form',
  standalone: true,
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
        MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
        RouterModule, MatSelectModule, MatIcon],
  templateUrl: './coil-form.component.html',
  styleUrl: './coil-form.component.css'
})
export class CoilFormComponent implements OnInit {

  formGroup: FormGroup;
  resistencias: Resistencia[] = [];
  marcas: Marca[] = [];

  constructor(private formBuilder: FormBuilder,
    private coilService: CoilService,
    private resistenciaService: ResistenciaService,
    private marcaService: MarcaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.formGroup = formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      valor: ['', Validators.required],
      descricao: ['', Validators.required],
      listaResistencia: [null],
      listaMarca: [null]
    });
  }
  ngOnInit(): void {
    this.resistenciaService.findAll(0,20).subscribe(data => {
      this.resistencias = data;
      this.initializeForm();
    }),
    this.marcaService.findAll().subscribe(data => {
      this.marcas = data;
      this.initializeForm();
    });

    console.log(this.resistencias);
    console.log(this.marcas);
  }

  initializeForm() {

    const coil: Coil = this.activatedRoute.snapshot.data['coil'];

    // selecionando o estado
     const resistencia = this.resistencias
       .find(resistencia => resistencia.id === (coil?.listaResistencia[0]?.id || null));
     const marca = this.marcas
       .find(marca => marca.id === (coil?.listaMarca[0]?.id || null));

    this.formGroup = this.formBuilder.group({
      id: [(coil && coil.id) ? coil.id : null],
      nome: [(coil && coil.nome) ? coil.nome : '', Validators.required],
      valor: [(coil && coil.valor) ? coil.valor : '', Validators.required],
      descricao: [(coil && coil.descricao) ? coil.descricao : '', Validators.required],
      listaResistencia: [coil.listaResistencia],
      listaMarca: [coil.listaMarca]
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      this.formGroup.get("listaResistencia")?.setValue([this.formGroup.get("listaResistencia")?.value]);
      this.formGroup.get("listaMarca")?.setValue([this.formGroup.get("listaMarca")?.value]);
      const coil = this.formGroup.value;

      if (coil.id ==null) {
        this.coilService.insert(coil).subscribe({
          next: (coilCadastrado) => {
            this.router.navigateByUrl('/admin/coils');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.coilService.update(coil).subscribe({
          next: (coilAlterado) => {
            this.router.navigateByUrl('/admin/coils');
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
      const coil = this.formGroup.value;
      if (coil.id != null) {
        this.coilService.delete(coil).subscribe({
          next: () => {
            this.router.navigateByUrl('/admin/coils');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

  openImagePicker() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      console.log('File selected:', file);
    }
  }

}
