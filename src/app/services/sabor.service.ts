import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sabor } from '../models/sabor.model';


@Injectable({
  providedIn: 'root'
})

export class SaborService {
  private baseUrl = 'http://localhost:8080/sabores';

  constructor(private httpClient: HttpClient) { }

  findAll(page?: number, pageSize?: number): Observable<Sabor[]> {
    // variavel de escopo de bloco
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }

    return this.httpClient.get<Sabor[]>(`${this.baseUrl}`, {params});
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: string): Observable<Sabor> {
    return this.httpClient.get<Sabor>(`${this.baseUrl}/${id}`);
  }

  insert(sabor: Sabor): Observable<Sabor> {
    return this.httpClient.post<Sabor>(this.baseUrl, sabor);
  }
  
  update(sabor: Sabor): Observable<Sabor> {
    return this.httpClient.put<Sabor>(`${this.baseUrl}/${sabor.id}`, sabor);
  }

  delete(sabor: Sabor): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${sabor.id}`);
  }

}
