import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PodRecarregavel } from '../models/podRecarregavel.model';

@Injectable({
  providedIn: 'root'
})
export class PodRecarregavelService {
  private baseUrl = 'http://localhost:8080/podsRecarregaveis';

  constructor(private httpClient: HttpClient) {  }

  findAll(): Observable<PodRecarregavel[]> {
    return this.httpClient.get<PodRecarregavel[]>(this.baseUrl);
  }

  findById(id: string): Observable<PodRecarregavel> {
    return this.httpClient.get<PodRecarregavel>(`${this.baseUrl}/${id}`);
  }

  insert(podrecarregavel: PodRecarregavel): Observable<PodRecarregavel> {
    const data = {
      nome: podrecarregavel.nome,
      valor: podrecarregavel.valor,
      descricao: podrecarregavel.descricao,
      idCor: podrecarregavel.cor.id,
      idMarca: podrecarregavel.marca.id
    }
    return this.httpClient.post<PodRecarregavel>(this.baseUrl, data);
  }
  
  update(podrecarregavel: PodRecarregavel): Observable<PodRecarregavel> {
    const data = {
      nome: podrecarregavel.nome,
      valor: podrecarregavel.valor,
      descricao: podrecarregavel.descricao,
      idCor: podrecarregavel.cor.id,
      idMarca: podrecarregavel.marca.id
    }
    return this.httpClient.put<PodRecarregavel>(`${this.baseUrl}/${podrecarregavel.id}`, data);
  }

  delete(podrecarregavel: PodRecarregavel): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${podrecarregavel.id}`);
  }

}
