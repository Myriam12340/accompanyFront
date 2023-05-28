import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MissionService } from '../service/mission.service';
import { Mission } from '../mission';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/Authentication Service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ConsultantService } from '../Model/consultant/consultant.service';


@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {
  missionForm: FormGroup;
mission: Mission =  new Mission();
constructor(private consultantService: ConsultantService,private route: ActivatedRoute, private fb: FormBuilder, private http: HttpClient,
  private Missionservice: MissionService, private authService: AuthService, private router: Router) {}
 
consultant : number ;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const consultantId = params['consultantId'];
      console.log(consultantId);
      this.consultant = consultantId;
      // Utilisez l'ID du consultant comme nécessaire
    });
  this.missionForm = this.fb.group({ 
 manager:[""],
    titre: ['',Validators.required],
    roleC:['',Validators.required],
    roleRH :['',Validators.required],
   relationClientRH: ['',Validators.required],
       relationClientC:['',Validators.required],
       chargeRH:['',Validators.required],
       chargeC:['',Validators.required],
       satisficationRH:['',Validators.required],
       satisficationC:['',Validators.required],
       noteManager: [''],
       feedbackManager: [''],
   });}

   submitForm() {
    this.mission.chargeC = this.missionForm.get('chargeC')?.value;
    this.mission.chargeRH = this.missionForm.get('chargeRH')?.value;
    this.mission.relationClientC = this.missionForm.get('relationClientC')?.value;
    this.mission.relationClientRH = this.missionForm.get('relationClientRH')?.value;
    this.mission.roleC = this.missionForm.get('roleC')?.value;
    this.mission.roleRH = this.missionForm.get('roleRH')?.value;
    this.mission.feedbackManager = this.missionForm.get('feedbackManager')?.value;
    this.mission.satisficationC = this.missionForm.get('satisficationC')?.value;
    this.mission.satisficationRH = this.missionForm.get('satisficationRH')?.value;
    this.mission.titre = this.missionForm.get('titre')?.value;
  
    this.mission.consultant = this.consultant;
  
    this.Missionservice.addMission(this.mission).subscribe(
      response => {
        console.log('Mission ajoutée avec succès !');
        // Réinitialiser le formulaire
        this.mission = new Mission();
        this.missionForm.reset();
      },
      error => {
        console.log('Une erreur s\'est produite lors de l\'ajout de la mission :', error);
      }
    );
  }

/*
checkConsultantExistence() {
  const managerValue = this.missionForm.get('manager')?.value;

  // Utilisez le service ConsultantService pour vérifier si le consultant existe
  this.consultantService.checkConsultantExistence(managerValue).subscribe(
    (result: boolean) => {
      if (result) {
        console.log('Le consultant existe dans la base de données.');
        // Effectuez des actions supplémentaires si nécessaire
      } else {
        console.log('Le consultant n\'existe pas dans la base de données.');
        // Effectuez des actions supplémentaires si nécessaire
      }
    },
    error => {
      console.log('Une erreur s\'est produite lors de la vérification du consultant :', error);
    }
  );
}

*/

  
}


