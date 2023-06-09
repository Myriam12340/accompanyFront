import { Component, OnInit } from '@angular/core';
import { Consultant } from '../Model/consultant';
import { MatTableDataSource } from '@angular/material/table';
import { ConsultantService } from '../Model/consultant/consultant.service';
import { ConsultantModule } from '../Model/consultant/consultant.module';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { EvaluationService } from '../service/evaluation.service';
import { Evaluation } from '../Model/evaluation';
import { EvalComp } from '../Model/eval-comp';

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
  showOtherListTable = false;
  showEvaluationTable = false;
  showlistEvalcompetance = false; // Toggle between main table and evaluation table
  evaluations: Evaluation[];
  evalcomps: EvalComp[]; // Evaluation competence data structure, adjust it according to your needs
  currentList :string  = "alert"; 
  evalcomp : EvalComp; 
  constructor(
    private consultantService: ConsultantService,
    private router: Router,
    private evaluationService: EvaluationService
  ) {}

  ngOnInit() {
    this.consultantService.getConsultantlist().subscribe(
      (data: ConsultantModule[]) => {
        this.consultants = data;
        this.filterConsultants();
        this.currentList="alert";
        this.dataSource.data = this.integrationConsultants; // Assign integrationConsultants to the dataSource
      },
      (error) => {
        console.log('An error occurred while retrieving the consultants list: ', error);
      }
    );
  }

  displayedColumns: string[] = ['nom', 'prenom', 'date_integration', 'integration'];

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

        if (
          today.isSameOrAfter(evaluationDate1MonthMinus15Days, 'day') &&
          today.isSameOrBefore(evaluationDate1Month, 'day')
        ) {
          consultant.isI1 = true;
          consultant.prochain_entretien = evaluationDate1Month.format('DD-MM-yyyy');
        } else if (
          today.isSameOrAfter(evaluationDate3MonthMinus15Days, 'day') &&
          today.isSameOrBefore(evaluationDate3Month, 'day')
        ) {
          consultant.isI3 = true;
          consultant.prochain_entretien = evaluationDate3Month.format('DD-MM-yyyy');
        } else if (
          today.isSameOrAfter(evaluationDate6MonthMinus15Days, 'day') &&
          today.isSameOrBefore(evaluationDate6Month, 'day')
        ) {
          consultant.isI6 = true;
          consultant.prochain_entretien = evaluationDate6Month.format('DD-MM-yyyy');
        }

        return consultant.isI1 || consultant.isI3 || consultant.isI6;
      });

      this.integrationConsultants = filteredConsultants;
   

      console.log(this.integrationConsultants);
    }
  
  }


  alert(){
    this.consultantService.getConsultantlist().subscribe(
      (data: ConsultantModule[]) => {
        this.consultants = data;
        this.filterConsultants();
        this.currentList="alert";
        this.dataSource.data = this.integrationConsultants; // Assign integrationConsultants to the dataSource
      },
      (error) => {
        console.log('An error occurred while retrieving the consultants list: ', error);
      }
    );
    this.currentList ="alert";
  
    
  }
//voir date d'eval suivant 
  isNextEvaluationToday(consultant: Consultant): boolean {
    const nextEvaluationDate = moment(consultant.date_integration, 'YYYY-MM-DDTHH:mm:ss').add(1, 'month');
    const nextEvaluationDate3 = moment(consultant.date_integration, 'YYYY-MM-DDTHH:mm:ss').add(3, 'month');
    const nextEvaluationDate6 = moment(consultant.date_integration, 'YYYY-MM-DDTHH:mm:ss').add(6, 'month');

    const today = moment().startOf('day');
    return (
      nextEvaluationDate.isSame(today, 'day') ||
      nextEvaluationDate3.isSame(today, 'day') ||
      nextEvaluationDate6.isSame(today, 'day')
    );
  }
//pour paramettre mission
  evaluerConsultant(
    consultantId: number,
    nom: string,
    prenom: string,
    date_integration: string,
    grade: string
  ) {
    this.router.navigate(['/mission'], {
      queryParams: { consultantId: consultantId, nom: nom, prenom: prenom, date_integration: date_integration, grade: grade }
    });
  }
//pour paramettre evaluation-integration
  evaluerConsultant1(
    consultantId: number,
    nom: string,
    prenom: string,
    date_integration: string,
    grade: string,
    evaluationType: string
  ) {
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
//pour paramettre competance
  evalcompsetance(
    consultantId: number,
    nom: string,
    prenom: string,
    date_integration: string,
    grade: string,
    evaluationType: string
  ) {
    const consultantData = {
      consultantId: consultantId,
      nom: nom,
      prenom: prenom,
      date_integration: date_integration,
      grade: grade,
      evaluationType: evaluationType
    };

    this.consultantService.setConsultantData(consultantData);
    this.router.navigate(['/evalcompsetance']);
  }
  //affiche list eval integration
  loadEvaluations() {
    this.evaluationService.getevaluationlist().subscribe(
      (data: Evaluation[]) => {
        this.evaluations = data;
        console.log(this.evaluations);
        this.evaluations.forEach(mission => {
          this.consultantService.getConsultant2(mission.consultant).subscribe(
            (consultant: any) => {
            mission.nomconsultant = consultant.nom +" "+ consultant.prenom ; 
            console.log (mission.nomconsultant); // Ajouter la propriété "consultantNom" à la mission avec vérification de la présence de la propriété 'nom'
            },
            (error) => {
              console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
            }
          );
        });
      },
        
        
    
      (error) => {
        console.log('An error occurred while retrieving the evaluations: ', error);
      }
    );
  }

  showEvaluationHistory() {
    this.showEvaluationTable = true;
    this.currentList ="historique";
    this.loadEvaluations();
  }
//list eval competance 
viewEvaluationCompetenceList() {
  this.evaluationService.getevalcompetance().subscribe(
    (data: EvalComp[]) => {
      this.evalcomps = data;
      console.log(this.evalcomps);
      // Check if evalcomps is defined and not empty
      this.evalcomps.forEach(mission => {
        this.consultantService.getConsultant2(mission.consultant).subscribe(
          (consultant: any) => {
          mission.nomconsultant = consultant.nom +" "+ consultant.prenom ;  // Ajouter la propriété "consultantNom" à la mission avec vérification de la présence de la propriété 'nom'
          },
          (error) => {
            console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
          }
        );
      });
    },
    (error) => {
      console.log('An error occurred while retrieving the evaluations: ', error);
    }
  );
}
 

  showEvalcomp() {
    this.showlistEvalcompetance = true;
    this.showEvaluationTable = false;
    this.showOtherListTable = false;
    this.currentList ="competance";

    this.viewEvaluationCompetenceList();
  }

  showOtherList() {
    this.showOtherListTable = true;
  }

  returnToList() {
    this.showEvaluationTable = false;
    this.showOtherListTable = false;
    this.showlistEvalcompetance = false;
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
