import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConsultantService } from 'src/app/Model/consultant/consultant.service';
import { Mission } from 'src/app/mission';
import { MissionService } from 'src/app/service/mission.service';

@Component({
  selector: 'app-create-mission',
  templateUrl: './create-mission.component.html',
  styleUrls: ['./create-mission.component.css']
})
export class CreateMissionComponent implements OnInit {
  missions: any[] = [];

  missionForm: FormGroup;
  consultantControls: FormControl[] = [];
  manager: any;
  id_manager: any;
  consultant :any ;
  id_consultant : any ;

  constructor(private formBuilder: FormBuilder, private consultantService: ConsultantService, private missionService: MissionService) { }

  ngOnInit(): void {
    this.missionForm = this.formBuilder.group({
      titreMission: [''],
      emailManager: ['', Validators.required],
      nbConsultants: [0, [Validators.required, Validators.min(0)]]
    });

    this.onNbConsultantsChange(); // Update consultant controls initially
    this.missionForm.get('nbConsultants')?.valueChanges.subscribe(() => {
      this.onNbConsultantsChange(); // Update consultant controls when nbConsultants value changes
    });
  }

  onNbConsultantsChange(): void {
    const nbConsultants = this.missionForm.get('nbConsultants')?.value;

    if (nbConsultants > this.consultantControls.length) {
      for (let i = this.consultantControls.length; i < nbConsultants; i++) {
        const consultantControl = new FormControl('', [Validators.required, Validators.email]);
        this.consultantControls.push(consultantControl);
        this.missionForm.addControl('emailConsultant' + i, consultantControl);
      }
    } else if (nbConsultants < this.consultantControls.length) {
      for (let i = this.consultantControls.length - 1; i >= nbConsultants; i--) {
        this.consultantControls.pop();
        this.missionForm.removeControl('emailConsultant' + i);
      }
    }
  }


  onSubmit(): void {
    console.log('Submit button clicked');

   

    // Retrieve form values
    const titreMission = this.missionForm.get('titreMission')?.value;
    const emailManager = this.missionForm.get('emailManager')?.value;

    this.consultantService.getConsultantbyemail(emailManager).subscribe(
      (user) => {
        this.manager = user;
        this.id_manager = this.manager.id;

        const nbConsultants = this.missionForm.get('nbConsultants')?.value;
        for (let i = 0; i < nbConsultants; i++) {
          const emailConsultant = this.missionForm.get('emailConsultant' + i)?.value;

          this.consultantService.getConsultantbyemail(emailConsultant).subscribe(
            (consultant) => {
              this.consultant = consultant;
              this.id_consultant = this.consultant.id;

              const mission: any = {
                titre: titreMission,
                manager: this.id_manager,
                consultant: this.id_consultant,
               
              };

              this.missionService.addMission(mission).subscribe(
                response => {
                  console.log('Mission ajoutée avec succès !');
                  // Réinitialiser le formulaire
                  this.missions.push(mission);
                  this.missionForm.reset();
                },
                error => {
                  console.log('Une erreur s\'est produite lors de l\'ajout de la mission :', error);
                }
              );
            },
            error => {
              console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
            }
          );
        }
      },
      error => {
        console.log('Une erreur s\'est produite lors de la récupération du manager :', error);
      }
    );
  }
}
