import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conge } from '../Model/conge';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CongeService {
  private baseUrl = 'http://localhost:60734/api/Conges';

 constructor(
    private http: HttpClient) { }


    private congeData = new BehaviorSubject<any>(null);


    setcongeData(data: any) {
      this.congeData.next(data);
    }
  
    getcongeData() {
      return this.congeData.asObservable();
    }
    


    getCongelist():Observable<Conge[]>{
      return this.http.get<any>(this.baseUrl);
    }

  
   demande(viewModel: Conge): Observable<Conge> {
    return this.http.post<Conge>(this.baseUrl, viewModel);
  }
  


  
  getCongeByDemandeurId(demandeurId: number): Observable<Conge[]> {
    const url = `${this.baseUrl}/GetCongeParDemandeur/${demandeurId}`;
    return this.http.get<Conge[]>(url);
  }



  getCongeByValidateurId(validateurId: number): Observable<Conge[]> {
    const url = `${this.baseUrl}/GetCongeParValidateur/${validateurId}`;
    return this.http.get<Conge[]>(url);
  }
  
  
  updateetat(id: number, conge :Conge): Observable<Conge> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Conge>(url, Conge);
  }
  updateCongeEtat(id: number, etatModifier: string): Observable<any> {
    const url = `${this.baseUrl}/etat/${id}/${etatModifier}`;
    const body = { etatModifier };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
console.log (etatModifier);
    return this.http.put(url,id);
  }
}
  
  
  
  
