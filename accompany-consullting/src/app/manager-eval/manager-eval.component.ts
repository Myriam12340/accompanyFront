import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mission } from '../mission';
import { MissionService } from '../service/mission.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MailService } from '../service/mail.service';
import { AuthService } from '../service/Authentication Service/auth.service';
import { EmailMessage } from '../Model/email-message';
import { EvaluationService } from '../service/evaluation.service';

@Component({
  selector: 'app-manager-eval',
  templateUrl: './manager-eval.component.html',
  styleUrls: ['./manager-eval.component.css']
})
export class ManagerEvalComponent implements OnInit {
  missionForm: FormGroup;
  mission: Mission;
  idconsultant: any;
  userProfile:any;
  email: EmailMessage = {
    fromName: '',
    fromEmail: '',
    toName: '',
    toEmail: '',
    subject: '',
    body: ''
  };

  updatem : Mission ;


  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private missionService: MissionService,private emailService: MailService,private authService: AuthService,private evaluationService: EvaluationService
  ) {
    this.mission = new Mission();
    this.missionForm = this.formBuilder.group({
   
      id: [null, Validators.required],
      consultant: [null, Validators.required],
      manager: [null, Validators.required],
      titre: [null],
      roleRH: [''],
      roleC: [''],
      relationClientRH: [''],
      relationClientC: [''],
      chargeRH: [''],
      chargeC: [''],
      satisficationRH: [''],
      satisficationC: [''],
      noteManager: [null],
      feedbackManager: [''],
      evaluation:['']
    });
  }

  ngOnInit(): void {
    
    this.route.queryParams.subscribe((params) => {
      const missionid = params['missionid'].trim();
      console.log("ttt" + missionid);
      this.idconsultant = missionid;
      // Utilisez l'ID du consultant comme nécessaire
    });
    if (sessionStorage.getItem("jwt")) {
      this.authService.getUserProfile(localStorage.getItem("jwt")).subscribe(
        userProfile => {
          this.userProfile = userProfile;
          console.log(this.userProfile);
        },
        error => console.error(error)
      );

    }
    
    // Utilisez l'ID du consultant comme nécessaire

    // Charger les données de la mission à modifier (par exemple, à partir d'un service)
    this.loadMissionData();
   
  }

  loadMissionData(): void {
    this.missionService.getMission(this.idconsultant).subscribe(
      (mission: Mission) => {
        console.log(mission); // Vérifiez les données reçues ici
        this.mission = mission;
        this.missionForm.patchValue(mission);
        const evaluationId = this.mission.evaluation;

        this.evaluationService.getUserEmailByEvaluationId(evaluationId)
         .subscribe(
           email => {
             console.log('Email de l\'utilisateur:', email);
             this.email.toEmail = email;
             console.log('to'+this.email.toEmail)
           },
           error => {
             console.log('Erreur lors de la récupération de l\'e-mail:', error);
           }
         );
      },
      (error) => {
        console.log("Une erreur s'est produite lors du chargement de la mission :", error);
      }
    );
  }

  async onclique() {
    this.missionForm.markAllAsTouched(); // marquer tous les champs comme touchés
    if (this.missionForm.valid) { // vérifier si le formulaire est valide
      const updatedMission = this.missionForm.value;
      updatedMission.id = this.idconsultant;
  
      this.missionService.updateMission(this.idconsultant, updatedMission).subscribe(
        async () => {
  
        
          this.router.navigate(['/list_missions']).then(() => {
            window.location.reload();
          });
  
          await this.snackBar.open("Consultant modifié avec succès", "test", {
            duration: 40000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });
        },
        (error) => {
          console.log('Error updating consultant:', error);
        }
      );
    } else {
      console.log("Le formulaire n'a pas été rempli correctement");
      await this.snackBar.open("Le formulaire n'a pas été rempli correctement", "bg-success", {
        duration: 40000,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    }
  
    this.email.fromName = this.userProfile.userName;
    this.email.fromEmail = this.userProfile.email; // Update with appropriate value
    this.email.toName = 'Responsable des ressources humaines';
    // Update with appropriate value
  
    const body = `<p style="color: #333333;">Cher responsable des ressources humaines,</p>
      <p style="color: #333333;">L'évaluation de la mission "<span style="color: #0066cc;">${this.mission.titre}</span>" a été réalisée par <span style="color: #0066cc;">${this.userProfile.userName}</span>.</p>
      <p style="color: #333333;">Détails de la mission :</p>
      <ul>
        <li><span style="color: #0066cc;">Rôle RH :</span> ${this.mission.roleRH}</li>
        <li><span style="color: #0066cc;">Rôle Consultant :</span> ${this.mission.roleC}</li>
        <li><span style="color: #0066cc;">Relation Client (RH) :</span> ${this.mission.relationClientRH}</li>
        <li><span style="color: #0066cc;">Relation Client (Consultant) :</span> ${this.mission.relationClientC}</li>
        <li><span style="color: #0066cc;">Charge (RH) :</span> ${this.mission.chargeRH}</li>
        <li><span style="color: #0066cc;">Charge (Consultant) :</span> ${this.mission.chargeC}</li>
        <li><span style="color: #0066cc;">Satisfaction (RH) :</span> ${this.mission.satisficationRH}</li>
        <li><span style="color: #0066cc;">Satisfaction (Consultant) :</span> ${this.mission.satisficationC}</li>
      </ul>
      <p style="color: #333333;">J'ai le plaisir de vous présenter ma précieuse évaluation :</p>
      <ul>
      <li><span style="color: #0066cc;">Note :</span>  ${this.missionForm.get('noteManager')?.value}</li>
      <li><span style="color: #0066cc;">Feedback :</span>  ${this.missionForm.get('feedbackManager')?.value}</li>
      </ul>
      <p style="color: #333333;">Veuillez prendre en compte cette évaluation pour les prochaines étapes.</p>
      <p style="color: #333333;">Cordialement,<br>${this.userProfile.userName}</p>`;
  this.email.body = body ; 
    this.email.subject = 'Evaluation de mission : ⭐';
  
    this.sendEmail();
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
  annuler(){
    this.router.navigate(['/list_missions'])}
}