import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marca } from '../models/marca.model';


@Injectable({
  providedIn: 'root'
})

export class MarcaService {
  private baseUrl = 'http://localhost:8080/cores';

  constructor(private httpClient: HttpClient) { }

  findAll(page?: number, pageSize?: number): Observable<Marca[]> {
    // variavel de escopo de bloco
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }

    return this.httpClient.get<Marca[]>(`${this.baseUrl}`, {params});
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: string): Observable<Marca> {
    return this.httpClient.get<Marca>(`${this.baseUrl}/${id}`);
  }

  insert(marca: Marca): Observable<Marca> {
    return this.httpClient.post<Marca>(this.baseUrl, marca);
  }
  
  update(marca: Marca): Observable<Marca> {
    return this.httpClient.put<Marca>(`${this.baseUrl}/${marca.id}`, marca);
  }

  delete(marca: Marca): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${marca.id}`);
  }

}
