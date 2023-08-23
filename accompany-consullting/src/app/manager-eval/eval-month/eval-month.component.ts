import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Consultant } from 'src/app/Model/consultant';
import { ConsultantService } from 'src/app/Model/consultant/consultant.service';
import { Mission } from 'src/app/mission';
import { MissionService } from 'src/app/service/mission.service';
import { EvalMonthConsultantComponent } from './eval-month-consultant/eval-month-consultant.component';
import { MissionsManagerComponent } from 'src/app/Mission/missions-manager/missions-manager.component';
import { ConsultantEvalMissionComponent } from 'src/app/Mission/projet/consultant-eval-mission/consultant-eval-mission.component';
import { EvalMensuel } from 'src/app/Model/eval-mensuel';
import { AuthService } from 'src/app/service/Authentication Service/auth.service';

@Component({
  selector: 'app-eval-month',
  templateUrl: './eval-month.component.html',
  styleUrls: ['./eval-month.component.css']
})
export class EvalMonthComponent implements OnInit {

  evaluations: EvalMensuel[] = [];

  missionid: any;
  equipe: number;
  consultantsEvalues: number[] = [];
  role : any ;
  userProfile: any;

  mission: any;
  nomchef:any;
  m:any;
  nombreequipe : number;
  membresEquipe: Consultant[] = []; // Ajoutez cette ligne pour déclarer la propriété membresEquipe
from : string ;
  constructor(    private authService: AuthService,
    private dialog: MatDialog,private router: Router, private route: ActivatedRoute, private missionservice: MissionService, private consultantservice: ConsultantService

  ) { }

  ngOnInit(): void {

    const jwt = sessionStorage.getItem('jwt');
    if (jwt) {
      this.authService.getUserProfile(jwt).subscribe(
        (userProfile) => {
          this.userProfile = userProfile;
          console.log(this.userProfile);
          this.role  = userProfile.role;

       
        },
        (error) => console.error(error)
      );
    }






    this.route.queryParams.subscribe((params) => {
      const missionid = params['missionid'].trim();
      console.log("ttt" + missionid);
      this.missionid = missionid;
      const from = params['from'].trim();
      this.from = from ;
      console.log ("from "+this.from) ;
      
    });
  
    this.missionservice.getMission(this.missionid).subscribe(
      (mission) => {
        console.log(mission); // Vérifiez les données reçues ici
  
        this.mission = mission;
  
        this.consultantservice.getConsultant2(mission.manager).subscribe(
          (consultant: any) => {
            this.nomchef = consultant.nom + ' ' + consultant.prenom;
          },
          (error) => {
            console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
          }
        );
  
        this.missionservice.getlistmissiontitre(this.mission.titre).subscribe(
          (data: Mission[]) => {
            this.m = data;
  
            this.m.forEach((mission) => {
              this.consultantservice.getConsultant2(mission.consultant).subscribe(
                (consultant: any) => {
                  mission.nom = consultant.nom + ' ' + consultant.prenom;
                  this.membresEquipe.push(consultant); // Ajoutez le nom du membre de l'équipe à la liste membresEquipe
                  console.log('les membres :'+this.membresEquipe);
                  this.nombreequipe = this.membresEquipe.length;
                },
                (error) => {
                  console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
                }
              );
            });
          },
          (error) => {
            console.log('Une erreur s\'est produite lors de la récupération de la liste des missions :', error);
          }
        );
      },
      (error) => {
        console.log("Une erreur s'est produite lors du chargement de la mission :", error);
      }
    );

    
  }


  evaluer(nom :string , prenom :string ,idconsultant: number, mission: number, manager: number) {
    const selectedConsultant = idconsultant; // assuming only one consultant can be selected
    const managerid = manager;
    const missionid = mission;
    const nomconsultant =nom ;
    const prenomconsultant = prenom ;
  
    const dialogConfig = new MatDialogConfig();
  
    dialogConfig.width = '1000px'; // Définir la largeur de la boîte de dialogue
  
    dialogConfig.data = {nom:nomconsultant,prenom:prenomconsultant, consultant: selectedConsultant, manager: managerid, mission: missionid };
    console.log(selectedConsultant);
    console.log(dialogConfig);
  
    const dialogRef = this.dialog.open(EvalMonthConsultantComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe(result => {
      // result contient l'ID du consultant
      console.log('Consultant ID:', result);

      const evalMensuel = new EvalMensuel();
      evalMensuel.consultant = result.consultant;
      evalMensuel.manager = result.manager;
      evalMensuel.mission = missionid;
      evalMensuel.Budge = result.Budge;
      evalMensuel.delai = result.delai ;
      evalMensuel.perimetre = result.perimetre;
      evalMensuel.qualite = result.qualite;
      evalMensuel.nbeval = this.mission.nbeval+1;




      this.evaluations.push(evalMensuel);


      
      const consultantId = result;

    // Ajouter l'ID du consultant évalué à la liste consultantsEvalues
    this.consultantsEvalues.push(consultantId);
      
    });

console.log("list",this.evaluations);

  }
  
  consulter_eval(nom :string , prenom :string ,idconsultant: number,  mission: number ,manager: number,) {


    const selectedConsultant = idconsultant; // assuming only one consultant can be selected
    const managerid = manager;
    const missionid = mission;
    const nomconsultant =nom ;
    const prenomconsultant = prenom ;
  
    const dialogConfig = new MatDialogConfig();
  
    dialogConfig.width = '1000px'; // Définir la largeur de la boîte de dialogue
  
    dialogConfig.data = {nom:nomconsultant,prenom:prenomconsultant, consultant: selectedConsultant, manager: managerid, mission: missionid };
    console.log(selectedConsultant);
    console.log(dialogConfig);
  
    const dialogRef = this.dialog.open(ConsultantEvalMissionComponent, dialogConfig);
  
    dialogRef.afterClosed();
  }
  
terimner (){

  const id = this.mission.id;
    const missionupdate = this.mission ;
    missionupdate.nbeval  = this.mission.nbeval + 1 ;
 
    this.missionservice.updateMission(id,missionupdate ).subscribe(() => {
      
    });

 

    this.evaluations.forEach(evaluation => {
console.log ("tythj",evaluation);

      this.missionservice.addeval_menusel_Mission(evaluation).subscribe(
        result => {
          


          
          console.log('Evaluation added successfully', result);
        },
        error => {
          console.error('Failed to add evaluation', error);
          // Gérez l'erreur ici si nécessaire
        }
      );
    });
    this.router.navigate(['/list_missions'])
}




}
