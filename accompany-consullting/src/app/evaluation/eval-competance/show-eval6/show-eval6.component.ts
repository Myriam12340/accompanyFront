import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Consultant } from 'src/app/Model/consultant';
import { ConsultantService } from 'src/app/Model/consultant/consultant.service';
import { ConsultantdetailComponent } from 'src/app/consultant/consultantdetail/consultantdetail.component';
import { MissionService } from 'src/app/service/mission.service';

@Component({
  selector: 'app-show-eval6',
  templateUrl: './show-eval6.component.html',
  styleUrls: ['./show-eval6.component.css']
})
export class ShowEval6Component implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private consultantService: ConsultantService,private dialog: MatDialog,private missionservice:MissionService) { }
noterh : any;
hr : any ;
consultantData: any;
consultant:any ;
missions:any;
manager:any ;
titremission : any ;


  ngOnInit(): void {
    console.log(this.data.evaluation.notemissions);
    this.noterh = this.data.evaluation.notefinal- this.data.evaluation.notemissions;
    this.consultantService.getConsultant2(this.data.evaluation.hr).subscribe( (consultant:any) => {
      this.hr =  consultant?.nom + ' ' + consultant?.prenom;
      console.log("hrrr",this.hr);

     
  
  
    },
    (error) => {
      console.error(error); // Gérez l'erreur de la requête
    });


    this.consultantService.getConsultant2(this.data.evaluation.consultant).subscribe((data) => {
      this.consultantData = data;
      
console.log("consu",this.consultantData);
      // Utilize the consultant data in the EvaluationRHComponent

    });

    this.missionservice.getevalmissionintegrationbyconsultant(this.data.evaluation.consultant).subscribe((data) => {
      this.missions = data;
      
console.log("consu",this.missions);

for(const m of this.missions)
{


  this.missionservice.getMission(m.mission).subscribe(
    (mission) => {
      m.titre = mission.titre;

      console.log("vveee",this.titremission);

    },
    (error) => console.error(error)
  );

  this.consultantService.getConsultant2(m.manager).subscribe( (response) => {
    this.manager = response;
   
m.manager = this.manager.nom + " " +this.manager.prenom;

  },
  (error) => {
    console.error(error); // Gérez l'erreur de la requête
  });

}
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
