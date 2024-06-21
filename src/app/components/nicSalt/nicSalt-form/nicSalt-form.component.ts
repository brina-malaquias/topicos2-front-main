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
import { NicSaltService } from '../../../services/nicSalt.service';
import { NicSalt } from '../../../models/nicSalt.model';
import { SaborService } from '../../../services/sabor.service';
import { MarcaService } from '../../../services/marca.service';
import { Sabor } from '../../../models/sabor.model';
import { Marca } from '../../../models/marca.model';
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-nicSalt-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, MatSelectModule, MatIcon],
  templateUrl: './nicSalt-form.component.html',
  styleUrl: './nicSalt-form.component.css'
})
export class NicSaltFormComponent implements OnInit {

  formGroup: FormGroup;
  sabores: Sabor[] = [];
  marcas: Marca[] = [];

  constructor(private formBuilder: FormBuilder,
    private nicSaltService: NicSaltService,
    private saborService: SaborService,
    private marcaService: MarcaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.formGroup = formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      valor: ['', Validators.required],
      descricao: ['', Validators.required],
      listaSabor: [null],
      listaMarca: [null]
    });
  }
  ngOnInit(): void {
    this.saborService.findAll().subscribe(data => {
      this.sabores = data;
      this.initializeForm();
    }),
    this.marcaService.findAll().subscribe(data => {
      this.marcas = data;
      this.initializeForm();
    });
  }

  initializeForm() {

    const nicSalt: NicSalt = this.activatedRoute.snapshot.data['nicSalt'];

    // selecionando o estado
    const sabor = this.sabores
      .find(sabor => sabor.id === (nicSalt?.listaSabor[0]?.id || null));
    const marca = this.marcas
      .find(marca => marca.id === (nicSalt?.listaMarca[0]?.id || null));

    this.formGroup = this.formBuilder.group({
      id: [(nicSalt && nicSalt.id) ? nicSalt.id : null],
      nome: [(nicSalt && nicSalt.nome) ? nicSalt.nome : '', Validators.required],
      valor: [(nicSalt && nicSalt.valor) ? nicSalt.valor : '', Validators.required],
      descricao: [(nicSalt && nicSalt.descricao) ? nicSalt.descricao : '', Validators.required],
      listaSabor: [nicSalt.listaSabor],
      listaMarca: [nicSalt.listaMarca]
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      this.formGroup.get("listaSabor")?.setValue([this.formGroup.get("listaSabor")?.value]);
      this.formGroup.get("listaMarca")?.setValue([this.formGroup.get("listaMarca")?.value]);
      const nicSalt = this.formGroup.value;

      if (nicSalt.id ==null) {
        this.nicSaltService.insert(nicSalt).subscribe({
          next: (nicSaltCadastrado) => {
            this.router.navigateByUrl('/admin/nicsalts');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.nicSaltService.update(nicSalt).subscribe({
          next: (nicSaltAlterado) => {
            this.router.navigateByUrl('/admin/nicsalts');
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
      const nicSalt = this.formGroup.value;
      if (nicSalt.id != null) {
        this.nicSaltService.delete(nicSalt).subscribe({
          next: () => {
            this.router.navigateByUrl('/admin/nicsalts');
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
