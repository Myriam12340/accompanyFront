import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
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
  @Input() evaluationId: number ;

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
     
    });


  }

  submitForm( ) {
    
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
    
    };
  
    const emailBody = `
   
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
