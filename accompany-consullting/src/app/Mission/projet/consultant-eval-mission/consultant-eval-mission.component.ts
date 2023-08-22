import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Consultant } from 'src/app/Model/consultant';
import { ConsultantService } from 'src/app/Model/consultant/consultant.service';
import { EvalMensuel } from 'src/app/Model/eval-mensuel';
import { MissionService } from 'src/app/service/mission.service';

@Component({
  selector: 'app-consultant-eval-mission',
  templateUrl: './consultant-eval-mission.component.html',
  styleUrls: ['./consultant-eval-mission.component.css']
})
export class ConsultantEvalMissionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any , private missionservice: MissionService, private formBuilder: FormBuilder , private consultantservice : ConsultantService) {  console.log(data);
  }
  evaluations: EvalMensuel[] = [];

c:any ;
  ngOnInit(): void {


    console.log(this.data.mission);
    console.log("cccc",this.data.consultant);


    this.consultantservice.getConsultant(this.data.consultant).subscribe(
      (consultant) => {
        this.c = consultant;
        console.log("cccc", this.c.nom);
      },
      (error) => console.error(error)
    );

this.missionservice.getEvaluationsconsultantparmission(this.data.mission, this.data.consultant).subscribe(
  (evaluations: EvalMensuel[]) => {
    // Traitez les évaluations récupérées ici
    this.evaluations = evaluations;
    console.log(evaluations);
  },
  (error) => {
    // Gérez les erreurs ici
    console.error(error);
  }
);
  }

}
