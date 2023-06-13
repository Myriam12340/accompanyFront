import { Component, OnInit } from '@angular/core';
import { Conge } from '../../Model/conge';
import { CongeService } from '../../service/conge.service';
import { AuthService } from '../../service/Authentication Service/auth.service';
import { ConsultantService } from '../../Model/consultant/consultant.service';
import { Consultant } from '../../Model/consultant';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailMessage } from '../../Model/email-message';
import { MailService } from '../../service/mail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {
  //declaration des variables
  demandeur:any;
  conge: Conge = new Conge();
  userProfile: any;
  demandeForm: FormGroup;
  //les donnees de consultant 
  nomconsultant: any;
  posteconsultant: any;
  emailuser: any;
  consultant: any;
  cosultantid: any;
  solde: any;
  soldemaldie: any;
  duree: number = 0;
  validateurControl = new FormControl();
  utilisateurs: any[] = [];
  term: string;
  form: FormGroup;
  val: any;
  consultants: any;
  validateur: any;
  //declaration pour partie mail 
  email: EmailMessage = {
    fromName: '',
    fromEmail: '',
    toName: '',
    toEmail: '',
    subject: '',
    body: ''
  };
  toname:string;
  constructor(private router: Router,private emailService: MailService, private congeService: CongeService, private authService: AuthService, private consultantservice: ConsultantService, private formBuilder: FormBuilder,) {
    this.form = new FormGroup({
    })
  }

  ngOnInit(): void {

    if (sessionStorage.getItem('jwt')) {
      this.authService.getUserProfile(localStorage.getItem('jwt')).subscribe(
        (userProfile) => {
          this.userProfile = userProfile;
          console.log(this.userProfile);
          this.emailuser = this.userProfile.email;
          this.email.fromEmail = this.userProfile.email;

          this.consultantservice.getConsultantbyemail(this.emailuser).subscribe(
            (response) => {
             
              this.consultant = response;
              console.log(this.consultant);
              this.nomconsultant = this.consultant.nom + " " + this.consultant.prenom;
              this.posteconsultant = this.consultant.grade + " " + this.consultant.fonction// Faites quelque chose avec les données du consultant
              this.solde = this.consultant.soldeConge;
              this.soldemaldie = this.consultant.soldeMaladie;
              this.demandeur = this.consultant.id ;
            },
            (error) => {
              console.error(error); // Gérez l'erreur de la requête
            }
          );
        },
        (error) => console.error(error)
      );
    }
    this.demandeForm = this.formBuilder.group({

      validateur: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      type: ['', Validators.required],

    }, { validators: this.dateValidation });




  }




  submitDemandeConge(besoin :string): void {
    if(besoin =="envoyer"){
    this.conge.dateDebut = this.demandeForm.get('dateDebut')?.value;
    this.conge.dateFin = this.demandeForm.get('dateFin')?.value;
    this.conge.type = this.demandeForm.get('type')?.value;
    this.conge.validateur = this.demandeForm.get('validateur')?.value;
    this.conge.demandeur = this.demandeur;
    this.conge.etat = "En attente";
    this.email.toEmail = this.demandeForm.get('validateur')?.value;

    this.consultantservice.getConsultantbyemail(this.demandeForm.get('validateur')?.value).subscribe(
      (user) => {
        this.validateur = user;
        const userId = this.validateur.id;
        console.log("m:" + this.validateur.id);
        this.conge.validateur = this.validateur.id;
        console.log(this.conge);
        this.congeService.demande(this.conge)
          .subscribe(response => {
            this.conge = new Conge();

            this.demandeForm.reset();
            // Gérer la réponse du service
            console.log(response);
          });


      });


      this.consultantservice.getConsultantbyemail(this.demandeForm.get('validateur')?.value).subscribe(
        (response) => {
          this.consultant = response;
          console.log(this.consultant);
          this.toname = this.consultant.nom + " " + this.consultant.prenom;
      
          this.email.fromName = this.userProfile.userName;
          this.email.toName = this.toname;
          this.email.subject = 'Demande de congé: 💬';
          const body = `<p>Cher <strong>${this.email.toName}</strong>,</p>
            <p>Je vous informe par la présente que je souhaite faire une demande de congé pour la période suivante :</p>
            <ul>
              <li><strong>Date de début :</strong> ${this.conge.dateDebut} <i class="fa fa-calendar"></i></li>
              <li><strong>Date de fin :</strong> ${this.conge.dateFin} <i class="fa fa-calendar"></i></li>
              <li><strong>Durée :</strong> ${this.duree} jours  <i class="fa fa-calendar"></i></li>
              <li><strong>Type de congé :</strong> ${this.conge.type} <i class="fa fa-suitcase"></i></li>
            </ul>
            <p>Je vous prie de bien vouloir examiner ma demande et de me notifier votre décision dans les plus brefs délais.</p>
            <p>Cordialement,</p>
            <p></p>`;
      
          this.email.body = body;
      
          this.sendEmail();
        },
        (error) => {
          console.error(error); // Gérez l'erreur de la requête
        }
      );
      
    }
    else if (besoin == "enregister")
    {
      this.conge.dateDebut = this.demandeForm.get('dateDebut')?.value;
      this.conge.dateFin = this.demandeForm.get('dateFin')?.value;
      this.conge.type = this.demandeForm.get('type')?.value;
      this.conge.demandeur = this.demandeur;
      this.conge.etat = "pas envoyer";
  
      this.consultantservice.getConsultantbyemail(this.demandeForm.get('validateur')?.value).subscribe(
        (user) => {
          this.validateur = user;
          const userId = this.validateur.id;
          console.log("m:" + this.validateur.id);
          this.conge.validateur = userId;
          console.log(this.conge);
          this.congeService.demande(this.conge)
            .subscribe(response => {
              this.conge = new Conge();
  
              this.demandeForm.reset();
              // Gérer la réponse du service
              console.log(response);
            });
  
  
        });
    }
    this.router.navigate(['/listconge'])
  }
 


      

  

  //pour calcler dure 
  calculateDuree(): void {
    const dateDebut = new Date(this.demandeForm.value.dateDebut);
    const dateFin = new Date(this.demandeForm.value.dateFin);

    // Calculez la différence en jours
    const differenceEnJours = Math.floor((dateFin.getTime() - dateDebut.getTime()) / (1000 * 3600 * 24))+1;

    // Mettez à jour la valeur du champ de durée
    this.demandeForm.patchValue({ duree: differenceEnJours });

    // Mettez à jour la propriété duree du composant
    this.duree = differenceEnJours;
  }
  //controle sur les dates 
  dateValidation(formGroup: FormGroup): { [key: string]: any } | null {
    const dateDebut = new Date(formGroup.get('dateDebut')?.value);
    const dateFin = new Date(formGroup.get('dateFin')?.value);

    if (dateDebut && dateFin && dateDebut > dateFin) {
      return { 'invalidDates': true };
    }

    return null;
  }
  //fonction envoy mail
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

  Annuler(){
    this.router.navigate(['/listconge'])
  }
}
