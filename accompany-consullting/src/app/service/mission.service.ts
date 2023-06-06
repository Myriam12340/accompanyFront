import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mission } from '../mission';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  private baseUrl = 'http://localhost:60734/api/Missions';

  constructor(private http: HttpClient) { }

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
}
