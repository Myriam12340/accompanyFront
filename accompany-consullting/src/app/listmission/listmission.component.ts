import { Component, OnInit } from '@angular/core';
import { Mission } from '../mission';
import { MatTableDataSource } from '@angular/material/table';
import { MissionService } from '../service/mission.service';
import { AuthService } from '../service/Authentication Service/auth.service';
import { ConsultantService } from '../Model/consultant/consultant.service';
import { Router } from '@angular/router';
import { EvalMissionIntegration } from '../Model/eval-mission-integration';

@Component({
  selector: 'app-listmission',
  templateUrl: './listmission.component.html',
  styleUrls: ['./listmission.component.css']
})
export class ListmissionComponent implements OnInit {
  missions: Mission[]; // Liste des missions affectées au manager
  dataSource = new MatTableDataSource();
  rh: any;
  userProfile: any;
  displayedColumns: string[] = ['titre', 'referent', 'actions'];
  nom: any;
  manager: any;
  idmanager: any; // ID du manager connecté
  showIntegration: boolean = false;
  showMonthly: boolean = true;
  evalMissions: EvalMissionIntegration[]; // Liste des évaluations d'intégration
  missionsToShow: Mission[] = [];
t:any;
  constructor(
    private router: Router,
    private missionservice: MissionService,
    private authService: AuthService,
    private consultantservice: ConsultantService
  ) {}

  ngOnInit(): void {
    const jwt = sessionStorage.getItem('jwt');
    if (jwt) {
      this.authService.getUserProfile(jwt).subscribe(
        (userProfile) => {
          this.userProfile = userProfile;
          console.log(this.userProfile);
          this.rh = this.userProfile.email;
          this.consultantservice.getConsultantbyemail(this.rh).subscribe(
            (consultant) => {
              this.manager = consultant;
              this.idmanager = this.manager.id;
  
              this.loadMissions();
            },
            (error) => console.error(error)
          );
        },
        (error) => console.error(error)
      );
    }
    this.missionservice.getlistmissiontous().subscribe(
      (missions) => {
        this.t = missions;
        console.log('List of missions:', this.t);
      },
      (error) => console.error(error)
    );
  }
  
  loadMissions() {
    this.missionservice.getlistmission(this.idmanager).subscribe(
      (data: Mission[]) => {
        this.missions = data;
  
        // Créez une nouvelle liste pour stocker les missions uniques à afficher
        const missionsToShow: Mission[] = [];
  
        for (const mission of this.missions) {
          // Vérifiez si la mission existe déjà dans la liste 'missionsToShow'
          const isDuplicate = missionsToShow.some((m) => m.titre === mission.titre);
  
          // Si la mission n'est pas un duplicata, ajoutez-la à la liste 'missionsToShow'
          if (!isDuplicate) {
            missionsToShow.push(mission);
          }
        }
  
        // Pour chaque mission, récupérer le nom du consultant correspondant
        missionsToShow.forEach((mission) => {
          this.consultantservice.getConsultant2(mission.consultant).subscribe(
            (consultant: any) => {
              mission.nom = consultant.nom + ' ' + consultant.prenom; // Ajouter la propriété "consultantNom" à la mission avec vérification de la présence de la propriété 'nom'
            },
            (error) => {
              console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
            }
          );
        });
  
        this.dataSource.data = missionsToShow;
        this.missions = missionsToShow;
        console.log('Liste des missions :', missionsToShow);
      },
      (error) => {
        console.log('Une erreur s\'est produite lors de la récupération de la liste des missions :', error);
      }
    );
  }
  
  loadMonthlyEvalMissions() {
    this.loadMissions();
    this.showIntegration = false;
    this.showMonthly = true;
  }

  loadEvalMissions() {
    // Obtenez la liste des évaluations d'intégration pour le manager connecté
    this.missionservice.getevalmissionintegrationbymanager(this.idmanager).subscribe(
      (evalMissions: EvalMissionIntegration[]) => {
        this.evalMissions = evalMissions;
        this.dataSource.data = this.evalMissions;

        this.evalMissions.forEach((evalMission) => {
          this.consultantservice.getConsultant2(evalMission.consultant).subscribe(
            (consultant: any) => {
              evalMission.nom = consultant.nom + ' ' + consultant.prenom; // Ajouter la propriété "consultantNom" à la mission avec vérification de la présence de la propriété 'nom'
            },
            (error) => {
              console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
            }

          );

          this.missionservice.getMission(evalMission.mission).subscribe(
            (mission: any) => {
              evalMission.titre = mission.titre; // Ajouter la propriété "consultantNom" à la mission avec vérification de la présence de la propriété 'nom'
            },
            (error) => {
              console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
            }

          );





          
        });
      },
      (error) => {
        console.log('An error occurred while fetching the evaluation missions:', error);
      }
    );
    this.showIntegration = true;
    this.showMonthly = false;
  }

  //paramettre
  evaluer(missionid: number , titre : any , nom : any) {
    this.router.navigate(['/eval_mission'], {
      queryParams: { missionid: missionid , titre: titre , nom:nom},
    });
  }


  evalmonth(missionid: number){
    this.router.navigate(['/eval-month'], {
      queryParams: { missionid: missionid }
    });
}
}