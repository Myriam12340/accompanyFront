import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evaluation } from '../Model/evaluation';
import { Observable } from 'rxjs';
import { EvalComp } from '../Model/eval-comp';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  private baseUrl = 'http://localhost:60734/api/Evaluations';
  private url = 'http://localhost:60734/api/eval_competance';


  constructor(
    private http: HttpClient) { }

  /** POST: add a new entretien intial */
 

  addeval(viewModel: Evaluation): Observable<Evaluation> {
    return this.http.post<Evaluation>(this.baseUrl, viewModel);
  }

  getUserEmailByEvaluationId(evaluationId: number): Observable<string> {
    const url = `${this.baseUrl}/email/${evaluationId}`;
    return this.http.get(url, { responseType: 'text' });
  }
  
  addevalC(viewModel: EvalComp): Observable<EvalComp> {
    return this.http.post<EvalComp>(this.url, viewModel);
  }
  
}
