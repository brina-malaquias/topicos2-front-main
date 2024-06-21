import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NicSalt } from '../models/nicSalt.model';
import {PodDescartavel} from "../models/podDescartavel.model";

@Injectable({
  providedIn: 'root'
})
export class NicSaltService {
  private baseUrl = 'http://localhost:8080/nicSalts';

  constructor(private httpClient: HttpClient) {  }

  findAll(pagina: number, tamanhoPagina: number): Observable<NicSalt[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.httpClient.get<NicSalt[]>(this.baseUrl);
  }

  findById(id: string): Observable<NicSalt> {
    return this.httpClient.get<NicSalt>(`${this.baseUrl}/${id}`);
  }

  insert(nicSalt: NicSalt): Observable<NicSalt> {
    const data = {
      nome: nicSalt.nome,
      valor: nicSalt.valor,
      descricao: nicSalt.descricao,
      listaSabor: [nicSalt.listaSabor[0].id],
      listaMarca: [nicSalt.listaMarca[0].id]
    }
    return this.httpClient.post<NicSalt>(this.baseUrl, data);
  }

  update(nicSalt: NicSalt): Observable<NicSalt> {
    const data = {
      nome: nicSalt.nome,
      valor: nicSalt.valor,
      descricao: nicSalt.descricao,
      idSabor: nicSalt.listaSabor[0].id,
      idMarca: nicSalt.listaMarca[0].id
    }
    return this.httpClient.put<NicSalt>(`${this.baseUrl}/${nicSalt.id}`, data);
  }

  delete(nicSalt: NicSalt): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${nicSalt.id}`);
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  uploadImagem(id: number, nomeImagem: string, imagem: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('id', id.toString());
    formData.append('nomeImagem', imagem.name);
    formData.append('imagem', imagem, imagem.name);

    return this.httpClient.patch<PodDescartavel>(`${this.baseUrl}/image/upload`, formData);
  }

  getUrlImagem(nomeImagem: string): string {
    return `${this.baseUrl}/image/download/${nomeImagem}`;
  }

}
