import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recuperation } from '../Model/recuperation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecuperationService {

  private baseUrl = 'http://localhost:60734/api/Recuperations';


  constructor(private http: HttpClient) { }



  getlistrequiptous(): Observable<Recuperation[]> {
    return this.http.get<Recuperation[]>(`${this.baseUrl}`);
  }

  addRequip(viewModel:Recuperation): Observable<Recuperation> {
    return this.http.post<Recuperation>(this.baseUrl, viewModel);
  }
//pas encore dans controlleur
  getlistrequpparvalidateur(validateur: number): Observable<Recuperation[]> {
    return this.http.get<Recuperation[]>(`${this.baseUrl}/GetRecupParValidateur/${validateur}`);
  }

  getRecuperation(RecuperationId: number): Observable<Recuperation> {
    const url = `${this.baseUrl}/${RecuperationId}`;
    return this.http.get<Recuperation>(url);
  }
  demande(viewModel: Recuperation): Observable<Recuperation> {
    return this.http.post<Recuperation>(this.baseUrl, viewModel);
  }
  

  updaterequpEtat(id: number, etatmodifier: string, duree: number): Observable<any> {
    const url = `${this.baseUrl}/etat/${id}/${etatmodifier}/duree/${duree}`;
    return this.http.put(url, null); // Le corps de la requête peut être null s'il n'est pas nécessaire
  }


  getRecuperationsGroupedByNumero(): Observable<any[]> {
    const url = `${this.baseUrl}/grouped-by-numero`;
    return this.http.get<any[]>(url);
  }

  getRecupParNumeroDemande(numeroDemande: number): Observable<Recuperation[]> {
    const url = `${this.baseUrl}/GetRecupParNumeroDemande/${numeroDemande}`;
    return this.http.get<Recuperation[]>(url);
  }
}
