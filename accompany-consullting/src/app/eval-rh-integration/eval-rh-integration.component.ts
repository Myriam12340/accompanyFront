import { Component, OnInit } from '@angular/core';
import { MissionRh } from '../mission-rh';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eval-rh-integration',
  templateUrl: './eval-rh-integration.component.html',
  styleUrls: ['./eval-rh-integration.component.css']
})
export class EvalRhIntegrationComponent implements OnInit {
  formulaireData: MissionRh = new MissionRh();
  formulairesDupliques: MissionRh[] = [];
  consultantnom : string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
     
      const nom = params['nom'];

    
      this.consultantnom = nom ;
      console.log("nom"+this.consultantnom);
      // Utilisez l'ID du consultant comme nécessaire
    });

  }
  dupliquerFormulaire() {
    const nouveauFormulaire = new MissionRh();
    // Copiez les valeurs du formulaire initial dans le nouveau formulaire
    nouveauFormulaire.Roles_res = this.formulaireData.Roles_res;
    nouveauFormulaire.Roles_resC = this.formulaireData.Roles_resC;
    nouveauFormulaire.Diffucultés = this.formulaireData.Diffucultés;

    nouveauFormulaire.Planification = this.formulaireData.Planification;
    nouveauFormulaire.PlanificationC = this.formulaireData.PlanificationC;
    nouveauFormulaire.DiffucultésC = this.formulaireData.DiffucultésC;
    nouveauFormulaire.Points = this.formulaireData.Points;



    // Ajoutez d'autres propriétés selon vos besoins
  
    // Ajoutez le nouveau formulaire au tableau des formulaires dupliqués
    this.formulairesDupliques.push(nouveauFormulaire);
  }
  
}
