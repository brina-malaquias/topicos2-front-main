import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = 'http://localhost:8080/usuarios';

  constructor(private httpClient: HttpClient) {  }

  findAll(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.baseUrl);
  }

  findById(id: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.baseUrl}/${id}`);
  }

  insert(usuario: Usuario): Observable<Usuario> {
    const data = {
      nome: usuario.nome,
      idade: usuario.idade,
      email: usuario.email,
      senha: usuario.senha,
      cpf: usuario.cpf,
      idTelefone: usuario.telefone.id
    }
    return this.httpClient.post<Usuario>(this.baseUrl, data);
  }
  
  update(usuario: Usuario): Observable<Usuario> {
    const data = {
      nome: usuario.nome,
      idade: usuario.idade,
      email: usuario.email,
      senha: usuario.senha,
      cpf: usuario.cpf,
      idTelefone: usuario.telefone.id
    }
    return this.httpClient.put<Usuario>(`${this.baseUrl}/${usuario.id}`, data);
  }

  delete(usuario: Usuario): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${usuario.id}`);
  }

}
