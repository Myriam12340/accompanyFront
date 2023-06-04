import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mission } from '../mission';
import { MissionService } from '../service/mission.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manager-eval',
  templateUrl: './manager-eval.component.html',
  styleUrls: ['./manager-eval.component.css']
})
export class ManagerEvalComponent implements OnInit {
  missionForm: FormGroup;
  mission: Mission;
  idconsultant: any;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private missionService: MissionService
  ) {
    this.mission = new Mission();
    this.missionForm = this.formBuilder.group({
      id: [null, Validators.required],
      consultant: [null, Validators.required],
      manager: [null, Validators.required],
      titre: [null],
      roleRH: ['', Validators.required],
      roleC: ['', Validators.required],
      relationClientRH: ['', Validators.required],
      relationClientC: ['', Validators.required],
      chargeRH: ['', Validators.required],
      chargeC: ['', Validators.required],
      satisficationRH: ['', Validators.required],
      satisficationC: ['', Validators.required],
      noteManager: [null],
      feedbackManager: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const missionid = params['missionid'].trim();
      console.log("ttt" + missionid);
      this.idconsultant = missionid;
      // Utilisez l'ID du consultant comme nécessaire
    });

    // Charger les données de la mission à modifier (par exemple, à partir d'un service)
    this.loadMissionData();
  }

  loadMissionData(): void {
    this.missionService.getMission(this.idconsultant).subscribe(
      (mission: Mission) => {
        console.log(mission); // Vérifiez les données reçues ici
        this.mission = mission;
        this.missionForm.patchValue(mission);
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
  }
  annuler(){
    this.router.navigate(['/list_missions'])}
}
