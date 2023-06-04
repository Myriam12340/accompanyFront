import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MissionService } from '../service/mission.service';
import { Mission } from '../mission';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../service/Authentication Service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ConsultantService } from '../Model/consultant/consultant.service';
import { Consultant } from '../Model/consultant';
import { EmailMessage } from '../Model/email-message';
import { MailService } from '../service/mail.service';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {
  formCount = 2 ;

  consultantData: any;
  missionForms: FormGroup[] = [];

  missionForm: FormGroup;
  mission: Mission = new Mission();
  m: any;
  consultant: number;
  consultantnom : string;
  consultantprenom : string;
  grade : string ;
rh : any ; 
consultantinfo : any ;
  userProfile:any;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private f: FormBuilder,
private consultantservice : ConsultantService,
    private Missionservice: MissionService,
    private authService: AuthService,
    private router: Router, private consultantService: ConsultantService,private emailService: MailService
  ) {}
  email: EmailMessage = {
    fromName: '',
    fromEmail: '',
    toName: '',
    toEmail: '',
    subject: '',
    body: ''
  };
  ngOnInit(): void {



    
    this.consultantService.getConsultantData().subscribe(data => {
      this.consultantData = data;

      // Utilisez les données du consultant dans le composant EvaluationRHComponent
    });

    this.route.queryParams.subscribe((params) => {
      const consultantId = params['consultantId '];
      const nom = params['nom'];
      const prenom = params['prenom'];
      const grade = params['grade'];
      console.log(consultantId);
      this.consultant = consultantId;
      this.consultantnom = nom ;
      this.consultantprenom = prenom ;
      this.grade = grade ;
      if (sessionStorage.getItem("jwt")) {
        this.authService.getUserProfile(localStorage.getItem("jwt")).subscribe(
          userProfile => {
            this.userProfile = userProfile;
            console.log(this.userProfile);
            this.rh= userProfile.userName;
          },
          error => console.error(error)
        );
      }
      // Utilisez l'ID du consultant comme nécessaire
    });


    this.consultantservice.getConsultant(this.consultant).subscribe(
      (user) => {
        this.consultantinfo = user
        console.log("info"+ this.consultantinfo.nom);
      });








    this.missionForm = this.fb.group({
      manager: [''],
      titre: ['', Validators.required],
      roleC: ['', Validators.required],
      roleRH: ['', Validators.required],
      relationClientRH: ['', Validators.required],
      relationClientC: ['', Validators.required],
      chargeRH: ['', Validators.required],
      chargeC: ['', Validators.required],
      satisficationRH: ['', Validators.required],
      satisficationC: ['', Validators.required],
      noteManager: [''],
      feedbackManager: [''],
    });


  }

  submitForm() {
    this.mission.chargeC = this.missionForm.get('chargeC')?.value;
    this.mission.chargeRH = this.missionForm.get('chargeRH')?.value;
    this.mission.relationClientC = this.missionForm.get('relationClientC')?.value;
    this.mission.relationClientRH = this.missionForm.get('relationClientRH')?.value;
    this.mission.roleC = this.missionForm.get('roleC')?.value;
    this.mission.roleRH = this.missionForm.get('roleRH')?.value;
    this.mission.feedbackManager = this.missionForm.get('feedbackManager')?.value;
    this.mission.satisficationC = this.missionForm.get('satisficationC')?.value;
    this.mission.satisficationRH = this.missionForm.get('satisficationRH')?.value;
    this.mission.titre = this.missionForm.get('titre')?.value;
    this.mission.consultant = this.consultantData.consultantId;
  
    this.authService.getUserByEmail(this.missionForm.get('manager')?.value).subscribe(
      (user) => {
        this.m = user;
        const userId = this.m.id;
        console.log("m:" + this.m.id);
        this.mission.manager = userId;
  
        // Effectuez l'ajout de la mission ici, une fois que vous avez l'ID du manager
        this.Missionservice.addMission(this.mission).subscribe(
          response => {
            console.log('Mission ajoutée avec succès !');
            // Réinitialiser le formulaire
            this.mission = new Mission();
            this.missionForm.reset();
          },
          error => {
            console.log('Une erreur s\'est produite lors de l\'ajout de la mission :', error);
          }
        );
      },
      (error) => {
        console.log('Error getting user by email:', error);
      }
    );
  
    this.email.fromName = this.rh;
    this.email.fromEmail = this.userProfile.email; // Update with appropriate value
    this.email.toName = 'Manager'; // Update with appropriate value
    this.email.toEmail = this.missionForm.get('manager')?.value;
    this.email.subject = 'Evaluation de mission : ⭐ ' + this.missionForm.get('titre')?.value; // Update with appropriate value
  
    const missionTitre = this.missionForm.get('titre')?.value;
    const consultantNom = this.consultantData.nom;
    const consultantPrenom = this.consultantData.prenom;
    const evaluationCriteria = {
      roleC: this.missionForm.get('roleC')?.value,
      roleRH: this.missionForm.get('roleRH')?.value,
      relationClientC: this.missionForm.get('relationClientC')?.value,
      relationClientRH: this.missionForm.get('relationClientRH')?.value,
      chargeC: this.missionForm.get('chargeC')?.value,
      chargeRH: this.missionForm.get('chargeRH')?.value,
      satisficationC: this.missionForm.get('satisficationC')?.value,
      satisficationRH: this.missionForm.get('satisficationRH')?.value
    };
  
    const emailBody = `
      <div style="color: #333; font-family: Arial, sans-serif;">
        <p>Cher responsable d'équipe,</p>
    
        <p>J'ai effectué une évaluation pour la mission <strong>${missionTitre}</strong> de l'un de vos membres d'équipe :</p>
    
        <ul>
          <li><strong>Référent :</strong> ${consultantNom} ${consultantPrenom}</li>
          <li><strong>Évaluation du rôle :</strong> ${evaluationCriteria.roleC} (Consultant) / ${evaluationCriteria.roleRH} (RH)</li>
          <li><strong>Évaluation de la relation avec le client :</strong> ${evaluationCriteria.relationClientC} (Consultant) / ${evaluationCriteria.relationClientRH} (RH)</li>
          <li><strong>Évaluation de la charge :</strong> ${evaluationCriteria.chargeC} (Consultant) / ${evaluationCriteria.chargeRH} (RH)</li>
          <li><strong>Évaluation de la satisfaction globale :</strong> ${evaluationCriteria.satisficationC} (Consultant) / ${evaluationCriteria.satisficationRH} (RH)</li>
        </ul>
        <p style="color:#e80000; font-family: Arial, sans-serif;" >Je vous prie de bien vouloir terminer l'évaluation de la mission ${missionTitre} . Il est essentiel d'obtenir votre précieuse contribution pour évaluer les performances de notre membre d'équipe.

        Votre achèvement rapide de l'évaluation est grandement apprécié.</p>
        
       <p> Je vous remercie de votre coopération.</p>
    
        <p>Cordialement,</p>
        <p>${this.rh}</p>
      </div>
    `;
    this.email.body = emailBody;

    this.sendEmail();
  
    // ... other existing code ...
  }
  
  
  
  addForm() {
    this.formCount++;
    const newForm = this.fb.group({
      manager: [''],
      titre: ['', Validators.required],
      roleC: ['', Validators.required],
      roleRH: ['', Validators.required],
      relationClientRH: ['', Validators.required],
      relationClientC: ['', Validators.required],
      chargeRH: ['', Validators.required],
      chargeC: ['', Validators.required],
      satisficationRH: ['', Validators.required],
      satisficationC: ['', Validators.required],
      noteManager: [''],
      feedbackManager: [''],
    });
    this.missionForms.push(newForm);
  }

  sendEmail() {
    this.emailService.sendEmail(this.email).subscribe(
      () => {
        console.log('Email sent successfully');
       
      
      


      },
      (error) => {
        console.log('Error sending email:', error);
      }
    );
  }
}
