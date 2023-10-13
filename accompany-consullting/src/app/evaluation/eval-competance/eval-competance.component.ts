import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultantService } from '../../Model/consultant/consultant.service';
import { EvaluationService } from '../../service/evaluation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EvalComp } from '../../Model/eval-comp';
import { AuthService } from '../../service/Authentication Service/auth.service';
import { Mission } from '../../mission';
import { MissionService } from '../../service/mission.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConsultantdetailComponent } from '../../consultant/consultantdetail/consultantdetail.component';
import { EvalMissionIntegration } from '../../Model/eval-mission-integration';

@Component({
  selector: 'app-eval-competance',
  templateUrl: './eval-competance.component.html',
  styleUrls: ['./eval-competance.component.css']
})
export class EvalCompetanceComponent implements OnInit {
  managers: any[] = [];
  missions: EvalMissionIntegration[] = [];
  consultantData: any;
  evaluationForm: FormGroup;
  userProfile: any;
  hr: any;
  evaluation: EvalComp = new EvalComp();
  consultant: number;
  totalMissionNotes: number = 0;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private consultantService: ConsultantService,
    private evaluationservice: EvaluationService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private missionService: MissionService,
    private dialog: MatDialog
  ) { }
  
  ngOnInit(): void {

    this.evaluationForm = this.formBuilder.group({
      noterh: [0],
      notemissions: [0],
      decision: [null, Validators.required],
      contrat: [""],
      notefinal: [],
      entreprise :[""],
      commentaire:[""]

    });
    

    
    this.consultantService.getConsultantData().subscribe((data) => {
      this.consultantData = data;
      console.log(this.consultantData.consultantId);
      this.consultant = this.consultantData.consultantId;
    });

    if (sessionStorage.getItem('jwt')) {
      this.authService.getUserProfile(localStorage.getItem('jwt')).subscribe(
        (userProfile) => {
          this.userProfile = userProfile;
          console.log(this.userProfile);
          this.hr = this.userProfile.userName;
        },
        (error) => console.error(error)
      );
    }

    this.missionService.getevalmissionintegrationbyconsultant(this.consultant).subscribe(
      (evaluation) => {
        if (evaluation) {
          this.missions = evaluation;
          this.totalMissionNotes = this.calculateMissionNotesSum(); // Calculer la somme des notes de mission

          this.missions.forEach(mission => {
            
            this.consultantService.getConsultant2(mission.manager).subscribe(
              (manager: any) => {
                mission.nomManager = manager?.nom + ' ' + manager?.prenom;
                
              },
              (error) => {
                console.log('An error occurred while retrieving the manager:', error);
              }
            );


            this.missionService.getMission(mission.mission).subscribe(
              (m: any) => {
                mission.titre = m.titre
                
              },
              (error) => {
                console.log('An error occurred while retrieving the manager:', error);
              }
            );



          });
    
          console.log(this.missions);
    
          const missionNotesSum = this.calculateMissionNotesSum();
    
          const notemissionsControl = this.evaluationForm.get('notemissions');
       
      
        }
      },
      (error) => {
        console.log('An error occurred while fetching the missions:', error);
      }


      
    );
    
    
      // Subscribe to value changes of noterh and notemissions form controls
      this.evaluationForm.get('noterh')?.valueChanges.subscribe(() => {
        this.calculateNoteFinal();
      });
      this.evaluationForm.get('notemissions')?.valueChanges.subscribe(() => {
        this.calculateNoteFinal();
      });

   
  }





  calculateNoteFinal() {
    const noterh = this.evaluationForm.get('noterh')?.value || 0;
    const notemissions = this.evaluationForm.get('notemissions')?.value || 0;
    const notefinal = Number(noterh) + Number(notemissions);
  
  }





  
  onSubmit(consultantId: number) {
    this.evaluation.consultant = this.consultant;
    this.evaluation.contrat = this.evaluationForm.get('contrat')?.value;
   
    this.evaluation.decision = this.evaluationForm.get('decision')?.value;
    this.evaluation.notefinal = 0;

this.evaluation.notefinal=0;
    this.evaluation.commentaire = this.evaluationForm.get('commentaire')?.value ;
    this.evaluation.entreprise  = this.evaluationForm.get('entreprise')?.value ;
    const contratValue = this.evaluationForm.get('contrat')?.value;
    console.log("Evaluation object:", JSON.stringify(this.evaluation, null, 2));

    this.evaluationservice.addevalC(this.evaluation).subscribe(
      (response) => {
        console.log('Evaluation added successfully!');
        this.evaluation = new EvalComp();
        const evaluationId = response.id;
        console.log('contratValue:', contratValue);

  if (   contratValue != "" && contratValue!=null )
  {
          this.updateConsultantContract(this.consultant,  contratValue); 
        }
        // ...
      },
      (error) => {
        console.log('An error occurred while adding the evaluation:', error);
      }

    );
   // this.router.navigate(['evaluation', consultantId]);

  }
  
  
  updateConsultantContract(consultantId: number, contrat: string) {
    
    this.consultantService.updatecontratEtat(consultantId, contrat)
      .subscribe(
        () => {
          console.log('Consultant contract updated successfully!');
          // Handle any actions after the contract is updated, if needed
        },
        (error) => {
          console.log('An error occurred while updating the consultant contract:', error);
        }
      );
  }
  
  
  calculateMissionNotesSum() {
    let sum = 0;
    this.missions.forEach(mission => {
      sum += Number(mission.noteManager) || 0; // Convert the value to a number using the Number() function
    });
    return sum;
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
  onAnnuler(){
    this.router.navigate(['/evaluation']);
  }

}