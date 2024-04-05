import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PodDescartavel } from '../models/podDescartavel.model';

@Injectable({
  providedIn: 'root'
})
export class PodDescartavelService {
  private baseUrl = 'http://localhost:8080/podsRecarregaveis';

  constructor(private httpClient: HttpClient) {  }

  findAll(): Observable<PodDescartavel[]> {
    return this.httpClient.get<PodDescartavel[]>(this.baseUrl);
  }

  findById(id: string): Observable<PodDescartavel> {
    return this.httpClient.get<PodDescartavel>(`${this.baseUrl}/${id}`);
  }

  insert(podDescartavel: PodDescartavel): Observable<PodDescartavel> {
    const data = {
      nome: podDescartavel.nome,
      valor: podDescartavel.valor,
      descricao: podDescartavel.descricao,
      idSabor: podDescartavel.sabor.id,
      idPuff: podDescartavel.puff.id,
      idMarca: podDescartavel.marca.id
    }
    return this.httpClient.post<PodDescartavel>(this.baseUrl, data);
  }
  
  update(podDescartavel: PodDescartavel): Observable<PodDescartavel> {
    const data = {
      nome: podDescartavel.nome,
      valor: podDescartavel.valor,
      descricao: podDescartavel.descricao,
      idSabor: podDescartavel.sabor.id,
      idPuff: podDescartavel.puff.id,
      idMarca: podDescartavel.marca.id
    }
    return this.httpClient.put<PodDescartavel>(`${this.baseUrl}/${podDescartavel.id}`, data);
  }

  delete(podDescartavel: PodDescartavel): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${podDescartavel.id}`);
  }

}
