import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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




   


    
  /** POST: add a new entretien intial */
  addEntretien(viewModel: EntretientViewModel): Observable<entretient> {
    return this.http.post<entretient>(this.baseUrl, viewModel);
  }
  /** POST: add a new entretien to the server */

addEntretiensuivant(val :any ){
 
  return this.http.post(this.baseUrl+'/entretiensuivant',val);

}
  /** Get list entretien de recruteur from  the server */


  getEntretientsHistorique(recruteur: number): Observable<entretient[]> {
    return this.http.get<entretient[]>(`${this.baseUrl}/recruteur/${recruteur}`);
  }
  /** Get list entretien affecte from  the server */

  getEntretienaaffecte(recruteursuivant: number): Observable<entretient[]> {
    return this.http.get<entretient[]>(`${this.baseUrl}/recruteursuivant/${recruteursuivant}`);
  }


getEntretienCandidat(val : number): Observable<entretient[]>{

  return this.http.get<entretient[]>(`${this.baseUrl}/candidat/${val}`);
 

}
  /** Get candidat */

  getCandidatparemail(email : number) {
    return this.http.get(this.baseUrl + '/email/' + email);
  }
  


  /** Get candidat */

  getCandidat(candidatid: number) {
    return this.http.get(this.baseUrl + '/getcandidat/' + candidatid);
  }
  



 updateEntretient(id: number, entretient: entretient): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put(url, entretient);
  }
  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }



}
