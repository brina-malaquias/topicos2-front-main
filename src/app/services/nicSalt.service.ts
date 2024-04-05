import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NicSalt } from '../models/nicSalt.model';

@Injectable({
  providedIn: 'root'
})
export class NicSaltService {
  private baseUrl = 'http://localhost:8080/nicSalts';

  constructor(private httpClient: HttpClient) {  }

  findAll(): Observable<NicSalt[]> {
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
      idSabor: nicSalt.sabor.id,
      idMarca: nicSalt.marca.id
    }
    return this.httpClient.post<NicSalt>(this.baseUrl, data);
  }
  
  update(nicSalt: NicSalt): Observable<NicSalt> {
    const data = {
      nome: nicSalt.nome,
      valor: nicSalt.valor,
      descricao: nicSalt.descricao,
      idSabor: nicSalt.sabor.id,
      idMarca: nicSalt.marca.id
    }
    return this.httpClient.put<NicSalt>(`${this.baseUrl}/${nicSalt.id}`, data);
  }

  delete(nicSalt: NicSalt): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${nicSalt.id}`);
  }

}
