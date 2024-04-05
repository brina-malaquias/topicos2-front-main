import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cor } from '../models/cor.model';


@Injectable({
  providedIn: 'root'
})

export class CorService {
  private baseUrl = 'http://localhost:8080/cores';

  constructor(private httpClient: HttpClient) { }

  findAll(page?: number, pageSize?: number): Observable<Cor[]> {
    // variavel de escopo de bloco
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }

    return this.httpClient.get<Cor[]>(`${this.baseUrl}`, {params});
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: string): Observable<Cor> {
    return this.httpClient.get<Cor>(`${this.baseUrl}/${id}`);
  }

  insert(cor: Cor): Observable<Cor> {
    return this.httpClient.post<Cor>(this.baseUrl, cor);
  }
  
  update(cor: Cor): Observable<Cor> {
    return this.httpClient.put<Cor>(`${this.baseUrl}/${cor.id}`, cor);
  }

  delete(cor: Cor): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${cor.id}`);
  }

}
