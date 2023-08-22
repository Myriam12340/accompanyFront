import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConsultantService } from 'src/app/Model/consultant/consultant.service';
import { ConsultantdetailComponent } from 'src/app/consultant/consultantdetail/consultantdetail.component';
import { EvaluationService } from 'src/app/service/evaluation.service';
import { MissionService } from 'src/app/service/mission.service';

@Component({
  selector: 'app-show-evaluation-integration',
  templateUrl: './show-evaluation-integration.component.html',
  styleUrls: ['./show-evaluation-integration.component.css']
})
export class ShowEvaluationIntegrationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,private consultantService: ConsultantService,private evaluationservice:EvaluationService,
 private dialog: MatDialog , private missionservice:MissionService) { }
  consultantData: any;
  hr : any ;
  rh:string ;
  consultant:any;
  missions:any;
  titremission : any ;
  manager:any ;
managernom : any ;
  ngOnInit(): void {
    console.log(this.data)

    this.consultantService.getConsultant2(this.data.evaluation.consultant).subscribe((data) => {
      this.consultantData = data;
      
console.log("consu",this.consultantData);
      // Utilize the consultant data in the EvaluationRHComponent

    });


    this.evaluationservice.showEIM(this.data.evaluation.consultant,this.data.evaluation.id).subscribe((data) => {
      this.missions = data;
      
console.log("vvv",this.missions);


for(const m of this.missions)
{


  this.missionservice.getMission(m.mission).subscribe(
    (mission) => {
      this.titremission = mission;

      console.log("vveee",this.titremission);

    },
    (error) => console.error(error)
  );

  this.consultantService.getConsultant2(m.manager).subscribe( (response) => {
    this.manager = response;
   


  },
  (error) => {
    console.error(error); // Gérez l'erreur de la requête
  });

}
      // Utilize the consultant data in the EvaluationRHComponent

    });


    //pour hr 
    
    this.consultantService.getConsultant2(this.data.evaluation.hr).subscribe((data) => {
      this.hr = data;
      this.rh = this.hr.nom + " "+ this.hr.prenom ;
      
console.log("consu",this.consultantData);
      // Utilize the consultant data in the EvaluationRHComponent

    });

 

  }
  onMouseEnter() {
    console.log('Mouse entered the "Consulter" button');
    this.onconsulte();
    // Vous pouvez ajouter ici le code que vous souhaitez exécuter lorsque la souris entre sur le bouton "Consulter"
  }
  onconsulte(): void {
    console.log(this.consultant);
    this.consultantService.getConsultant2(this.data.evaluation.consultant)
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
}