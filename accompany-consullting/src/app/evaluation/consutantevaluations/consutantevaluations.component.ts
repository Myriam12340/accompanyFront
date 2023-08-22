import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { ConsultantService } from 'src/app/Model/consultant/consultant.service';
import { EvalMensuel } from 'src/app/Model/eval-mensuel';
import { EvaluationService } from 'src/app/service/evaluation.service';
import { MissionService } from 'src/app/service/mission.service';

@Component({
  selector: 'app-consutantevaluations',
  templateUrl: './consutantevaluations.component.html',
  styleUrls: ['./consutantevaluations.component.css']
})
export class ConsutantevaluationsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,private consultantservice : ConsultantService,private evaluationservice:EvaluationService,private missionservice: MissionService,) { }
  evaluations: EvalMensuel[] = [];
  groupedEvaluations: any[] = [];

  ngOnInit(): void {
    console.log(this.data);
    this.evaluationservice.getEvaluationsconsultant(this.data.consultantId).subscribe(
      (evaluation) => {
        const fetchMissions$ = evaluation.map(evl => 
          this.missionservice.getMission(evl.mission)
        );
    
        forkJoin(fetchMissions$).subscribe(
          (missions: any[]) => {
            evaluation.forEach((evl, index) => {
              evl.missionname = missions[index] ? missions[index].titre : '';
              this.evaluations.push(evl);
              console.log("EEEEEE:", evl);
            });

            this.groupedEvaluations = this.groupByMissionName(this.evaluations);
          },
          (error) => console.error(error)
        );
        const fetchManager$ = evaluation.map(evl => 
          this.consultantservice.getConsultant2(evl.manager)
        );
        forkJoin(fetchManager$).subscribe(
          (manager: any[]) => {
            evaluation.forEach((evl, index) => {
              evl.managernom = manager[index] ? manager[index].nom +" "+ manager[index].prenom : '';
             
             
            });

            this.groupedEvaluations = this.groupByMissionName(this.evaluations);
          },
          (error) => console.error(error)
        );



      },
      (error) => console.error(error)
    );




  }

  groupByMissionName(evaluations: EvalMensuel[]): any[] {
    const grouped = evaluations.reduce((acc, evl) => {
      const key = evl.missionname || 'Unknown Mission'; // Utilisez une clé par défaut si missionname est nul
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(evl);
      return acc;
    }, {});
  
    return Object.keys(grouped).map(key => ({
      missionname: key,
      evaluations: grouped[key]
    }));
  }
  
}
