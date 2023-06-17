import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mission } from '../mission';
import { Observable } from 'rxjs';
import { EvalRhIntegrationComponent } from '../evaluation/eval-rh-integration/eval-rh-integration.component';
import { EvalMissionIntegration } from '../Model/eval-mission-integration';
import { EvalMensuel } from '../Model/eval-mensuel';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  private baseUrl = 'http://localhost:60734/api/Missions';


  constructor(private http: HttpClient) { }



  getlistmissiontous(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.baseUrl}`);
  }

  addMission(viewModel: Mission): Observable<Mission> {
    return this.http.post<Mission>(this.baseUrl, viewModel);
  }

  getlistmission(manager: number): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.baseUrl}/manager/${manager}`);
  }

  getMission(missionId: number): Observable<Mission> {
    const url = `${this.baseUrl}/${missionId}`;
    return this.http.get<Mission>(url);
  }

  updateMission(id: number, mission: Mission): Observable<Mission> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Mission>(url, mission);
  }
  getlistmissionconsultant(consultant: number): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.baseUrl}/consultant/${consultant}`);
  }



  getlistmissiontitre(titre: string): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.baseUrl}/titre/${titre}`);
  }


  //service pour eval integration mission 
  addeval_integration_Mission(viewModel: EvalMissionIntegration): Observable<EvalMissionIntegration> {
    return this.http.post<EvalMissionIntegration>(this.evalurl, viewModel);
  }
  updateMissionevalintegration(id: number, mission:EvalMissionIntegration ): Observable<EvalMissionIntegration> {
    const url = `${this.evalurl}/${id}`;
    return this.http.put<EvalMissionIntegration>(url, mission);
  }
  getevalmissionintegration(missionId: number): Observable<EvalMissionIntegration> {
    const url = `${this.evalurl}/mission/${missionId}`;
    return this.http.get<EvalMissionIntegration>(url);
  }

  
  

  public updateEvalMissionIntegration(id: number, evalMissionIntegration: any): Observable<any> {
    const url = `http://localhost:60734/api/eval_mission_integration/${id}`;
    return this.http.put(url, evalMissionIntegration);
  }

  private evalurl = 'http://localhost:60734/api/eval_mission_integration';

  getevalmissionintegrationbyconsultant(consultantId: number): Observable<EvalMissionIntegration[]> {
    const url = `${this.evalurl}/consultant/${consultantId}`;
    return this.http.get<EvalMissionIntegration[]>(url);
  }
  
  //liste des eval mission integration par manager 
  getevalmissionintegrationbymanager(managerId: number): Observable<EvalMissionIntegration[]> {
    const url = `${this.evalurl}/manager/${managerId}`;
    return this.http.get<EvalMissionIntegration[]>(url);
  }
  

  ///partie mensuel 
  private mensuelurl = ' http://localhost:60734/api/eval__mensuel';

  addeval_menusel_Mission(viewModel: EvalMensuel): Observable<EvalMensuel> {
    return this.http.post<EvalMensuel>(this.mensuelurl, viewModel);
  }

}
