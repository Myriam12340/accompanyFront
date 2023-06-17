import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Consultant } from 'src/app/Model/consultant';
import { ConsultantService } from 'src/app/Model/consultant/consultant.service';
import { Mission } from 'src/app/mission';
import { MissionService } from 'src/app/service/mission.service';
import { EvalMonthConsultantComponent } from './eval-month-consultant/eval-month-consultant.component';

@Component({
  selector: 'app-eval-month',
  templateUrl: './eval-month.component.html',
  styleUrls: ['./eval-month.component.css']
})
export class EvalMonthComponent implements OnInit {
  missionid: any;
  equipe: number;
  consultantsEvalues: number[] = [];

  mission: any;
  nomchef:any;
  m:any;
  nombreequipe : number;
  membresEquipe: Consultant[] = []; // Ajoutez cette ligne pour déclarer la propriété membresEquipe

  constructor(private dialog: MatDialog,private router: Router, private route: ActivatedRoute, private missionservice: MissionService, private consultantservice: ConsultantService

  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const missionid = params['missionid'].trim();
      console.log("ttt" + missionid);
      this.missionid = missionid;
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


  evaluer(nom :string , prenom :string ,idconsultant: number, manager: number, mission: number) {
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
      // Effectuez les opérations nécessaires avec l'ID du consultant, comme supprimer le bouton d'évaluation
      // Vous pouvez appeler une méthode pour supprimer le bouton d'évaluation en utilisant l'ID du consultant
    
      const consultantId = result;

    // Ajouter l'ID du consultant évalué à la liste consultantsEvalues
    this.consultantsEvalues.push(consultantId);
      
    });
  }
  
 
  

}
