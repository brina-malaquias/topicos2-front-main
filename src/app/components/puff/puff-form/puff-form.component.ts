import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EmptyError, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PuffService } from '../../../services/puff.service';
import { Puff } from '../../../models/puff.model';

@Component({
  selector: 'app-puff-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule],
  templateUrl: './puff-form.component.html',
  styleUrl: './puff-form.component.css'
})
export class PuffFormComponent {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private puffService: PuffService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    const puff: Puff = activatedRoute.snapshot.data['puff'];

    this.formGroup = formBuilder.group({
      id: [(puff && puff.id) ? puff.id : null],
      quantidade: [(puff && puff.quantidade) ? puff.quantidade : '',
            Validators.compose([Validators.required,
                                Validators.minLength(3)])]
    });

  }

  salvar() {
    // puff todos os campos do formulario como 'touched'
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const quantidade = this.formGroup.value;

      // operacao obtem o retorno de um observable de insert ou update
      const operacao = quantidade.id == null
      ? this.puffService.insert(quantidade)
      : this.puffService.update(quantidade);

      // realiza a operacao e trata a resposta.
      operacao.subscribe({
        next: () => this.router.navigateByUrl('/admin/puffs'),
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
      const puff = this.formGroup.value;
      if (puff.id != null) {
        this.puffService.delete(puff).subscribe({
          next: () => {
            this.router.navigateByUrl('/admin/puffs');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

  errorMessages: {[controlName: string]: {[errorName: string] : string}} = {
    puff: {
      required: 'O puff deve ser informado.',
      minlength: 'O puff deve possuir ao menos 3 caracteres.'
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
