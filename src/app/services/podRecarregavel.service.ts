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

  findAll(pagina: number, tamanhoPagina: number): Observable<PodRecarregavel[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
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
      listaCor: [podrecarregavel.listaCor[0].id],
      listaMarca: [podrecarregavel.listaMarca[0].id]
    }
    return this.httpClient.post<PodRecarregavel>(this.baseUrl, data);
  }

  update(podrecarregavel: PodRecarregavel): Observable<PodRecarregavel> {
    const data = {
      nome: podrecarregavel.nome,
      valor: podrecarregavel.valor,
      descricao: podrecarregavel.descricao,
      idCor: [podrecarregavel.listaCor[0].id],
      idMarca: [podrecarregavel.listaMarca[0].id]
    }
    return this.httpClient.put<PodRecarregavel>(`${this.baseUrl}/${podrecarregavel.id}`, data);
  }

  delete(podrecarregavel: PodRecarregavel): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${podrecarregavel.id}`);
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  uploadImagem(id: number, nomeImagem: string, imagem: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('id', id.toString());
    formData.append('nomeImagem', imagem.name);
    formData.append('imagem', imagem, imagem.name);

    return this.httpClient.patch<PodRecarregavel>(`${this.baseUrl}/image/upload`, formData);
  }

  getUrlImagem(nomeImagem: string): string {
    return `${this.baseUrl}/image/download/${nomeImagem}`;
  }

}
