import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Telefone } from '../models/telefone.model';

@Injectable({
  providedIn: 'root'
})
export class TelefoneService {
  private baseUrl = 'http://localhost:8080/telefones';

  constructor(private httpClient: HttpClient) {  }

  findAll(page?: number, pageSize?: number): Observable<Telefone[]> {
    // variavel de escopo de bloco
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }

    return this.httpClient.get<Telefone[]>(`${this.baseUrl}`, {params});
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: string): Observable<Telefone> {
    return this.httpClient.get<Telefone>(`${this.baseUrl}/${id}`);
  }

  insert(telefone: Telefone): Observable<Telefone> {
    return this.httpClient.post<Telefone>(this.baseUrl, telefone);
  }
  
  update(telefone: Telefone): Observable<Telefone> {
    return this.httpClient.put<Telefone>(`${this.baseUrl}/${telefone.id}`, telefone);
  }

  delete(telefone: Telefone): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${telefone.id}`);
  }

}
