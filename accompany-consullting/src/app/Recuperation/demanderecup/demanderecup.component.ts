import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subject, forkJoin } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Conge } from 'src/app/Model/conge';
import { ConsultantService } from 'src/app/Model/consultant/consultant.service';
import { EmailMessage } from 'src/app/Model/email-message';
import { Recuperation } from 'src/app/Model/recuperation';
import { PasswordDialogComponent } from 'src/app/parametres/password-dialog/password-dialog.component';
import { AuthService } from 'src/app/service/Authentication Service/auth.service';
import { CongeService } from 'src/app/service/conge.service';
import { MailService } from 'src/app/service/mail.service';
import { RecuperationService } from 'src/app/service/recuperation.service';

@Component({
  selector: 'app-demanderecup',
  templateUrl: './demanderecup.component.html',
  styleUrls: ['./demanderecup.component.css']
})
export class DemanderecupComponent implements OnInit {
  userProfile: any;
  demandeForm: FormGroup;
  demandegrForm: FormGroup;

  //les donnees de consultant 
  nomconsultant: any;
  posteconsultant: any;
  emailuser: any;
  consultant: any;
  demandeur:any;

  validateur:any;
  validateurname:any;
  validateursex:any;
  
  consultantControls: { email: FormControl; dateDebut: FormControl; dateFin: FormControl; duree: FormControl ; commentaire:FormControl ;}[] = [];
  duree: number ;
 requp:Recuperation;
 
 showPersonnelForm = true;
 showGroupeForm = false;
 nombreDeGroupes: number;

demandegroupe :Recuperation;
validateurgroupe:any;
 nombreDeConsultants: number = 0;
 afficherLeFormulaire: boolean = false;
 personnel:any;
 role: any ;
 private destroy$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef, private emailService: MailService, private Recuperationservice :RecuperationService  ,private consultantservice: ConsultantService,private fb: FormBuilder, private authService: AuthService) { 
    this.requp = new Recuperation();
    this.demandegroupe = new Recuperation();

  }
 

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
  onNbConsultantsChange(): void {
    const nbConsultants = this.demandegrForm.get('nbConsultants')?.value;
  
    if (nbConsultants > this.consultantControls.length) {
      for (let i = this.consultantControls.length; i < nbConsultants; i++) {
        const emailControl = new FormControl('', [Validators.required, Validators.email]);
        const dateDebutControl = new FormControl('');
      
        const dateFinControl = new FormControl('');

        const dureeControl = new FormControl(''); // Ajout du contrôle pour la durée
        const commentaireControl = new FormControl('');
  
        // Ajout de la logique de calcul pour la durée
        dateDebutControl.valueChanges.subscribe(() => {
          this.calculateDureegroupe(i);
        });
  
        dateFinControl.valueChanges.subscribe(() => {
          this.calculateDureegroupe(i);
        });
  
        this.consultantControls.push({ email: emailControl, dateDebut: dateDebutControl, dateFin: dateFinControl, duree: dureeControl, commentaire: commentaireControl });
  
        this.demandegrForm.addControl(`emailConsultant${i}`, emailControl);
        this.demandegrForm.addControl(`datedebut${i}`, dateDebutControl);
        this.demandegrForm.addControl(`datefin${i}`, dateFinControl);
        this.demandegrForm.addControl(`duree${i}`, dureeControl);
        this.demandegrForm.addControl(`commentaire${i}`, commentaireControl);
      }
    } else if (nbConsultants < this.consultantControls.length) {
      for (let i = this.consultantControls.length - 1; i >= nbConsultants; i--) {
        this.consultantControls.pop();
        this.demandegrForm.removeControl(`emailConsultant${i}`);
        this.demandegrForm.removeControl(`datedebut${i}`);
        this.demandegrForm.removeControl(`datefin${i}`);
        this.demandegrForm.removeControl(`duree${i}`);
      }
    }
  }
  calculateDureegroupe(index: number): void {
    const dateDebut = new Date(this.demandegrForm.get(`datedebut${index}`)?.value);
    const dateFin = new Date(this.demandegrForm.get(`datefin${index}`)?.value);
  
    // Calculez la différence en jours
    const differenceEnJours = Math.floor((dateFin.getTime() - dateDebut.getTime()) / (1000 * 3600 * 24))+1;
  
    // Mettez à jour la valeur du champ de durée
    
  this.demandegrForm.get(`duree${index}`)?.setValue(differenceEnJours);
    // Mettez à jour la propriété duree du composant
  }
  
  
  

  // ...
  
  onadd() {
    const numeroDemande = Math.floor(Math.random() * 1000000) + 1;
    const consultantsDetails: string[] = [];
  
    this.consultantservice.getConsultantbyemail(this.demandegrForm.get(`validateur`)?.value).subscribe(
      (user: any) => {
        this.validateurgroupe = user.id;
        this.validateurname = user.nom +" " + user.prenom;
        this.validateursex = user.genre;
      },
      (error) => {
        console.error('Error fetching validator details:', error);
      }
    );
  
    const nbConsultants = this.demandegrForm.get('nbConsultants')?.value;
    const observables: Observable<any>[] = [];
  
    for (let i = 0; i < nbConsultants; i++) {
      const email = this.demandegrForm.get(`emailConsultant${i}`)?.value;
      const observable = this.consultantservice.getConsultantbyemail(email);
      observables.push(observable);
    }
  
    forkJoin(observables).subscribe(
      (responses: any[]) => {
        responses.forEach((response, i) => {
          this.personnel = response;
  
          const email = this.demandegrForm.get(`emailConsultant${i}`)?.value;
          const datedebut = this.demandegrForm.get(`datedebut${i}`)?.value;
          const datefin = this.demandegrForm.get(`datefin${i}`)?.value;
  
          this.demandegroupe.validateur = this.validateurgroupe;
          this.demandegroupe.commentaire = this.demandegrForm.get(`commentaire${i}`)?.value;
          this.demandegroupe.dateDebut = datedebut;
          this.demandegroupe.dateFin = datefin;
          const dateDebut = new Date(datedebut);
          const dateFin = new Date(datefin);
          this.demandegroupe.numeroDemande = numeroDemande;
  
          const differenceEnJours = Math.floor((dateFin.getTime() - dateDebut.getTime()) / (1000 * 3600 * 24)) + 1;
          this.demandegroupe.duree = differenceEnJours;
          this.demandegroupe.type = "groupe";
          this.demandegroupe.etat = "Encours";
          this.demandegroupe.demandeur = this.personnel.id;
          this.demandegroupe.manager =  this.emailuser ;
  
          const consultantDetail = `
            <tr>
              <td>${i + 1}</td>
              <td>${email}</td>
              <td>${this.demandegroupe.dateDebut}</td>
              <td>${this.demandegroupe.dateFin}</td>
              <td>${differenceEnJours}</td>
              <td>${this.demandegroupe.commentaire}</td>
            </tr>
          `;
          consultantsDetails.push(consultantDetail);
  
          this.Recuperationservice.addRequip(this.demandegroupe).subscribe(
            (response) => {
              console.log(`Consultant ${i + 1} - Service Response:`, response);
              this.demandegroupe = new Recuperation();
            },
            (error) => {
              console.error(`Consultant ${i + 1} - Service Error:`, error);
            }
          );
        });
        const validateurGenre = this.validateursex.toLowerCase() === 'masculin' ? 'cher' : 'chère';
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        
        const emailBody = `
          <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #007BFF;">Détails des demandes de récupération</h2>
            <p style="font-size: 18px;">${validateurGenre } ${this.validateurname},</p>
            <p>Vous avez reçu une nouvelle demande de récupération : Demande ${this.demandegroupe.type} effectuée le ${formattedDate}</p>
            <p>Voici les détails de demande de récupération :</p>
            
            <table border="1" style="border-collapse: collapse; width: 100%;">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Date Début</th>
                  <th>Date Fin</th>
                  <th>Durée</th>
                  <th>Commentaire</th>
                </tr>
              </thead>
              <tbody>
                ${consultantsDetails.join('')}
              </tbody>
            </table>
  
            <p>Cordialement,</p>
            <p>${this.nomconsultant}</p>
          </div>
        `;
        
        this.email.body = emailBody;
        this.email.toEmail = this.demandegrForm.get(`validateur`)?.value;
        this.email.toName = "mariem ksouri";
        this.email.subject = "Demande de récupération";
        this.sendEmail();
        this.demandegrForm.reset();

      },
      (error) => {
        console.error('Error fetching consultant details:', error);
      }
    );
  }
  
  
  
  
  





//////////////////commun
ngOnInit(): void {

  this.demandegrForm = this.fb.group({
    demandeur: ['', Validators.required],
   validateur: ['', Validators.required],

    dateDebut: ['', Validators.required],
    dateFin: ['', Validators.required],
    type: ['', Validators.required],
    etat: ['', Validators.required],
    duree: ['', Validators.required],
    commentaire: [''],
    nbConsultants: [0, [Validators.required, Validators.min(0)], ],
  });


  
  this.demandeForm = this.fb.group({
    demandeur: ['', Validators.required],
    validateur: ['', Validators.required],
    dateDebut: ['', Validators.required],
    dateFin: ['', Validators.required],
    type: ['', Validators.required],
    etat: ['', Validators.required],
 
    duree: ['', Validators.required],
    commentaire: [''],
    nbConsultants: [0, [Validators.required, Validators.min(0)], ],

  });

  if (sessionStorage.getItem('jwt')) {
    this.authService.getUserProfile(localStorage.getItem('jwt')).subscribe(
      (userProfile) => {
        this.userProfile = userProfile;
        console.log(this.userProfile);
        this.emailuser = this.userProfile.email;
        this.role = this.userProfile.role;
       
        this.consultantservice.getConsultantbyemail(this.emailuser).subscribe(
          (response) => {
           
            this.consultant = response;
            console.log(this.consultant);
            this.nomconsultant = this.consultant.nom + " " + this.consultant.prenom;
            this.posteconsultant = this.consultant.grade + " " + this.consultant.fonction// Faites quelque chose avec les données du consultant
           
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


  this.onNbConsultantsChange(); // Update consultant controls initially
    this.demandegrForm.get('nbConsultants')?.valueChanges.subscribe(() => {
      this.onNbConsultantsChange(); // Update consultant controls when nbConsultants value changes
    });

}





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

























//one requp


///pour button 
togglePersonnelForm() {
  this.showPersonnelForm = true;
  this.showGroupeForm = false;
}
 
onSubmit() {
  console.log(this.demandeForm.value);
  this.requp.commentaire = this.demandeForm.get('commentaire')?.value;
  this.requp.demandeur = this.demandeur;
  this.requp.type = "Personnel";
  this.requp.etat="Encours";
  this.requp.dateDebut=this.demandeForm.get('dateDebut')?.value;
  this.requp.dateFin=this.demandeForm.get('dateFin')?.value;
  this.requp.duree=this.demandeForm.get('duree')?.value;

  this.consultantservice.getConsultantbyemail(this.demandeForm.get('validateur')?.value).subscribe(
    (user:any) => {
      this.validateur = user;
      this.validateursex = user.genre;
      this.validateurname = user.nom + " " +user.prenom
      const userId = this.validateur.id;

      const validateurGenre = this.validateursex.toLowerCase() === 'masculin' ? 'cher' : 'chère';

      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
      
      

    const emailBody = `
  <div style="font-family: Arial, sans-serif; color: #050505; max-width: 600px; margin: 0 auto; background-color: #f4f4f4; padding: 20px; border-radius: 10px;">
    <h2 style="color: #007BFF;">Nouvelle demande de récupération</h2>

    <p style="font-size: 18px;">${validateurGenre } ${this.validateurname},</p>

    <p style="margin-bottom: 20px;">Vous avez reçu une nouvelle demande de récupération :</p>

    <ul style="list-style-type: none; padding: 0;">
      <li style="margin-bottom: 10px;"><strong>Commentaire:</strong> ${this.requp.commentaire}</li>
      <li style="margin-bottom: 10px;"><strong>Demandeur:</strong> ${this.nomconsultant}</li>
      <li style="margin-bottom: 10px;"><strong>Type:</strong> ${this.requp.type}</li>
      <li style="margin-bottom: 10px;"><strong>Date de début:</strong> ${this.requp.dateDebut}</li>
      <li style="margin-bottom: 10px;"><strong>Date de fin:</strong> ${this.requp.dateFin}</li>
      <li style="margin-bottom: 10px;"><strong>Durée:</strong> ${this.requp.duree} jours</li>
      <li style="margin-bottom: 10px;"><strong>Validateur:</strong> ${this.demandeForm.get('validateur')?.value}</li>
    </ul>

    <p style="margin-top: 20px; font-size: 16px; color: #555;">Cordialement,</p>
    <p style="font-size: 16px; color: #555;">${this.nomconsultant}</p>
  </div>
`;

    this.email.body = emailBody;
 
    this.email.toEmail = this.demandeForm.get('validateur')?.value;
    this.email.subject= "demande de récupération";
    
      this.email.body = emailBody;
 
      this.email.toEmail = this.demandeForm.get('validateur')?.value;
      console.log("m:" + this.validateur.id);
      this.requp.validateur = userId;
      this.Recuperationservice.demande(this.requp)
      .subscribe(response => {
        this.requp= new Recuperation();
        console.log("Consultant dd- Service Response:", response);
        this.sendEmail();
        this.demandeForm.reset();
        // Gérer la réponse du service
        console.log(response);
      });


    });



}



///////pour demande de groupe 
//for button
toggleGroupeForm() {
    this.showPersonnelForm = false;
    this.showGroupeForm = true;
  }


 
  
  


 
  
  
 


  
}