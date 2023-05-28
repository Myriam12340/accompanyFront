import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MissionRh } from '../mission-rh';
import { Observable } from 'rxjs';
import { entretient } from '../Model/entretient';
import { Mission } from '../mission';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  private baseUrl = 'http://localhost:60734/api/Missions';

  constructor(
    private http: HttpClient) { }

  /** POST: add a new entretien intial */
  addMission(viewModel: Mission): Observable<Mission> {
    return this.http.post<Mission>(this.baseUrl, viewModel);
  }
}
