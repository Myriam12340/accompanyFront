import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
}