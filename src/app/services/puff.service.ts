import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Puff } from '../models/puff.model';


@Injectable({
  providedIn: 'root'
})

export class PuffService {
  private baseUrl = 'http://localhost:8080/puffs';

  constructor(private httpClient: HttpClient) { }

  findAll(page?: number, pageSize?: number): Observable<Puff[]> {
    // variavel de escopo de bloco
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }

    return this.httpClient.get<Puff[]>(`${this.baseUrl}`, {params});
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: string): Observable<Puff> {
    return this.httpClient.get<Puff>(`${this.baseUrl}/${id}`);
  }

  insert(puff: Puff): Observable<Puff> {
    return this.httpClient.post<Puff>(this.baseUrl, puff);
  }
  
  update(puff: Puff): Observable<Puff> {
    return this.httpClient.put<Puff>(`${this.baseUrl}/${puff.id}`, puff);
  }

  delete(puff: Puff): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${puff.id}`);
  }

}
