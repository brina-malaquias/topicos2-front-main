import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.models';
import {Perfil} from "../models/perfil.model";
import {Endereco} from "../models/endereco.model";

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


  findPerfis(): Observable<Perfil[]> {
    return this.httpClient.get<Perfil[]>(`${this.baseUrl}/usuarios/perfis`);
  }

  getPerfilUsuario(): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.baseUrl}/usuario-logado`);
  }

  savePublic(usuario: Usuario, endereco: Endereco): Observable<Usuario> {
    const enderecoDTO = {
      idMunicipio: endereco.municipio.id,
      bairro: endereco.bairro,
      logradouro: endereco.logradouro,
      numero: endereco.numero,
      complemento: endereco.complemento,
      cep: endereco.cep,
      principal: true
    }

    const usuarioDto = {
      nome: usuario.nome,
      email: usuario.email,
      cpf: usuario.cpf,
      senha: usuario.senha,
      enderecos: [enderecoDTO]
    }

    return this.httpClient.post<Usuario>(`${this.baseUrl}/usuarios`, usuarioDto);
  }

  getUsuarioLogado(): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.baseUrl}/usuario-logado`);
  }

}
