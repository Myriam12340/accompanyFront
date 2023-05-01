import { Component, OnInit , Inject } from '@angular/core';
import { MailService } from '../service/mail.service';
import { EmailMessage } from '../Model/email-message';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../service/Authentication Service/auth.service';

@Component({
  selector: 'app-mail-recruteur',
  templateUrl: './mail-recruteur.component.html',
  styleUrls: ['./mail-recruteur.component.css']
})
export class MailRecruteurComponent  {
 user: any ;
  email: EmailMessage = {
    fromName: '',
    fromEmail: '',
    toName: '',
    toEmail: '',
    subject: '',
    body: ''
  };

  constructor(private authService: AuthService,private emailService: MailService , public dialogRef: MatDialogRef<MailRecruteurComponent>) { }

  sendEmail() {
    this.emailService.sendEmail(this.email).subscribe(
      () => {
        console.log('Email sent successfully');
       
      
        this.authService.getUserByEmail(this.email.toEmail).subscribe(
          (user) => {
            this.user = user;
            this.dialogRef.close(this.user);
          },
          (error) => {
            console.log('Error getting user by email:', error);
          }
        );












      },
      (error) => {
        console.log('Error sending email:', error);
      }
    );
  }
}