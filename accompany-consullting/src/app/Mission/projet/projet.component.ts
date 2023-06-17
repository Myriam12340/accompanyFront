import { Component, OnInit } from '@angular/core';
import { ConsultantService } from 'src/app/Model/consultant/consultant.service';
import { Mission } from 'src/app/mission';
import { AuthService } from 'src/app/service/Authentication Service/auth.service';
import { MissionService } from 'src/app/service/mission.service';
import { random } from 'lodash';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
  projets: Mission[];
  consultantProjets: { nomConsultant: string; projets: Mission[] }[] = [];
  dataSource: MatTableDataSource<Mission>;

  constructor(
    private missionservice: MissionService,
    private authService: AuthService,
    private consultantservice: ConsultantService
  ) {}

  couleurs = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
  couleurAleatoire: string;

  ngOnInit(): void {
    this.loadMissions();
  }

  loadMissions() {
    this.missionservice.getlistmissiontous().subscribe(
      (data: Mission[]) => {
        this.projets = data;

        // Créez une nouvelle liste pour stocker les missions uniques à afficher
        const missionsToShow: Mission[] = [];

        for (const mission of this.projets) {
          // Vérifiez si la mission existe déjà dans la liste 'missionsToShow'
          const isDuplicate = missionsToShow.some((m) => m.titre === mission.titre);

          // Si la mission n'est pas un duplicata, ajoutez-la à la liste 'missionsToShow'
          if (!isDuplicate) {
            missionsToShow.push(mission);
          }
        }

        // Pour chaque mission, récupérer le nom du consultant correspondant
        missionsToShow.forEach((mission) => {
          mission.couleur = this.getRandomColor();

          this.consultantservice.getConsultant2(mission.manager).subscribe(
            (consultant: any) => {
              mission.nomManager = consultant.nom + ' ' + consultant.prenom;
              // Ajouter la propriété "consultantNom" à la mission avec vérification de la présence de la propriété 'nom'
            },
            (error) => {
              console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
            }
          );

          this.consultantservice.getConsultant2(mission.consultant).subscribe(
            (consultant: any) => {
              mission.nom = consultant.nom + ' ' + consultant.prenom;
              // Ajouter la propriété "consultantNom" à la mission avec vérification de la présence de la propriété 'nom' de consultant
            },
            (error) => {
              console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
            }
          );
        });

        // Regrouper les missions par consultant
        const consultants: string[] = [];
       // Créer la structure de données pour afficher les missions par consultant
for (const mission of missionsToShow) {
  if (mission.nom && !consultants.includes(mission.nom)) {
    consultants.push(mission.nom);
  }
}


        // Créer la structure de données pour afficher les missions par consultant
        for (const consultant of consultants) {
          const consultantProjects = {
            nomConsultant: consultant,
            projets: missionsToShow.filter((mission) => mission.nom === consultant)
          };
          this.consultantProjets.push(consultantProjects);
        }

        this.dataSource = new MatTableDataSource<Mission>(missionsToShow);
        this.projets = missionsToShow;
        console.log('Liste des missions :', missionsToShow);
      },
      (error) => {
        console.log('Une erreur s\'est produite lors de la récupération de la liste des missions :', error);
      }
    );
  }

  getRandomColor(): string {
    const randomIndex = random(0, this.couleurs.length - 1);
    return this.couleurs[randomIndex];
  }
}
