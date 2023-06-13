import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Conge } from 'src/app/Model/conge';
import { ConsultantService } from 'src/app/Model/consultant/consultant.service';
import { EmailMessage } from 'src/app/Model/email-message';
import { AuthService } from 'src/app/service/Authentication Service/auth.service';
import { CongeService } from 'src/app/service/conge.service';
import { MailService } from 'src/app/service/mail.service';

@Component({
  selector: 'app-consulterdemande',
  templateUrl: './consulterdemande.component.html',
  styleUrls: ['./consulterdemande.component.css']
})
export class ConsulterdemandeComponent implements OnInit {
  congedata: Conge;
  solde: any;
  soldemaldie: any;
  userprofil: any;
  emailuser: any;
  consultant: any;
  consultantvalidateur: any;
  posteconsultant: any;
  duree: any;
  datedebut: any;
  datefin: any;
  username: string = "";
  demandeur: any;
  data: any;
  d: any;
  validateurname: any;
  //email 
email: EmailMessage = {
  fromName: '',
  fromEmail: '',
  toName: '',
  toEmail: '',
  subject: '',
  body: ''
};
  constructor(private emailService: MailService,private router: Router, private congeservice: CongeService, private authService: AuthService, private consultantservice: ConsultantService) { }

  ngOnInit(): void {


    this.congeservice.getcongeData().subscribe((data) => {
      // Handle the received data here
      console.log("Received congeData in component:", data);

      // Assign the received data to a property in your component
      this.data = data;
      this.d = this.data.conge.demandeur;
      console.log("DD", this.d);
      console.log("DD" + this.d);

      // Perform any other necessary operations with the data
    });



            this.consultantservice.getConsultant2(this.data.conge.demandeur).subscribe(
              (response) => {
                this.consultant = response;
                console.log(this.consultant);
                this.username = this.consultant.nom + " " + this.consultant.prenom;
                this.posteconsultant = this.consultant.grade + " " + this.consultant.fonction// Faites quelque chose avec les données du consultant
                this.solde = this.consultant.soldeConge;
                this.soldemaldie = this.consultant.soldeMaladie;
                this.email.fromEmail=this.consultant.mail;
                this.email.fromName = this.consultant.nom + " " + this.consultant.prenom ;
              },
              (error) => {
                console.error(error); // Gérez l'erreur de la requête
              }
            );
            
            this.consultantservice.getConsultant2(this.data.conge.validateur).subscribe(
              (response) => {
                this.consultantvalidateur = response;
                this.validateurname = this.consultantvalidateur.nom + " " + this.consultantvalidateur.prenom;
                console.log(this.consultant);
                this.email.toEmail= this.consultantvalidateur.mail;
                this.email.toName = this.consultantvalidateur.nom + " " + this.consultantvalidateur.prenom;


              },
              (error) => {
                console.error(error); // Gérez l'erreur de la requête
              }
            );
         
       

      this.duree = this.calculateDuree(this.data.conge.dateDebut, this.data.conge.dateFin);
      this.datedebut = this.dateconvert(this.data.conge.dateDebut);
      this.datefin = this.dateconvert(this.data.conge.dateFin);

      this.email.subject = 'Demande de congé: 💬';
      const body = `<p>Cher <strong>${this.email.toName}</strong>,</p>
        <p>Je vous informe par la présente que je souhaite faire une demande de congé pour la période suivante :</p>
        <ul>
          <li><strong>Date de début :</strong> ${this.data.conge.dateDebut} <i class="fa fa-calendar"></i></li>
          <li><strong>Date de fin :</strong> ${this.data.conge.dateFin} <i class="fa fa-calendar"></i></li>
          <li><strong>Durée :</strong> ${this.duree} jours  <i class="fa fa-calendar"></i></li>
          <li><strong>Type de congé :</strong> ${this.data.conge.type} <i class="fa fa-suitcase"></i></li>
        </ul>
        <p>Je vous prie de bien vouloir examiner ma demande et de me notifier votre décision dans les plus brefs délais.</p>
        <p>Cordialement,</p>
        <p></p>`;
  
      this.email.body = body;

     
   
  }
  calculateDuree(debut: Date, fin: Date) {
    const dateDebut = new Date(debut);
    const dateFin = new Date(fin);

    // Calculez la différence en jours
    const differenceEnJours = Math.floor((dateFin.getTime() - dateDebut.getTime()) / (1000 * 3600 * 24))+1;

    // Mettez à jour la valeur du champ de durée


    // Mettez à jour la propriété duree du composant
    return differenceEnJours;
  }

  envoyer(){
    console.log(this.email);
    this.sendEmail();
    const id = this.data.conge.id;
    var etatModifier = 'En attente';
    this.congeservice.updateCongeEtat(id, etatModifier).subscribe(() => {
     

        this.router.navigate(['/listconge'])
  

      
      // You can also perform any other necessary operations or handle the response here
    });
    
    this.router.navigate(['/listconge']);
  }

retour(){
  if (this.data.consulterby == "bydemandeur"){
    this.router.navigate(['/listconge'])
  }

  else if (this.data.consulterby == "byvalidateur")
  {
    this.router.navigate(['/listdemandes'])

  }
  else
  {
    this.router.navigate(['/les conges'])
  }

}
  valider(congeup: Conge){
    const id = congeup.id;
    var etatModifier = 'valider';
    this.congeservice.updateCongeEtat(id, etatModifier).subscribe(() => {
      

      
        alert('Congé Valider');
        this.router.navigate(['/listdemandes'])

      
      // You can also perform any other necessary operations or handle the response here
    });
  }

  annulerDemande(congeup: Conge) {
    const id = congeup.id;
    var etatModifier = '';
    if (this.data.consulterby == "bydemandeur"){
      etatModifier = "Annuler";
    }
    else if (this.data.consulterby == "byvalidateur")
    {
      etatModifier ="rejete"
    }

    this.congeservice.updateCongeEtat(id, etatModifier).subscribe(() => {
      alert('Congé annulé');
      if (this.data.consulterby == "bydemandeur"){
        alert('Congé annulé');
        this.router.navigate(['/listconge'])
      }

      else if (this.data.consulterby == "byvalidateur")
      {
        alert('Congé refuse');
        this.router.navigate(['/listdemandes'])

      }
      // You can also perform any other necessary operations or handle the response here
    });
  }
  
  dateconvert(date: any): String {

    date = new Date(date);
    const day = date.getDay() + '-' + date.getMonth() + '-' + date.getFullYear();

    return day;
  }
  getEtatColor(etat: string): string {
    if (etat === 'En attente') {
      return '#53a8b6'; // Set the background color to blue for "En attente" state
    } else if (etat === 'pas envoyer') {
      return '#42b883'; // Set the background color to yellow for "pas envoyer" state
    } else {
      return '#f95959'; // Set the background color to red for other states
    }
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
 
}
