import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {  BehaviorSubject, Observable} from 'rxjs'
import { ConsultantModule } from './consultant.module';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {



  private consultantData = new BehaviorSubject<any>(null);

  readonly APIurl ="http://localhost:60734/api";
  constructor(private http:HttpClient,private sanitizer: DomSanitizer) { }

  setConsultantData(data: any) {
    this.consultantData.next(data);
  }

  getConsultantData() {
    return this.consultantData.asObservable();
  }
  
  getConsultantlist():Observable<ConsultantModule[]>{
    return this.http.get<any>(this.APIurl+'/Consultants');
  }


  addadmin(val:any){
    return this.http.post(this.APIurl+'/Consultants/admin',val);
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

  
  getConsultantbyemail(email: string) {
    const url = `${this.APIurl}/Consultants/email/${email}`;
    return this.http.get(url);
  }
 
  
  updatecontratEtat(id: number, etatModifier: string): Observable<any> {
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

  updatesoldemaladie(id: number, soldemaladie: number): Observable<any> {
    const url = `${this.APIurl}/Consultants/soldemaladie/${id}/${soldemaladie}`;
    const body = { soldemaladie };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
console.log (soldemaladie);
    return this.http.put(url,id);
  }


  updatesoldeconge(id: number, soldeconge: number): Observable<any> {
    const url = `${this.APIurl}/Consultants/solde/${id}/${soldeconge}`;
    const body = { soldeconge };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
console.log (soldeconge);
    return this.http.put(url,id);
  }
  updatesbonus(id: number, soldeconge: number): Observable<any> {
    const url = `${this.APIurl}/Consultants/bonus/${id}/${soldeconge}`;
    const body = { soldeconge };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
console.log (soldeconge);
    return this.http.put(url,id);
  }
  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.APIurl}/Consultants/upload`, formData);
  }
  downloadPdf(fileName: string): Observable<any> {
    const url = `http://localhost:60734/api/Conges/download-pdf?fileName=${fileName}`;
    return this.http.get(url, { responseType: 'arraybuffer' });
  }

  createBlob(response: any): any {
    const blob = new Blob([response], { type: 'application/pdf' });
    return this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
  }
}