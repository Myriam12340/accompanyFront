import { Component, OnInit , Inject } from '@angular/core';
import { MailService } from '../service/mail.service';
import { EmailMessage } from '../Model/email-message';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mail-recruteur',
  templateUrl: './mail-recruteur.component.html',
  styleUrls: ['./mail-recruteur.component.css']
})
export class MailRecruteurComponent  {
 
  email: EmailMessage = {
    fromName: '',
    fromEmail: '',
    toName: '',
    toEmail: '',
    subject: '',
    body: ''
  };

  constructor(private emailService: MailService , public dialogRef: MatDialogRef<MailRecruteurComponent>) { }

  sendEmail() {
    this.emailService.sendEmail(this.email).subscribe(
      () => {
        console.log('Email sent successfully');
        this.dialogRef.close(this.email.toEmail);
      },
      (error) => {
        console.log('Error sending email:', error);
      }
    );
  }
}