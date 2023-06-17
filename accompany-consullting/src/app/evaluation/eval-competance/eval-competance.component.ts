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
      noterh: [''],
      notemissions: [{ value: 0, disabled: true }],
      decision: [null, Validators.required],
      contrat: [""],
      notefinal: [{ value: 0, disabled: true }]
    });
    

      // Subscribe to value changes of noterh and notemissions form controls
      this.evaluationForm.get('noterh')?.valueChanges.subscribe(() => {
        this.calculateNoteFinal();
      });
      this.evaluationForm.get('notemissions')?.valueChanges.subscribe(() => {
        this.calculateNoteFinal();
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
      (missions) => {
        if (missions) {
          this.missions = missions.filter(mission => mission.feedbackManager !== '' && mission.noteManager !== null);
          this.missions.forEach(mission => {
            this.consultantService.getConsultant2(mission.manager).subscribe(
              (manager: any) => {
                mission.nomManager = manager?.nom + ' ' + manager?.prenom;
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
    
    
    

   
  }





  calculateNoteFinal() {
    const noterh = this.evaluationForm.get('noterh')?.value || 0;
    const notemissions = this.evaluationForm.get('notemissions')?.value || 0;
    const notefinal = Number(noterh) + Number(notemissions);
    this.evaluationForm.get('notefinal')?.setValue(notefinal);
  }





  
  onSubmit(consultantId: number) {
    this.evaluation.consultant = this.consultant;
    this.evaluation.contrat = this.evaluationForm.get('contrat')?.value;
   
    this.evaluation.decision = this.evaluationForm.get('decision')?.value;
    this.evaluation.notefinal = this.evaluationForm.get('notefinal')?.value ;
    const contratValue = this.evaluationForm.get('contrat')?.value;

    this.evaluationservice.addevalC(this.evaluation).subscribe(
      (response) => {
        console.log('Evaluation added successfully!');
        this.evaluation = new EvalComp();
        const evaluationId = response.id;
        console.log('contratValue:', contratValue);

        // Update the consultant's contract if the contratValue is not null
        if (this.evaluation.contrat) {
          // Update the consultant's contract
          this.updateConsultantContract(this.consultant, this.evaluation.contrat); // Call the update function only if contrat is not empty
        }
        // ...
      },
      (error) => {
        console.log('An error occurred while adding the evaluation:', error);
      }

    );
    this.router.navigate(['evaluation', consultantId]);

  }
  
  
  updateConsultantContract(consultantId: number, contrat: string) {
    
    this.consultantService.updateCongeEtat(consultantId, contrat)
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

}