import { Component, OnInit } from '@angular/core';
import { Consultant } from '../Model/consultant';
import { MatTableDataSource } from '@angular/material/table';
import { ConsultantService } from '../Model/consultant/consultant.service';
import { ConsultantModule } from '../Model/consultant/consultant.module';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  consultants: Consultant[];
  integrationConsultants: Consultant[] = [];
  dataSource = new MatTableDataSource();
  public evaluationType: string;

  constructor(private consultantService: ConsultantService , private router: Router) {}

  ngOnInit() {
    this.consultantService.getConsultantlist().subscribe(
      (data: ConsultantModule[]) => {
        this.consultants = data;
        this.filterConsultants();
        this.dataSource.data = this.integrationConsultants; // Assign integrationConsultants to the dataSource
      },
      (error) => {
        console.log('An error occurred while retrieving the consultants list: ', error);
      }
    );
  }

  displayedColumns: string[] = [
    'nom',
    'prenom',
    'date_integration',
    'integration'
  ];

  filterConsultants() {
    if (this.consultants) {
      const filteredConsultants = this.consultants.filter((consultant: ConsultantModule) => {
        const integrationDate = moment(consultant.date_integration, 'YYYY-MM-DDTHH:mm:ss');
        const evaluationDate1Month = integrationDate.clone().add(1, 'month');
        const evaluationDate1MonthMinus15Days = evaluationDate1Month.clone().subtract(15, 'days');
        const evaluationDate3Month = integrationDate.clone().add(3, 'month');
        const evaluationDate3MonthMinus15Days = evaluationDate3Month.clone().subtract(15, 'days');
        const evaluationDate6Month = integrationDate.clone().add(6, 'month');
        const evaluationDate6MonthMinus15Days = evaluationDate6Month.clone().subtract(15, 'days');
  
        const today = moment();
  
        if (today.isSameOrAfter(evaluationDate1MonthMinus15Days, 'day') && 
        today.isSameOrBefore(evaluationDate1Month, 'day')) {
          consultant.isI1 = true;
          consultant.prochain_entretien = evaluationDate1Month.format('DD-MM-yyyy');
        } 
        else if (today.isSameOrAfter(evaluationDate3MonthMinus15Days, 'day') 
        && today.isSameOrBefore(evaluationDate3Month, 'day')) {
          consultant.isI3 = true;
          consultant.prochain_entretien = evaluationDate3Month.format('DD-MM-yyyy');
        }
        else if (today.isSameOrAfter(evaluationDate6MonthMinus15Days, 'day') 
        && today.isSameOrBefore(evaluationDate6Month, 'day')) {
          consultant.isI6 = true;
          consultant.prochain_entretien = evaluationDate6Month.format('DD-MM-yyyy');
        }
  
        return consultant.isI1 || consultant.isI3 || consultant.isI6;
      });
  
      this.integrationConsultants = filteredConsultants;
      console.log(this.integrationConsultants);
    }
  }
  
  
  


isNextEvaluationToday(consultant: Consultant): boolean {
  const nextEvaluationDate = moment(consultant.date_integration, 'YYYY-MM-DDTHH:mm:ss').add(1, 'month');
  const nextEvaluationDate3 = moment(consultant.date_integration, 'YYYY-MM-DDTHH:mm:ss').add(3, 'month');
  const nextEvaluationDate6 = moment(consultant.date_integration, 'YYYY-MM-DDTHH:mm:ss').add(6, 'month');


  const today = moment().startOf('day');
  return nextEvaluationDate.isSame(today, 'day') ||nextEvaluationDate3.isSame(today, 'day')||nextEvaluationDate6.isSame(today, 'day') ;
}

  evaluerConsultant(consultantId: number, nom: string , prenom: string , date_integration : string  , grade : string ) {
    this.router.navigate(['/mission'], {
      queryParams: { consultantId: consultantId, nom: nom , prenom: prenom  ,date_integration : date_integration , grade : grade}
    });

}
evaluerConsultant1(consultantId: number, nom: string, prenom: string, date_integration: string, grade: string, evaluationType: string) {
  const consultantData = {
    consultantId: consultantId,
    nom: nom,
    prenom: prenom,
    date_integration: date_integration,
    grade: grade,
    evaluationType: evaluationType
  };

  this.consultantService.setConsultantData(consultantData);
  this.router.navigate(['/evaluation-Integration']);
}


eval_competance(consultantId: number, nom: string, prenom: string, date_integration: string, grade: string, evaluationType: string) {
  const consultantData = {
    consultantId: consultantId,
    nom: nom,
    prenom: prenom,
    date_integration: date_integration,
    grade: grade,
    evaluationType: evaluationType
  };

  this.consultantService.setConsultantData(consultantData);
  this.router.navigate(['/eval_competance']);
}



}