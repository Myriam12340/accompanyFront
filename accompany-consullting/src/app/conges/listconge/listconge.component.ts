import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Conge } from 'src/app/Model/conge';
import { ConsultantService } from 'src/app/Model/consultant/consultant.service';
import { EmailMessage } from 'src/app/Model/email-message';
import { AuthService } from 'src/app/service/Authentication Service/auth.service';
import { CongeService } from 'src/app/service/conge.service';
import { MailService } from 'src/app/service/mail.service';

@Component({
  selector: 'app-listconge',
  templateUrl: './listconge.component.html',
  styleUrls: ['./listconge.component.css']
})
export class ListcongeComponent implements OnInit {
conges : Conge []; 
userProfile: any;
cosultantid : any ;
currentState: string = 'En attente';
filteredConges: Conge[];
congeupdate : Conge ;
validateur : any ;
validateurname : any 
//partie paramettre 
grade: string;
username : string ;
//email 
email: EmailMessage = {
  fromName: '',
  fromEmail: '',
  toName: '',
  toEmail: '',
  subject: '',
  body: ''
};
day : string ;

  constructor(private emailService: MailService,private congeservice : CongeService ,  private router: Router, 
    private consultantService: ConsultantService,private authService: AuthService,) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('jwt')) {
      this.authService.getUserProfile(localStorage.getItem('jwt')).subscribe(
        (userProfile) => {
          this.userProfile = userProfile;
          this.username = this.userProfile.userName ;
          console.log(this.userProfile);

          this.cosultantid = this.userProfile.id;
          this.congeservice.getCongeByDemandeurId(this.cosultantid).subscribe(
            (data: Conge[]) => {
              this.conges = data;
              console.log(this.conges);
              this.conges.forEach(conge => {


                this.consultantService.getConsultant2(conge.validateur).subscribe(
                  (consultant: any) => {
                  conge.validateurnom = consultant.nom +" "+ consultant.prenom ; 
                    // Ajouter la propriété "consultantNom" à la mission avec vérification de la présence de la propriété 'nom'
                  },
                  (error) => {
                    console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
                  }
                );
              });
            }
          )
        },
        (error) => console.error(error)
      );
    }
    this.currentState = "En attente";
    this.filterConges();


  }
  filterConges(): void {
    if (this.currentState === 'tous') {
      this.filteredConges = this.conges;
    } else if (this.currentState === 'historique') {
      this.filteredConges = this.conges.filter(conge => conge.etat !== 'En attente' && conge.etat !== 'pas envoyer');
    } else if (this.currentState === 'En attente') {
      this.filteredConges = this.conges.filter(conge => conge.etat === 'En attente' || conge.etat === 'pas envoyer');
    }
  }
  demande(){
    this.router.navigate(['/demande'])
  }

  annulerDemande(congeup: Conge) {
    const id = congeup.id;
    const etatModifier = 'Annuler';

    this.congeservice.updateCongeEtat(id, etatModifier).subscribe(() => {
      alert('Congé annulé');
      window.location.reload();
      // You can also perform any other necessary operations or handle the response here
    });
  }
  
  envoyerDemande(conge : Conge){
    const duree = this.calculateDuree(conge.dateDebut , conge.dateFin);
  const datedebuit = this.dateconvert(conge.dateDebut);
  const datefin =this.dateconvert(conge.dateFin);
    this.consultantService.getConsultant2(conge.validateur).subscribe(
      (consultant: any) => {
      this.validateur = consultant.mail ;
         this.validateurname = consultant.nom +" "+ consultant.prenom ;// Ajouter la propriété "consultantNom" à la mission avec vérification de la présence de la propriété 'nom'
         this.validateur = consultant.mail;
         this.validateurname = consultant.nom + " " + consultant.prenom;
         this.email.toEmail = this.validateur;
         this.email.toName = conge.validateurnom;
         this.email.fromEmail = this.userProfile.email ;
         this.email.fromName = this.userProfile.userName;

         this.email.subject = 'Demande de congé: 💬';

         const body = `<p>Cher <strong>${this.email.toName}</strong>,</p>
         <p>Je vous informe par la présente que je souhaite faire une demande de congé pour la période suivante :</p>
         <ul>
           <li><strong>Date de début :</strong> ${datedebuit} <i class="fa fa-calendar"></i></li>
           <li><strong>Date de fin :</strong> ${datefin} <i class="fa fa-calendar"></i></li>
           <li><strong>Durée :</strong> ${duree} jours  <i class="fa fa-calendar"></i></li>
           <li><strong>Type de congé :</strong> ${conge.type} <i class="fa fa-suitcase"></i></li>
         </ul>
         <p>Je vous prie de bien vouloir examiner ma demande et de me notifier votre décision dans les plus brefs délais.</p>
         <p>Cordialement,</p>
         <p></p>`;
   
       this.email.body = body;
         this.sendEmail(); // Move sendEmail() method call here
       
        },
      (error) => {
        console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
      }
    );
    const id = conge.id;
    const etatModifier = 'En attente';

    this.congeservice.updateCongeEtat(id, etatModifier).subscribe(() => {
      alert('Congé envoyer');
      window.location.reload();
      // You can also perform any other necessary operations or handle the response here
    });

  }
  calculateDuree(debut : Date , fin : Date) {
    const dateDebut = new Date(debut);
    const dateFin = new Date(fin);

    // Calculez la différence en jours
    const differenceEnJours = Math.floor((dateFin.getTime() - dateDebut.getTime()) / (1000 * 3600 * 24));

    // Mettez à jour la valeur du champ de durée
   

    // Mettez à jour la propriété duree du composant
   return differenceEnJours;
  }
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
  dateconvert(date:any):String{
     
    date =new Date(date);
    const day = date.getDay()+'-'+date.getMonth()+'-'+date.getFullYear();
    
    return day ;
  }
  //envoier les donnees en paramettre 
  congedata(
    consultantId: number,
    
    username: string,
   
    date_debut: Date,
    date_fin: Date,
    validateurnom : string ,
    etat:string ,
   

  ) {
    const congeData = {
      consultantId: consultantId,
      username: username,
      date_debut: date_debut ,
      date_fin : date_fin ,
     
      validateurnom:validateurnom ,
      etat : etat 
    };

    this.congeservice.setcongeData(congeData);
    this.router.navigate(['/detailconge']);
  }

}
