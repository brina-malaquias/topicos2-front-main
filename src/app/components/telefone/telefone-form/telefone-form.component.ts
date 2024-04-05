import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TelefoneService } from '../../../services/telefone.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Telefone } from '../../../models/telefone.model';
import { EmptyError, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-telefone-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule],
  templateUrl: './telefone-form.component.html',
  styleUrl: './telefone-form.component.css'
})
export class TelefoneFormComponent {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private telefoneService: TelefoneService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    const telefone: Telefone = activatedRoute.snapshot.data['telefone'];

    this.formGroup = formBuilder.group({
      id: [(telefone && telefone.id) ? telefone.id : null],
      codigoArea: [(telefone && telefone.codigoArea) ? telefone.codigoArea : '', 
            Validators.compose([Validators.required, 
                                Validators.maxLength(3)])],
      numero: [(telefone && telefone.numero) ? telefone.numero : '', 
            Validators.compose([Validators.required,
                                Validators.minLength(2)])]
    });

  }

  salvar() {
    // marca todos os campos do formulario como 'touched'
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const telefone = this.formGroup.value;

      // operacao obtem o retorno de um observable de insert ou update
      const operacao = telefone.id == null
      ? this.telefoneService.insert(telefone)
      : this.telefoneService.update(telefone);

      // realiza a operacao e trata a resposta.
      operacao.subscribe({
        next: () => this.router.navigateByUrl('/telefones'),
        error: (error: HttpErrorResponse) => {
          console.log('Erro ao salvar' + JSON.stringify(error));
          this.tratarErros(error);
        }
      });
    }
  }

  tratarErros(error: HttpErrorResponse) {
    if (error.status === 400) {
      // erros relacionados a campos
      if (error.error?.errors) {
        error.error.errors.forEach((validationError: any) => {
          // obs: o fieldName tem o mesmo valor da api
          const formControl = this.formGroup.get(validationError.fieldName);
          console.log(validationError);
          if (formControl) {
            console.log(formControl);
            formControl.setErrors({ apiError: validationError.message });
          }
        });
      };
    } else if (error.status < 400) {
        // Erro genérico não relacionado a um campo específico.
        alert(error.error?.message || 'Erro genérico no envio do formulário.');
    } else if (error.status >= 500) {
        alert('Erro interno do servidor. Por favor, tente novamente mais tarde.');
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const telefone = this.formGroup.value;
      if (telefone.id != null) {
        this.telefoneService.delete(telefone).subscribe({
          next: () => {
            this.router.navigateByUrl('/telefones');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

  errorMessages: {[controlName: string]: {[errorName: string] : string}} = {
    codigoArea: {
      required: 'O codigoArea deve ser informado.',
      maxlength: 'O codigoArea deve possuir ao menos 3 caracteres.'
    },
    numero: {
      required: 'O numero deve ser informada.',
      minlength: 'O numero deve possuir 2 caracteres.',
      maxlength: 'O numero deve possuir 2 caracteres.',
      apiError: ' ' // mensagem da api
    }
  }

  getErrorMessage(controlName: string, errors: ValidationErrors | null | undefined): string {
    if (!errors) {
      return '';
    }
    // retorna a mensagem de erro
    for (const errorName in errors) {
      if (errors.hasOwnProperty(errorName) && 
          this.errorMessages[controlName][errorName]) {
            return this.errorMessages[controlName][errorName];
      }
    }

    return 'Erro não mapeado (entre em contato com o desenvolvedor)';
  }

}
