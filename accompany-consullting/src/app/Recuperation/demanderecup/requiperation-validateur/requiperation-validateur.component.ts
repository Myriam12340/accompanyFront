import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultantService } from 'src/app/Model/consultant/consultant.service';
import { Recuperation } from 'src/app/Model/recuperation';
import { AuthService } from 'src/app/service/Authentication Service/auth.service';
import { RecuperationService } from 'src/app/service/recuperation.service';
import { Location } from '@angular/common';
import { MailService } from 'src/app/service/mail.service';
import { EmailMessage } from 'src/app/Model/email-message';
import { MatDialog } from '@angular/material/dialog';
import { GroupeconsulterComponent } from './groupeconsulter/groupeconsulter.component';

@Component({
  selector: 'app-requiperation-validateur',
  templateUrl: './requiperation-validateur.component.html',
  styleUrls: ['./requiperation-validateur.component.css']
})
export class RequiperationValidateurComponent implements OnInit {

  constructor(private dialog: MatDialog, private emailService: MailService, private location: Location,private Recuperationservice :RecuperationService,private consultantService: ConsultantService,private authService: AuthService) { }
 date: any;
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
 
  numeroDemande: number;
  userProfile: any;
  
  cosultantid : any ;
 recups: Recuperation[];
 groups : Recuperation[];
 type:any;
  validateur : any ;
  demandeur:any;



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



  validateRequest(recup: any) {
    recup.showInput = true; // Affiche le champ input
}

rejectRequest(recup: any) {
    // Logique pour le rejet de la demande
    const emailBody = `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc3545;">Demande de récupération refusée</h2>
          <p>Votre demande de récupération a été refusée.</p>
          
          <ul>
            <li><strong>Date de début :</strong> ${recup.dateDebut}</li>
            <li><strong>Date de fin :</strong> ${recup.dateFin}</li>
            <li><strong>Durée :</strong> ${recup.duree} jours</li>
          </ul>
      
          <p>Cordialement,</p>
          <p>${recup.demandeurnom}</p>
        </div>
      `;
this.email.body = emailBody;

this.email.subject= " Demande de récupération refusée";

this.email.body = emailBody;

this.email.toEmail =   recup.validateurmail;
  this.Recuperationservice.updaterequpEtat(recup.id , "Rejeter", recup.duree).subscribe(
    (consultant: any) => {
      // Réussite de la mise à jour, rafraîchir la page
      window.location.reload();
      this.sendEmail();

    },
    (error) => {
      console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
    }
  );
}

confirmValidation(recup: any) {
  // Récupérez la valeur de recup.joursValides ici et effectuez les actions nécessaires
  console.log('Nombre de jours validés :', recup.joursValides);
  recup.showInput = false; // Cache le champ input après confirmation
  const emailBody = `
  <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #28a745;">Demande de récupération acceptée</h2>
    <p>Votre demande de récupération a été acceptée avec les détails suivants :</p>
    
    <ul>
      <li><strong>Date de début :</strong> ${recup.dateDebut}</li>
      <li><strong>Date de fin :</strong> ${recup.dateFin}</li>
      <li><strong>Durée :</strong> ${recup.joursValides} jours</li>
    </ul>

    <p>Cordialement,</p>
    <p>${recup.demandeurnom}</p>
  </div>
`;

this.email.body = emailBody;

this.email.subject= "Demande de récupération acceptée";

this.email.body = emailBody;

this.email.toEmail =   recup.validateurmail;
console.log("m:" + this.validateur.id);
  this.Recuperationservice.updaterequpEtat(recup.id , "valide", recup.joursValides).subscribe(
    (consultant: any) => {
      // Réussite de la mise à jour, rafraîchir la page
      window.location.reload();
      this.sendEmail();

    },
    (error) => {
      console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
    }

    
  );

}

  ngOnInit(): void {

    this.Recuperationservice.getRecuperationsGroupedByNumero().subscribe(
      (data) => {
      
        // Filtrer les groupes ayant au moins une demande à l'état "Encours"
        this.groups = data.filter(group => 
          group && group.demandes && group.demandes.some(demande => 
            demande && demande.etat === 'Encours'
          )
        );
    
        console.log('Données groupées filtrées :', this.groups);
    
        this.groups.forEach((recup) => {
          console.log('Type du groupe :', recup.type);
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des données groupées :', error);
      }
    );
    
    if (sessionStorage.getItem('jwt')) {
      this.authService.getUserProfile(localStorage.getItem('jwt')).subscribe(
        (userProfile) => {
          this.userProfile = userProfile;
          console.log(this.userProfile);
          this.consultantService.getConsultantbyemail(this.userProfile.email).subscribe(
            (consultant: any) => {
             this.validateur = consultant.id;
           
       console.log("this",this.validateur);
          this.Recuperationservice.getlistrequpparvalidateur(this.validateur).subscribe(
            (data: Recuperation[]) => {


              this.recups = data.filter(recup => recup.etat === 'Encours' && recup.type=='Personnel');

              this.recups.forEach((recup) => {
                this.type = recup.type;
                this.consultantService.getConsultant2(recup.validateur).subscribe(
                  (consultant: any) => {
                    recup.validateurmail= consultant.mail;
                  },
                  (error) => {
                    console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
                  }
                );
                this.consultantService.getConsultant2(recup.demandeur).subscribe(
                  (consultant: any) => {
                    recup.demandeurnom= consultant.nom + ' ' + consultant.prenom;
                  },
                  (error) => {
                    console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
                  }
                );
              });
            },
            (error) => {
              console.log('Une erreur s\'est produite lors de la récupération recups :', error);
            }
          );
          
          }
          );
        },
        (error) => console.error(error)
      );
    }


  }
  Consulter(demandes: any , manager:string, numeroDemande : number , dateDemande : any) {
    console.log("leee", demandes);
 
    // Ouvrir le MatDialog ici
    const dialogRef = this.dialog.open( GroupeconsulterComponent, {
      width: '2000px', // ajustez la largeur selon vos besoins
      data: {demandes,manager,numeroDemande,dateDemande} // transmettez des données au composant du MatDialog si nécessaire
    });
  
    // Vous pouvez écouter les événements du MatDialog, par exemple, la fermeture du dialog


 
  }
}
