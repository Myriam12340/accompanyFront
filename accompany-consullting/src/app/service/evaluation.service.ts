import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evaluation } from '../Model/evaluation';
import { Observable } from 'rxjs';
import { EvalComp } from '../Model/eval-comp';
import { EvalMensuel } from '../Model/eval-mensuel';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  private baseUrl = 'http://localhost:60734/api/Evaluations';
  private url = 'http://localhost:60734/api/eval_competance';


  constructor(
    private http: HttpClient) { }

  /** ajouter une evaluation d'integration*/
 

  addeval(viewModel: Evaluation): Observable<Evaluation> {
    return this.http.post<Evaluation>(this.baseUrl, viewModel);
  }

    /** */


  getUserEmailByEvaluationId(evaluationId: number): Observable<string> {
    const url = `${this.baseUrl}/email/${evaluationId}`;
    return this.http.get(url, { responseType: 'text' });
  }

    /** ajouter evaluation de competance */

  
  addevalC(viewModel: EvalComp): Observable<EvalComp> {
    return this.http.post<EvalComp>(this.url, viewModel);
  }


    /** get la liste des evaluation de competance from table evl-comp*/

  getlistevalcompetance():Observable<EvalComp[]>{
    return this.http.get<any>(this.baseUrl);
  }

      /** get la liste des evaluation d'integration from table evl-comp*/

  getevaluationlist():Observable<Evaluation[]>{
    return this.http.get<any>(this.baseUrl);
  }


  getevalcompetance():Observable<EvalComp[]>{
    return this.http.get<any>(this.url);
  }
 

    /** get la liste des evaluation mensuel de mission consultant */

  getEvaluationsconsultant( consultantId: number) {
    const url = `http://localhost:60734/api/eval__mensuel/consultantEVL/${consultantId}`;
    return this.http.get<EvalMensuel[]>(url);
  }

  //voir si le consultant a passe par uune evaluation de 6 mois
  checkConsultantEvaluation(consultantId: number): Observable<boolean> {
    const url = `http://localhost:60734/api/eval_competance/hasEvaluation/${consultantId}`;
    return this.http.get<boolean>(url);
  }
  //voir si le consultant a passe par uune evaluation d'integration

  checkConsultantEvaluationintegration(consultantId: number): Observable<number> {
    const url = `http://localhost:60734/api/Evaluations/hasEvaluation/${consultantId}`;
    return this.http.get<number>(url);
  }

showevalintegration(id:number){

  const url = `${this.baseUrl}/${id}`;
  return this.http.get(url);
}
//AFFICHE LES EVALUATION D'INTEGRATION DE CONSULTANT DANS SES MESSION
showEIM(id:number , ideval : number ){

  const url = `http://localhost:60734/api/eval_mission_integration/list/${id}/evaluation/${ideval}`;

  return this.http.get(url);
}

}
