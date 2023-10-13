import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailMessage } from '../Model/email-message';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  private apiUrl = 'http://localhost:60734/api/Email';

  constructor(private http: HttpClient) { }

  sendEmail(email: EmailMessage): Observable<any> {
    return this.http.post<any>(this.apiUrl+"/SendEmail", email);
  }
    sendEmailsanscc(email: EmailMessage): Observable<any> {
    return this.http.post<any>(this.apiUrl+"/SendEmailsanscc", email);
  }
}