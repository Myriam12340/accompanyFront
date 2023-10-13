import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FichierService {

  constructor(private http:HttpClient,private sanitizer: DomSanitizer) { }


  downloadPdf(fileName: string): Observable<any> {
    const url = `http://localhost:60734/api/Conges/download-pdf?fileName=${fileName}`;
    return this.http.get(url, { responseType: 'arraybuffer' });
  }
  downloadcvPdf(fileName: string): Observable<any> {
    const url = `http://localhost:60734/api/entretients/download-pdf?fileName=${fileName}`;
    return this.http.get(url, { responseType: 'arraybuffer' });
  }

  createBlob(response: any): any {
    const blob = new Blob([response], { type: 'application/pdf' });
    return this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
  }


///image
downloadimage(fileName: string): Observable<any> {
  const url = `http://localhost:60734/api/Consultants/download-pdf?fileName=${fileName}`;
  return this.http.get(url, { responseType: 'arraybuffer' });
}

createBlobphoto(response: any): any {
  const blob = new Blob([response], { type: 'application/image' });
  return this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
}




}
