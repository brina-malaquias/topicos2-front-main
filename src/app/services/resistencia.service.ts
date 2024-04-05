import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resistencia } from '../models/resistencia';


@Injectable({
  providedIn: 'root'
})

export class ResistenciaService {
  private baseUrl = 'http://localhost:8080/resistencias';

  constructor(private httpClient: HttpClient) { }

  findAll(page?: number, pageSize?: number): Observable<Resistencia[]> {
    // variavel de escopo de bloco
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }

    return this.httpClient.get<Resistencia[]>(`${this.baseUrl}`, {params});
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: string): Observable<Resistencia> {
    return this.httpClient.get<Resistencia>(`${this.baseUrl}/${id}`);
  }

  insert(resistencia: Resistencia): Observable<Resistencia> {
    return this.httpClient.post<Resistencia>(this.baseUrl, resistencia);
  }
  
  update(resistencia: Resistencia): Observable<Resistencia> {
    return this.httpClient.put<Resistencia>(`${this.baseUrl}/${resistencia.id}`, resistencia);
  }

  delete(resistencia: Resistencia): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${resistencia.id}`);
  }

}
