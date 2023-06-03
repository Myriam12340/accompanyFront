import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evaluation } from '../Model/evaluation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  private baseUrl = 'http://localhost:60734/api/Evaluations';

  constructor(
    private http: HttpClient) { }

  /** POST: add a new entretien intial */
 

  addeval(viewModel: Evaluation): Observable<Evaluation> {
    return this.http.post<Evaluation>(this.baseUrl, viewModel);
  }
}
