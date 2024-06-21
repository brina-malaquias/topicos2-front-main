import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EstadoService } from '../../../services/estado.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Estado } from '../../../models/estado.model';
import { EmptyError, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Sabor } from '../../../models/sabor.model';
import { SaborService } from '../../../services/sabor.service';

@Component({
  selector: 'app-sabor-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule],
  templateUrl: './sabor-form.component.html',
  styleUrl: './sabor-form.component.css'
})
export class SaborFormComponent {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private saborService: SaborService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    const sabor: Sabor = activatedRoute.snapshot.data['sabor'];

    this.formGroup = formBuilder.group({
      id: [(sabor && sabor.id) ? sabor.id : null],
      sabor: [(sabor && sabor.sabor) ? sabor.sabor : '',
            Validators.compose([Validators.required,
                                Validators.minLength(3)])]
    });

  }

  salvar() {
    // marca todos os campos do formulario como 'touched'
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const sabor = this.formGroup.value;

      // operacao obtem o retorno de um observable de insert ou update
      const operacao = sabor.id == null
      ? this.saborService.insert(sabor)
      : this.saborService.update(sabor);

      // realiza a operacao e trata a resposta.
      operacao.subscribe({
        next: () => this.router.navigateByUrl('/admin/sabores'),
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
      const sabor = this.formGroup.value;
      if (sabor.id != null) {
        this.saborService.delete(sabor).subscribe({
          next: () => {
            this.router.navigateByUrl('/admin/sabores');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

  errorMessages: {[controlName: string]: {[errorName: string] : string}} = {
    sabor: {
      required: 'O sabor deve ser informado.',
      minlength: 'O sabor deve possuir ao menos 4 caracteres.'
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
