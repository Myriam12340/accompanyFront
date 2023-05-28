import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MissionService } from '../service/mission.service';
import { Mission } from '../mission';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {

 
  mission: Mission = {
    id: 0,
    consultant: 0,
    manager: 0,
    titre: null,
    roleRH: '',
    roleC: '',
    relationClientRH: '',
    relationClientC: '',
    chargeRH: "",
    chargeC: "",
    satisficationRH: '',
    satisficationC: '',
    noteManager: null,
    feedbackManager: ''
  };

  constructor(private http: HttpClient , private Missionservice : MissionService) {}

  ngOnInit(): void {
  }
  submitForm() {
    this.Missionservice.addMission(this.mission).subscribe(
      response => {
        console.log('Mission ajoutée avec succès !');
        // Réinitialiser le formulaire
        this.mission = {
          id: 0,
          consultant: 0,
          manager: 0,
          titre: "",
          roleRH: '',
          roleC: '',
          relationClientRH: '',
          relationClientC: '',
          chargeRH: "",
          chargeC: "",
          satisficationRH: '',
          satisficationC: '',
          noteManager: "",
          feedbackManager: ''
        };
      },
      error => {
        console.log('Une erreur s\'est produite lors de l\'ajout de la mission :', error);
      }
    );
  }

}


