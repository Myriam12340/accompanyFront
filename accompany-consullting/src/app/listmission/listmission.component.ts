import { Component, OnInit } from '@angular/core';
import { Mission } from '../mission';
import { MatTableDataSource } from '@angular/material/table';
import { MissionService } from '../service/mission.service';
import { AuthService } from '../service/Authentication Service/auth.service';
import { ConsultantService } from '../Model/consultant/consultant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listmission',
  templateUrl: './listmission.component.html',
  styleUrls: ['./listmission.component.css']
})
export class ListmissionComponent implements OnInit {
  missions: Mission[];
  dataSource = new MatTableDataSource();
  rh : any ; 
  userProfile:any; 
  displayedColumns: string[] = ['titre', 'referent', 'actions'];
 nom : any ;
 manager : any ;
idmanager :any ;
  constructor( private router: Router,private missionservice:MissionService , private authService: AuthService , private consultantservice : ConsultantService) { }
  ngOnInit(): void {
    const jwt = sessionStorage.getItem('jwt');
    if (jwt) {
      this.authService.getUserProfile(jwt).subscribe(
        userProfile => {
          this.userProfile = userProfile;
          console.log(this.userProfile);
          this.rh = this.userProfile.email;
          this.consultantservice.getConsultantbyemail(this.rh).subscribe(
            (consultant) => {
              this.manager = consultant;
              this.idmanager = this.manager.id;
  
              this.missionservice.getlistmission(this.idmanager).subscribe(
                (data: Mission[]) => {
                  this.missions = data;
                  this.dataSource.data = this.missions;
  
                  // Pour chaque mission, récupérer le nom du consultant correspondant
                  this.missions.forEach(mission => {
                    this.consultantservice.getConsultant2(mission.consultant).subscribe(
                      (consultant: any) => {
                        mission.nom = consultant.nom + " " + consultant.prenom; // Ajouter la propriété "consultantNom" à la mission avec vérification de la présence de la propriété 'nom'
                      },
                      (error) => {
                        console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
                      }
                    );
                  });
  
                  console.log('Liste des missions :', this.missions);
                },
                (error) => {
                  console.log('Une erreur s\'est produite lors de la récupération de la liste des missions :', error);
                }
              );
            },
            error => console.error(error)
          );
        },
        error => console.error(error)
      );
    }
  }
  
  evaluer(missionid: number) {
    this.router.navigate(['/eval_mission'], {
      queryParams: { missionid:missionid}
    });

}
  

}
