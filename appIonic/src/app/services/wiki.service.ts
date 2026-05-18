import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Servicio que centraliza el consumo de la Star Wars API (SWAPI v2).
 * Mantiene los componentes desacoplados de la URL base y del shape
 * concreto de las respuestas.
 */
@Injectable({ providedIn: 'root' })
export class WikiService {
  private readonly API_URL = 'https://swapi.tech/api/';

  constructor(private http: HttpClient) {}

  /**
   * Recupera el listado completo de recursos de una categoría.
   * @param category Categoría SWAPI (people, planets, species, starships).
   * @returns Observable con la respuesta cruda de SWAPI.
   */
  getAllArticles(category: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}${category.toLowerCase()}/`);
  }

  /**
   * Recupera el detalle de un recurso concreto por su uid.
   * @param category Categoría SWAPI a la que pertenece.
   * @param id Identificador (uid) del recurso.
   * @returns Observable con el detalle del recurso.
   */
  getArticle(category: string, id: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}${category.toLowerCase()}/${id}`);
  }
}
