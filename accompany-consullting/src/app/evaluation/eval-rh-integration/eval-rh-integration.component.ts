import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultantService } from '../../Model/consultant/consultant.service';
import { AuthService } from '../../service/Authentication Service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EvaluationService } from '../../service/evaluation.service';
import { Evaluation } from '../../Model/evaluation';
import { EmailMessage } from '../../Model/email-message';
import { MissionService } from '../../service/mission.service';
import { EvalMissionIntegration } from '../../Model/eval-mission-integration';
import { MailService } from '../../service/mail.service';
import { ConsultantdetailComponent } from 'src/app/consultant/consultantdetail/consultantdetail.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-eval-rh-integration',
  templateUrl: './eval-rh-integration.component.html',
  styleUrls: ['./eval-rh-integration.component.css']
})
export class EvalRhIntegrationComponent implements OnInit {
  email: EmailMessage = {
    fromName: '',
    fromEmail: '',
    toName: '',
    toEmail: '',
    subject: '',
    body: '',
    CcEmail:''
    ,CcName:''
  };
  consultantnom: string;

  demo: number = 0;
  val = 50;
  min = 1;
  max = 5;
  //envoyer parmettre
  consultantData: any;
  rh: any;
  mailrh: any;
  userProfile: any;
  evaluationForm: FormGroup;

  evaluation: Evaluation = new Evaluation();
  missions: any[];
  eva: EvalMissionIntegration[];
  evaluations: EvalMissionIntegration[] = [];
  evaluationId: number;
old : boolean ;
  manager: any;
  consultant:any ;
  constructor(private missionservice: MissionService,
    private router: Router,
    private evaluationservice: EvaluationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private consultantService: ConsultantService,
    private authService: AuthService, private emailService: MailService
    ,    private dialog: MatDialog
  ) { }
  

  ngOnInit() {
    this.consultantService.getConsultantData().subscribe((data) => {
      this.consultantData = data;
      this.consultant = this.consultantData.consultantId;

      // Utilize the consultant data in the EvaluationRHComponent

    });

    // Retrieve the name of the connected user
    if (sessionStorage.getItem('jwt')) {
      this.authService.getUserProfile(localStorage.getItem('jwt')).subscribe(
        (userProfile) => {
          this.userProfile = userProfile;
          console.log(this.userProfile);
          this.rh = userProfile.userName;
          this.mailrh = userProfile.email;
        },
        (error) => console.error(error)
      );
    }

    // Create form builder
    this.evaluationForm = this.formBuilder.group({
      processusR: [],
      communication_interne: [],
      relation: [],
      rapport: [],
      outils: [],
      pt24: [],
      formation: [],
      processRH: [],
      admC: [],
      admRH: [],
      communicationC: [],
      communicationRH: [],
      esprit_equipeC: [],
      esprit_equipeRH: [],
      projet_interneC: [],
      dev_commercialC: [],
      vie_cabinetC: [],
      projet_interneRH: [],
      dev_commercialRH: [],
      vie_cabinetRH: [],
      processRH_com: [], // Nouveau champ
      formation_com: [], // Nouveau champ
      pt24_com: [], // Nouveau champ
      outils_com: [], // Nouveau champ
      rapport_com: [], // Nouveau champ
      relation_com: [], // Nouveau champ
      communication_interne_com: [], // Nouveau champ
      processusR_com: [] // Nouveau champ
      , suggestion: [],
      ////////////////les champs de class eval-mission-integration////////////////////////////////


      roleC: ['', Validators.required],
      roleRH: ['', Validators.required],
      relationClientRH: ['', Validators.required],
      relationClientC: ['', Validators.required],
      chargeRH: ['', Validators.required],
      chargeC: ['', Validators.required],
      satisficationRH: ['', Validators.required],
      satisficationC: ['', Validators.required],







    });


    this.missionservice.getlistmissionconsultant(this.consultantData.consultantId).subscribe(
      (data) => {
        this.missions = data;
        this.missions.forEach((mission) => {
           this.missionservice.getevalintegrationbyMission(mission.id).subscribe(

            (evaluationM:any)=>{
              if (evaluationM) { // Check if evaluation data exists

                console.log("testet",evaluationM.feedbackManager);
           if (evaluationM.feedbackManager == null && evaluationM.noteManager == null )
           {
            mission.old = true;
           } 
          }
       


            },
            (error) => {
              if (error.status === 404) {
                console.log(`No evaluation found for mission ${mission.id}`);
                mission.old = true;

                // Handle this case if needed
              } else {
                console.log('An error occurred while fetching evaluation:', error);
              }
            }
           );



          this.consultantService.getConsultant2(mission.manager).subscribe(
            (consultant: any) => {
              mission.nomManager = consultant.nom + ' ' + consultant.prenom;
              mission.manageremail = consultant.mail;


            },
            (error) => {
              console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
            }
          );
        });
      },
      (error) => {
        console.error('An error occurred while fetching missions:', error);
      }
    );
  }

  onMouseEnter() {
    console.log('Mouse entered the "Consulter" button');
    this.onconsulte();
    // Vous pouvez ajouter ici le code que vous souhaitez exécuter lorsque la souris entre sur le bouton "Consulter"
  }

  onMouseLeave() {
    console.log('Mouse left the "Consulter" button');
    // Vous pouvez ajouter ici le code que vous souhaitez exécuter lorsque la souris quitte le bouton "Consulter"
  }


  onconsulte(): void {
    console.log(this.consultant);
    this.consultantService.getConsultant2(this.consultant)
      .subscribe(
        (data) => {
          const selectedConsultant = data;
          console.log(selectedConsultant);
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = { consultant: selectedConsultant };
          dialogConfig.width = '1000px'; // Définir la largeur de la boîte de dialogue
         dialogConfig. height= '800px';

         dialogConfig.autoFocus = true;

          const dialogRef = this.dialog.open(ConsultantdetailComponent, dialogConfig);

          dialogRef.afterClosed().subscribe(result => {
            // Handle any actions after the dialog is closed, if needed
            console.log('Dialog closed', result);
          });
        },
        (error) => {
          console.log('An error occurred while fetching the consultant:', error);
        }
      );
  }






  onSubmit() {
    // Handle form submission
    console.log(this.evaluationForm.value);

    // Assign form values to evaluation object

    this.evaluation.processusR = this.evaluationForm.get('processusR')?.value;
    this.evaluation.communicationinterne = this.evaluationForm.get('communication_interne')?.value;
    this.evaluation.relation = this.evaluationForm.get('relation')?.value;
    this.evaluation.rapport = this.evaluationForm.get('rapport')?.value;
    this.evaluation.outils = this.evaluationForm.get('outils')?.value;
    this.evaluation.pt24 = this.evaluationForm.get('pt24')?.value;
    this.evaluation.formation = this.evaluationForm.get('formation')?.value;
    this.evaluation.processRH = this.evaluationForm.get('processRH')?.value;
    this.evaluation.admC = this.evaluationForm.get('admC')?.value;
    this.evaluation.admRH = this.evaluationForm.get('admRH')?.value;
    this.evaluation.communicationC = this.evaluationForm.get('communicationC')?.value;
    this.evaluation.communicationRH = this.evaluationForm.get('communicationRH')?.value;
    this.evaluation.espritequipeC = this.evaluationForm.get('esprit_equipeC')?.value;
    this.evaluation.espritequipeRH = this.evaluationForm.get('esprit_equipeRH')?.value;
    this.evaluation.projetinterneC = this.evaluationForm.get('projet_interneC')?.value;
    this.evaluation.devcommercialC = this.evaluationForm.get('dev_commercialC')?.value;
    this.evaluation.viecabinetC = this.evaluationForm.get('vie_cabinetC')?.value;
    this.evaluation.projetinterneRH = this.evaluationForm.get('projet_interneRH')?.value;
    this.evaluation.devcommercialRH = this.evaluationForm.get('dev_commercialRH')?.value;
    this.evaluation.viecabinetRH = this.evaluationForm.get('vie_cabinetRH')?.value;
    this.evaluation.hr = this.userProfile.id;
    this.evaluation.consultant = this.consultantData.consultantId;
    this.evaluation.type_eval = this.consultantData.evaluationType;
    this.evaluation.processRH_com = this.evaluationForm.get('processRH_com')?.value;
    this.evaluation.formation_com = this.evaluationForm.get('formation_com')?.value;
    this.evaluation.pt24_com = this.evaluationForm.get('pt24_com')?.value;
    this.evaluation.outils_com = this.evaluationForm.get('outils_com')?.value;
    this.evaluation.rapport_com = this.evaluationForm.get('rapport_com')?.value;
    this.evaluation.relation_com = this.evaluationForm.get('relation_com')?.value;
    this.evaluation.communication_interne_com = this.evaluationForm.get('communication_interne_com')?.value;
    this.evaluation.processusR_com = this.evaluationForm.get('processusR_com')?.value;
    this.evaluation.suggestion = this.evaluationForm.get('suggestion')?.value;
    console.log(this.evaluation);

    this.evaluationservice.addeval(this.evaluation).subscribe(
      (response) => {
        console.log('Evaluation added successfully!');
        // Reset the form
        this.evaluation = new Evaluation();
        this.evaluationId = response.id; // Storing the evaluation ID

        this.evaluationForm.reset();
        this.router.navigate(['/evaluation']);
console.log("hhhh",this.evaluationId);
        // Pass the evaluation ID to the MissionComponent

        // Call the submitForm method in MissionComponent

     
    this.missions.forEach((mission) => {
      const evalMissionIntegration: any = {
        // Assign properties based on the evaluationForm values
        roleC: this.evaluationForm.get('roleC')?.value,
        roleRH: this.evaluationForm.get('roleRH')?.value,
        relationClientRH: this.evaluationForm.get('relationClientRH')?.value,
        relationClientC: this.evaluationForm.get('relationClientC')?.value,
        chargeRH: this.evaluationForm.get('chargeRH')?.value,
        chargeC: this.evaluationForm.get('chargeC')?.value,
        satisficationRH: this.evaluationForm.get('satisficationRH')?.value,
        satisficationC: this.evaluationForm.get('satisficationC')?.value,
        consultant: this.consultantData.consultantId,
        manager: mission.manager,
        mission: mission.id,
        evaluation: this.evaluationId 
      };
      const emailBody = `
    <div style="color: #333; font-family: Arial, sans-serif;">
      <p>Cher responsable d'équipe,</p>
  
      <p>J'ai effectué une évaluation pour la mission <strong>${mission.titre}</strong> de l'un de vos membres d'équipe :</p>
  
      <ul>
        <li><strong>Référent :</strong> ${ this.consultantData.nom } ${this.consultantData.prenom }}</li>
        <li><strong>Évaluation du rôle :</strong> ${this.evaluationForm.get('roleC')?.value} (Consultant) / ${this.evaluationForm.get('roleRH')?.value} (RH)</li>
        <li><strong>Évaluation de la relation avec le client :</strong> ${this.evaluationForm.get('relationClientC')?.value} (Consultant) / ${this.evaluationForm.get('relationClientRH')?.value} (RH)</li>
        <li><strong>Évaluation de la charge :</strong> ${this.evaluationForm.get('chargeC')?.value} (Consultant) / ${this.evaluationForm.get('chargeRH')?.value} (RH)</li>
        <li><strong>Évaluation de la satisfaction globale :</strong> ${this.evaluationForm.get('satisficationC')?.value} (Consultant) / ${this.evaluationForm.get('satisficationRH')?.value} (RH)</li>
      </ul>
      <p style="color:#e80000; font-family: Arial, sans-serif;" >Je vous prie de bien vouloir terminer l'évaluation de la mission ${mission.titre} . Il est essentiel d'obtenir votre précieuse contribution pour évaluer les performances de notre membre d'équipe.

      Votre achèvement rapide de l'évaluation est grandement apprécié.</p>
      
     <p> Je vous remercie de votre coopération.</p>
  
      <p>Cordialement,</p>
      <p>${this.rh}</p>
    </div>
  `;
      const email: EmailMessage = {
        fromName: this.rh,
        fromEmail: this.mailrh,
        toName: mission.nomManager,
        toEmail: mission.manageremail,
        subject: 'Evaluation de mission',

        body: emailBody,
        CcEmail:''
        ,CcName:''
      };
      console.log(email);
      this.email = email; // Assign the email to a property

      
      this.sendEmail();
    
      // Add the evaluation to the evaluations array
      this.evaluations.push(evalMissionIntegration);
      this.missionservice.addeval_integration_Mission(evalMissionIntegration).subscribe(
        (response) => {
          console.log('EvalMissionIntegration added successfully!');
          // Reset the form
          this.evaluationForm.reset();

          // Pass the response or any other necessary data to the next steps
          // ...
        },
        (error) => {
          console.log('An error occurred while adding the EvalMissionIntegration:', error);
        }
      );
    });
    
  },
  (error) => {
    console.log('An error occurred while adding the evaluation:', error);
  }
);
   
  }

  annuler() {
    this.router.navigate(['/evaluation']);
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
