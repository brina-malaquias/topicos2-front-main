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
import { ResistenciaService } from '../../../services/resistencia.service';
import { Resistencia } from '../../../models/resistencia.model';

@Component({
  selector: 'app-resistencia-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule],
  templateUrl: './resistencia-form.component.html',
  styleUrl: './resistencia-form.component.css'
})
export class ResistenciaFormComponent {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private resistenciaService: ResistenciaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    const resistencia: Resistencia = activatedRoute.snapshot.data['resistencia'];

    this.formGroup = formBuilder.group({
      id: [(resistencia && resistencia.id) ? resistencia.id : null],
      nome: [(resistencia && resistencia.quantidade) ? resistencia.quantidade : '', 
            Validators.compose([Validators.required, 
                                Validators.minLength(1)])]
    });

  }

  salvar() {
    // resistencia todos os campos do formulario como 'touched'
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const resistencia = this.formGroup.value;

      // operacao obtem o retorno de um observable de insert ou update
      const operacao = resistencia.id == null
      ? this.resistenciaService.insert(resistencia)
      : this.resistenciaService.update(resistencia);

      // realiza a operacao e trata a resposta.
      operacao.subscribe({
        next: () => this.router.navigateByUrl('/resistencias'),
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
      const resistencia = this.formGroup.value;
      if (resistencia.id != null) {
        this.resistenciaService.delete(resistencia).subscribe({
          next: () => {
            this.router.navigateByUrl('/resistencia');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

  errorMessages: {[controlName: string]: {[errorName: string] : string}} = {
    resistencia: {
      required: 'A resistencia deve ser informado.',
      minlength: 'A resistencia deve possuir ao menos 1 caracteres.'
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
