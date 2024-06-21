import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PodDescartavel } from '../models/podDescartavel.model';

@Injectable({
  providedIn: 'root'
})
export class PodDescartavelService {
  private baseUrl = 'http://localhost:8080/podsDescartaveis';

  constructor(private http: HttpClient) {  }

  findAll(pagina: number, tamanhoPagina: number): Observable<PodDescartavel[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<PodDescartavel[]>(`${this.baseUrl}`, {params});
  }

  findById(id: string): Observable<PodDescartavel> {
    return this.http.get<PodDescartavel>(`${this.baseUrl}/${id}`);
  }

  insert(podDescartavel: PodDescartavel): Observable<PodDescartavel> {
    const data = {
      nome: podDescartavel.nome,
      valor: podDescartavel.valor,
      descricao: podDescartavel.descricao,
      listaSabor: [podDescartavel.listaSabor[0].id],
      listaPuff: [podDescartavel.listaPuff[0].id],
      listaMarca: [podDescartavel.listaMarca[0].id]
    }
    return this.http.post<PodDescartavel>(this.baseUrl, data);
  }

  update(podDescartavel: PodDescartavel): Observable<PodDescartavel> {
    const data = {
      nome: podDescartavel.nome,
      valor: podDescartavel.valor,
      descricao: podDescartavel.descricao,
      listaSabor: [podDescartavel.listaSabor[0].id],
      listaPuff: [podDescartavel.listaPuff[0].id],
      listaMarca: [podDescartavel.listaMarca[0].id]
    }
    return this.http.put<PodDescartavel>(`${this.baseUrl}/${podDescartavel.id}`, data);
  }

  delete(podDescartavel: PodDescartavel): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${podDescartavel.id}`);
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  uploadImagem(id: number, nomeImagem: string, imagem: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('id', id.toString());
    formData.append('nomeImagem', imagem.name);
    formData.append('imagem', imagem, imagem.name);

    return this.http.patch<PodDescartavel>(`${this.baseUrl}/image/upload`, formData);
  }

  getUrlImagem(nomeImagem: string): string {
    return `${this.baseUrl}/image/download/${nomeImagem}`;
  }

}
