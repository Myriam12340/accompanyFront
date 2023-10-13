import { Component, OnInit , Inject } from '@angular/core';
import { MailService } from '../../service/mail.service';
import { EmailMessage } from '../../Model/email-message';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../service/Authentication Service/auth.service';

@Component({
  selector: 'app-mail-recruteur',
  templateUrl: './mail-recruteur.component.html',
  styleUrls: ['./mail-recruteur.component.css']
})
export class MailRecruteurComponent  {
  showMailForm = false;
  dateInput: string = '';
  selectedOption: string = '';
  teamsLink: string = '';
  selectedLocation: string = '';
  showMailFormState: { [key: string]: boolean } = {};
commentaire: string ;
 user: any ;
 userProfile: any;
  email: EmailMessage = {
    fromName: '',
    fromEmail: '',
    toName: '',
    toEmail: '',
    subject: '',
    body: '',
    CcEmail:''
    ,CcName:''
    , UserEmail:''
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private authService: AuthService,private emailService: MailService , public dialogRef: MatDialogRef<MailRecruteurComponent>) { }
  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
    };
    const formattedDate = new Date(dateString).toLocaleString('fr-FR', options);
    return formattedDate;
}

  sendEmail() {
   let  body :any ="";
    body = `
    <div style="font-family: Arial, sans-serif; margin: 20px; background-color: #f4f4f4; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <p style="font-size: 16px; color: #333;">Bonjour ,  ${this.email.toName}</p>
      <p style="font-size: 16px; color: #333;">
      J'espère que vous allez bien. Je voudrais vous informer que nous avons un entretien prévu avec un candidat prometteur pour le poste ${this.data. poste} le ${this.formatDate(this.dateInput)} .

      </p>
      <ul style="list-style: none; padding: 0;">
        <li>Nom du candidat :  ${this.data.nomPrenom} </li>
        <li>Date et Heure de l'entretien:${this.formatDate(this.dateInput)} </li>
        <li>l'entretien se fait en ' : ${this.selectedOption === 'teams' ? 'Teams' : 'Bureau'}</li>
        ${this.selectedOption === 'teams' ? `<li>Lien Teams 👩‍💻 :  <a href="${this.teamsLink}" target="_blank">${this.teamsLink}</a></li>` : `<li>Lieu 📍 : ${this.selectedLocation}</li>`}
      </ul>
      <p>De plus, veuillez noter les commentaires suivants du recruteur précédent : ${this.commentaire}</p>
      <p style="font-size: 16px; color: #333;">Cordialement, <br>L'équipe RH</p>
      <br>
      <strong style="font-family: Arial, sans-serif; margin: 20px; color: #339AB0;">Accompany Consulting</strong></p>
    </div>
  `;
this.email.body = body;
    this.authService.getUserProfile(localStorage.getItem('jwt')).subscribe(
      (userProfile) => {
        this.userProfile = userProfile;
        console.log(this.userProfile);

        this.email.fromEmail = this.userProfile.email;
        this.email.fromName = this.userProfile.username;


       
      },
      (error) => console.error(error)
    );
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