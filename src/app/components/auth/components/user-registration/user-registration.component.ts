import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {Estado} from "../../../../models/estado.model";
import {Cidade} from "../../../../models/cidade.model";
import {EstadoService} from "../../../../services/estado.service";
import {UsuarioService} from "../../../../services/usuario.service";
import {CidadeService} from "../../../../services/cidade.service";
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    ReactiveFormsModule

  ],
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})

export class UserRegistrationComponent implements OnInit {
  formGroup: FormGroup;
  formEndereco: FormGroup;
  estados: Estado[] = [];
  cidades: Cidade[] = [];
  maxDate = new Date();
  apiResponse: any = null;

  constructor(private formBuilder: FormBuilder, private estadoService: EstadoService,
              private cidadeService: CidadeService,
              private usuarioService: UsuarioService,
              private router: Router) {
    this.formGroup = this.formBuilder.group({
      id: null,
      nome: ['', Validators.required],
      email: ['', Validators.required],
      cpf: ['', Validators.required],
      senha: ['', Validators.required],
      confirmarSenha: ['', Validators.required],
    })

    this.formEndereco = this.formBuilder.group({
      id: null,
      cep: ['', Validators.required],
      bairro: ['', Validators.required],
      logradouro: ['', Validators.required],
      estado: [null, Validators.required],
      municipio: [null, Validators.required],
      numero: ['', Validators.required],
      complemento: ['']
    })
  }

  ngOnInit(): void {
    this.estadoService.findAll().subscribe(data => {
      this.estados = data;
      this.cidadeService.findAll().subscribe(data => {
        this.cidades = data;
        this.inicializeForm();
      })
    });
  }

  inicializeForm() {
    this.formGroup.get('confirmarSenha')?.valueChanges.subscribe(() => {
      this.validarConfirmacaoSenha();
    });
  }

  validarConfirmacaoSenha() {
    const senha = this.formGroup.get('senha')?.value;
    const confirmarSenha = this.formGroup.get('confirmarSenha')?.value;

    if (senha !== confirmarSenha) {
      this.formGroup.get('confirmarSenha')?.setErrors({ senhaNaoCorresponde: true });
    } else {
      this.formGroup.get('confirmarSenha')?.setErrors(null);
    }
  }

  getErrorMessage(fieldName: string): string {
    if (this.apiResponse && this.apiResponse.errors) {
      const error = this.apiResponse.errors.find((error: any) => error.fieldName === fieldName);
      return error ? error.message : '';
    } else {
      return '';
    }
  }

  salvar() {
    if (this.formGroup.valid && this.formEndereco.valid) {
      const usuarioNovo = this.formGroup.value;
      const endereco = this.formEndereco.value;

      this.usuarioService.savePublic(usuarioNovo, endereco).subscribe({
        next: (usuarioCadastrado) => {
          console.log(usuarioCadastrado);
          this.router.navigateByUrl('/auth/login');
        },
        error: (errorResponse) => {
          this.apiResponse = errorResponse.error;

          const formControls = ['nome', 'email', 'cpf', 'senha', 'cep', 'municipio', 'numero', 'complemento', 'bairro', 'logradouro'];
          formControls.forEach(controlName => {
            this.formGroup.get(controlName)?.setErrors(null);
          });



          if (this.apiResponse && this.apiResponse.errors) {
            console.log(this.apiResponse.errors)
            this.apiResponse.errors.forEach((error: { fieldName: any; message: any; }) => {
              const fieldName = error.fieldName;
              const errorMessage = error.message;

              if (formControls.includes(fieldName)) {
                this.formGroup.get(fieldName)?.setErrors({ apiError: errorMessage });
              }
            });
          }

          console.log('Erro ao cadastrar' + JSON.stringify(errorResponse));
        }
      })

      console.log(usuarioNovo);
    } else {

    }
  }

}
