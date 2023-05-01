import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {entretient } from '../Model/entretient';
import { Candidat } from '../Model/candidat';
import { EntretientViewModel } from '../Model/entretient-view-model';

@Injectable({
  providedIn: 'root'
})
export class EntretienService {

  private baseUrl = 'http://localhost:60734/api/Entretients';

  constructor(
    private http: HttpClient) { }

  /** POST: add a new entretien to the server */
  addEntretien(viewModel: EntretientViewModel): Observable<entretient> {
    return this.http.post<entretient>(this.baseUrl, viewModel);
  }




  getEntretientsHistorique(recruteur: number): Observable<entretient[]> {
    return this.http.get<entretient[]>(`${this.baseUrl}/recruteur/${recruteur}`);
  }


}
