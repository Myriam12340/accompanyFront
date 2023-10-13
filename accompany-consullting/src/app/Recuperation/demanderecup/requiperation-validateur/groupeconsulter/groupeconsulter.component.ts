import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Consultant } from 'src/app/Model/consultant';
import { ConsultantService } from 'src/app/Model/consultant/consultant.service';
import { EmailMessage } from 'src/app/Model/email-message';
import { Recuperation } from 'src/app/Model/recuperation';
import { AuthService } from 'src/app/service/Authentication Service/auth.service';
import { MailService } from 'src/app/service/mail.service';
import { RecuperationService } from 'src/app/service/recuperation.service';

@Component({
  selector: 'app-groupeconsulter',
  templateUrl: './groupeconsulter.component.html',
  styleUrls: ['./groupeconsulter.component.css']
})
export class GroupeconsulterComponent implements OnInit {

  constructor( 
  private authService: AuthService , private dialogRef: MatDialogRef<GroupeconsulterComponent>
,    private emailService: MailService,@Inject(MAT_DIALOG_DATA) public data: any,private Recuperationservice :RecuperationService, private consultantService: ConsultantService) {}
demandes :any ;
manager: string;
showInput : boolean ;
consultant :any ;
 demandesTraitees :number = 0;

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
validateur : any ;

namedemandeur:any;
sendEmail() {
  this.emailService.sendEmail(this.email).subscribe(
    () => {
      console.log('Email sent successfully');
      // Faites ce que vous devez faire lorsque l'e-mail est envoyé avec succès

    },
    (error) => {
      console.log('Error sending email:', error);
      // Faites ce que vous devez faire en cas d'erreur lors de l'envoi de l'e-mail
    }
  );
}
  ngOnInit(): void {

    if (sessionStorage.getItem('jwt')) {
      this.authService.getUserProfile(localStorage.getItem('jwt')).subscribe(
        (userProfile) => {
         
       
         
          this.consultantService.getConsultantbyemail(userProfile.email).subscribe(
            (response) => {
             
              this.consultant = response;
              console.log(this.consultant);
              this.validateur = this.consultant.nom + " " + this.consultant.prenom;
             
            },
            (error) => {
              console.error(error); // Gérez l'erreur de la requête
            }
          );
        },
        (error) => console.error(error)
      );
    }
   this.demandes = this.data.demandes;
    console.log("ddh", this.data);

    for (const demande of this.demandes) {

      if (demande.etat!="Encours")
      {
        this.demandesTraitees ++ ;
      }
      this.consultantService.getConsultant2(demande.demandeur).subscribe(
        (consultant :any) => {
         demande.demandeurnom = consultant.nom +" " + consultant.prenom ;
          
        },
        (error) => console.error(error)
      );
    }

    this.consultantService.getConsultantbyemail(this.data.manager).subscribe(
      (response) => {
       
        this.consultant = response;
        console.log(this.consultant);
        this.manager = this.consultant.nom + " " + this.consultant.prenom;
       
      },
      (error) => {
        console.error(error); // Gérez l'erreur de la requête
      }
    );
console.log("les demande Traite",this.demandesTraitees );
  }
  validateRequest(demande : Recuperation)
  {
  demande.showInput = true;
  }

  rejectRequest(demande : Recuperation){
    this.Recuperationservice.updaterequpEtat(demande.id , "Rejeter", demande.duree).subscribe(
      (consultant: any) => {
        // Réussite de la mise à jour, rafraîchir la page
        demande.show = true;
       this.demandesTraitees = this.demandesTraitees+1;
console.log(this.demandesTraitees);
      },
      (error) => {
        console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
      }
    );


  }

  confirmValidation(demande : Recuperation)
  {console.log("nombre de jour valide", demande.joursValides)
  const consultantsDetails: string[] = [];
  const observables: Observable<any>[] = [];


  
  this.Recuperationservice.updaterequpEtat(demande.id , "valide", demande.joursValides).subscribe(
    (consultant: any) => {
      // Réussite de la mise à jour, rafraîchir la page
     
      demande.show = true;
      this.demandesTraitees++;

    },
    (error) => {
      console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
    }

    
  );


}
envoyerResultat() {
  let groups: Recuperation[];

  this.Recuperationservice.getRecupParNumeroDemande(this.data.numeroDemande).subscribe(
    recuperations => {
      groups = recuperations;

      if (this.demandesTraitees === this.demandes.length) {
        this.buildEmailBody(groups).subscribe(
          emailBody => {
            this.email.body = emailBody;
            this.email.toEmail = this.data.manager;
            this.email.subject = "Traitement d'une demande de récupération";

            // Send the email and close the dialog once the email is sent
            this.sendEmail();
          },
          error => {
            console.error(error);
          }
        );
      }
    },
    error => {
      console.error(error);
    }
  );
}

buildEmailBody(demandes: any[]): Observable<string> {


  const consultantObservables = demandes.map(demande =>
    this.consultantService.getConsultant2(demande.demandeur)
  );

  return forkJoin(consultantObservables).pipe(
    map((consultants: any[]) => {
   
      let body = `
        <div style="font-family: Arial, sans-serif;">
          <p style="font-size: 16px; color: #333; margin-bottom: 16px;">
            Cher ${this.manager},
          </p>
          <p style="font-size: 16px; color: #333; margin-bottom: 16px;">
            Nous avons le plaisir de vous informer que la demande de récupération de groupe effectuée le ${this.formatDate(this.data.dateDemande )}
            a été traitée avec succès.
            
           <br> Vous trouverez ci-dessous les détails des demandes traitées :
          </p>
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd; margin-bottom: 24px;">
            <thead>
              <tr>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">#</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Consultant</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Date de début</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Date de fin</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Durée</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Commentaire</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Etat</th>
              </tr>
            </thead>
            <tbody>
      `;

      for (let i = 0; i < demandes.length; i++) {
        const demande = demandes[i];
        const consultant = consultants[i];

        body += `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${i + 1}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${consultant.nom} ${consultant.prenom}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${ this.formatDate(demande.dateDebut) }</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${this.formatDate(demande.dateFin)}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${demande.duree}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${demande.commentaire}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${demande.etat}</td>
          </tr>
        `;
      }

      body += `
            </tbody>
          </table>
        
          <p style="font-size: 16px; color: #333; margin-bottom: 16px;">
            Cordialement,
            <br>
            <p style="font-size: 16px; color: #333; margin-bottom: 16px;">
            ${this.validateur}          </p>
          </p>
        </div>
      `;

      return body;
    })
  );
}




formatDate(date: Date | string | null): string {
  if (!date) {
    return '';
  }

  const formattedDate = typeof date === 'string' ? new Date(date) : date;
  return formatDate(formattedDate, 'dd-MM-yyyy', 'en-US'); // Adjust the locale as needed
}


}
