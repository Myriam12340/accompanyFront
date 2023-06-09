import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conge } from '../Model/conge';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CongeService {
  private baseUrl = 'http://localhost:60734/api/Conges';

 constructor(
    private http: HttpClient) { }
  
   demande(viewModel: Conge): Observable<Conge> {
    return this.http.post<Conge>(this.baseUrl, viewModel);
  }
  
  
  
  
  
  
  
  
  
  
  }
