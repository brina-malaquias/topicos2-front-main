import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coil } from '../models/coil.models';

@Injectable({
  providedIn: 'root'
})
export class CoilService {
  private baseUrl = 'http://localhost:8080/coils';

  constructor(private httpClient: HttpClient) {  }

  findAll(): Observable<Coil[]> {
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
      idResistencia: coil.resistencia.id,
      idMarca: coil.marca.id
    }
    return this.httpClient.post<Coil>(this.baseUrl, data);
  }
  
  update(coil: Coil): Observable<Coil> {
    const data = {
      nome: coil.nome,
      valor: coil.valor,
      descricao: coil.descricao,
      idResistencia: coil.resistencia.id,
      idMarca: coil.marca.id
    }
    return this.httpClient.put<Coil>(`${this.baseUrl}/${coil.id}`, data);
  }

  delete(coil: Coil): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${coil.id}`);
  }

}
