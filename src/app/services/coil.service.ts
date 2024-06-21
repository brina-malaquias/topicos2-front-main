import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coil } from '../models/coil.models';
import {PodDescartavel} from "../models/podDescartavel.model";

@Injectable({
  providedIn: 'root'
})
export class CoilService {
  private baseUrl = 'http://localhost:8080/coils';

  constructor(private httpClient: HttpClient) {  }

  findAll(pagina: number, tamanhoPagina: number): Observable<Coil[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.httpClient.get<Coil[]>(this.baseUrl);
  }

  findById(id: string): Observable<Coil> {
    return this.httpClient.get<Coil>(`${this.baseUrl}/${id}`);
  }

  insert(coil: Coil): Observable<Coil> {
    const data = {
      nome: coil.nome,
      valor: coil.valor,
      descricao: coil.descricao,
      listaResistencia: [coil.listaResistencia[0].id],
      listaMarca: [coil.listaMarca[0].id]
    }
    return this.httpClient.post<Coil>(this.baseUrl, data);
  }

  update(coil: Coil): Observable<Coil> {
    const data = {
      nome: coil.nome,
      valor: coil.valor,
      descricao: coil.descricao,
      idResistencia: [coil.listaResistencia[0].id],
      idMarca: [coil.listaMarca[0].id]
    }
    return this.httpClient.put<Coil>(`${this.baseUrl}/${coil.id}`, data);
  }

  delete(coil: Coil): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${coil.id}`);
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
