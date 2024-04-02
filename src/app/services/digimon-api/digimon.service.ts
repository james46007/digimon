import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {DigimonList} from "../../interfaces/DigimonList";
import {DigimonQueryParams} from "../../interfaces/Params";
import {environment} from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class DigimonService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDigimons(params: DigimonQueryParams): Observable<DigimonList> {
    let queryParams = new HttpParams();
    // Itera sobre los parámetros y agrega aquellos que tienen un valor definido
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        // @ts-ignore
        queryParams = queryParams.append(key, params[key])
      }
    }
    // Realiza la solicitud HTTP con los parámetros
    return this.http.get<DigimonList>(this.apiUrl, { params: queryParams });
  }
}
