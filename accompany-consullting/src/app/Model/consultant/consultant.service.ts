import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {  BehaviorSubject, Observable} from 'rxjs'
import { ConsultantModule } from './consultant.module';

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {



  private consultantData = new BehaviorSubject<any>(null);

  readonly APIurl ="http://localhost:60734/api";
  constructor(private http:HttpClient) { }

  setConsultantData(data: any) {
    this.consultantData.next(data);
  }

  getConsultantData() {
    return this.consultantData.asObservable();
  }
  
  getConsultantlist():Observable<ConsultantModule[]>{
    return this.http.get<any>(this.APIurl+'/Consultants');
  }
  addConsultant(val:any){
    return this.http.post(this.APIurl+'/Consultants',val);
  }
  getConsultant(val:any ){
    return this.http.get(this.APIurl+'/Consultants',val);
  }
  updateConsultant(id: number, val: any){
    return this.http.put(`${this.APIurl}/Consultants/${id}`, val);
  }
  getConsultant2(consultantId: number) {
    const url = `${this.APIurl}/Consultants/${consultantId}`;
    return this.http.get(url);
  }
  updateConsultantContract(consultantId: number, contratValue: string): Observable<any> {
    const url = `${this.APIurl}/Consultants/contract/${consultantId}`;
    const body = `"${contratValue}"`; // Wrap the contratValue in double quotes to send it as a JSON string
    return this.http.put(url, body, { headers: { 'Content-Type': 'application/json' } });
  }
  
  getConsultantbyemail(email: string) {
    const url = `${this.APIurl}/Consultants/email/${email}`;
    return this.http.get(url);
  }
 
  
  updateCongeEtat(id: number, etatModifier: string): Observable<any> {
    const url = `${this.APIurl}/Consultants/etat/${id}/${etatModifier}`;
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