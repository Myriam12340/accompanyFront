import { Component, OnInit } from '@angular/core';
import { ConsultantService } from 'src/app/Model/consultant/consultant.service';
import { Mission } from 'src/app/mission';
import { AuthService } from 'src/app/service/Authentication Service/auth.service';
import { MissionService } from 'src/app/service/mission.service';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { map } from 'rxjs/operators';
import { Consultant } from 'src/app/Model/consultant';
import { EvaluationService } from 'src/app/service/evaluation.service';
import { MatDialog } from '@angular/material/dialog';
import { ConsutantevaluationsComponent } from 'src/app/evaluation/consutantevaluations/consutantevaluations.component';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
  missions: Mission[]; // List of missions affected to the manager
  dataSource = new MatTableDataSource<Mission>();
 clique  : number = 0;

  rh: any;
  userProfile: any;
  displayedColumns: string[] = ['titre', 'date_debut', 'date_fin', 'evaluations', 'actions'];
  nom: any;
  manager: any;
  idmanager: any; // ID of the logged-in manager
  showIntegration: boolean = false;
  showMonthly: boolean = true;
  listconsultant: any[] = [];
  showConsultants: boolean = false;

  constructor(
    private router: Router,
    private missionservice: MissionService,
    private authService: AuthService,
    private consultantservice: ConsultantService,
    private evaluationservice:EvaluationService,
    private dialog: MatDialog,


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

              this.loadAllMissions();
            },
            (error) => console.error(error)
          );
        },
        (error) => console.error(error)
      );
    }
    this.loadInProgressMissions();
  }


 
  
  // partie pour consultant 
  loadConsultants() {
    this.missionservice.getConsultantIdsWithEvaluations().subscribe(
      data => {
        for (const consultantId of data) {
          this.consultantservice.getConsultant2(consultantId).subscribe(
            (consultant) => {
              this.listconsultant.push(consultant);
              this.evaluationservice.getEvaluationsconsultant(consultantId).subscribe(
                (evaluation) => {
                  for (const evl of evaluation) {

                    console.log("les evaluation:",evl);
                  }
              
                },
                (error) => console.error(error)
              );
            },
            (error) => console.error(error)
          );
        }
        console.log('Consultant IDs with evals:', this.listconsultant);
      },
      error => {
        console.error('Error fetching consultant IDs with evals:', error);
      }
    );
    this.showConsultants = true;
    this.clique = this.clique+1 ; 
  }


  openConsultantEvaluationsDialog(consultantId: number , nom :string , prenom :string) {
    const dialogRef = this.dialog.open(ConsutantevaluationsComponent, {
      data: { consultantId , nom , prenom }, // Pass data to your dialog component
    
      width: '1000px', // Ajustez la largeur selon vos besoins
      height: '800px', // Ajustez la hauteur selon vos besoins
    
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // You can perform actions after the dialog is closed if needed
    });
  }











  //partie projet 
  loadAllMissions() {
    this.missionservice.getlistmissiontous().subscribe(
      (d: Mission[]) => {
       this.dataSource.data = d;
      },
      (error) => {
        console.log('An error occurred while retrieving the list of missions:', error);
      }
    );
  }
  
  loadInProgressMissions() {
    this.missionservice.getlistmissiontous().subscribe(
      (data: Mission[]) => {
        this.filterAndLoadMissions(data);
      },
      (error) => {
        console.log('An error occurred while retrieving the list of in-progress missions:', error);
      }
    );
  }
  
  filterAndLoadMissions(data: Mission[]) {
    // Get the current date
    const currentDate = new Date();
    const formattedCurrentDate = formatDate(currentDate, 'yyyy-MM-dd', 'en');
  
    // Create a new list to store unique missions to display
    const missionsToShow: Mission[] = [];
  
    for (const mission of data) {
      // Check if the mission end date is greater than the current date
      const missionEndDate = new Date(mission.date_fin);
      const formattedMissionEndDate = formatDate(missionEndDate, 'yyyy-MM-dd', 'en');
  
      if (formattedMissionEndDate > formattedCurrentDate) {
        // Check if the mission already exists in the 'missionsToShow' list
        const isDuplicate = missionsToShow.some((m) => m.titre === mission.titre);
  
        // If the mission is not a duplicate, add it to the 'missionsToShow' list
        if (!isDuplicate) {
          missionsToShow.push(mission);
        }
      }
    }
  
    // For each mission, retrieve the corresponding consultant name and the evaluation count for the current month
    const evaluationCountPromises = missionsToShow.map((mission) => {
      return this.consultantservice.getConsultant2(mission.consultant).pipe(
        map((consultant: any) => {
          mission.nom = consultant.nom + ' ' + consultant.prenom; // Add the "nom" property to the mission with checking for the existence of the 'nom' property
  
          // Get the evaluation count for the current month
          const elapsedMonths = this.getPassedMonths(mission);
          mission.evaluations = elapsedMonths;
        })
      );
    });
  
    // Wait for all evaluation retrieval promises
    forkJoin(evaluationCountPromises).subscribe(() => {
      this.dataSource.data = missionsToShow;
      this.missions = missionsToShow;
      console.log('List of missions:', missionsToShow);
    }, (error) => {
      console.log('An error occurred while retrieving evaluations:', error);
    });
  }
  



  getPassedMonths(mission: Mission): number {
    const startDate = new Date(mission.date_debut);
    const currentDate = new Date();
  
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
  
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
  
    const passedYears = currentYear - startYear;
    const passedMonths = (passedYears * 12) + (currentMonth - startMonth)+1;
  
    return passedMonths;
  }
  

 

  evalmonth(missionid: number , from :string ) {
    this.router.navigate(['/eval-month'], {
      queryParams: { missionid: missionid , from :from}
    });
  }
}
