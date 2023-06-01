import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MissionService } from '../service/mission.service';
import { Mission } from '../mission';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../service/Authentication Service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ConsultantService } from '../Model/consultant/consultant.service';
import { Consultant } from '../Model/consultant';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {
  missionForms: FormGroup[] = [];

  missionForm: FormGroup;
  mission: Mission = new Mission();
  m: any;
  consultant: number;
  consultantnom : string;
  consultantprenom : string;
  grade : string ;
rh : any ; 
consultantinfo : any ;
  userProfile:any;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private f: FormBuilder,
private consultantservice : ConsultantService,
    private Missionservice: MissionService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      const consultantId = params['consultantId '];
      const nom = params['nom'];
      const prenom = params['prenom'];
      const grade = params['grade'];
      console.log(consultantId);
      this.consultant = consultantId;
      this.consultantnom = nom ;
      this.consultantprenom = prenom ;
      this.grade = grade ;
      if (sessionStorage.getItem("jwt")) {
        this.authService.getUserProfile(localStorage.getItem("jwt")).subscribe(
          userProfile => {
            this.userProfile = userProfile;
            console.log(this.userProfile);
            this.rh= userProfile.userName;
          },
          error => console.error(error)
        );
      }
      // Utilisez l'ID du consultant comme nécessaire
    });


    this.consultantservice.getConsultant(this.consultant).subscribe(
      (user) => {
        this.consultantinfo = user
        console.log("info"+ this.consultantinfo.nom);
      });








    this.missionForm = this.fb.group({
      manager: [''],
      titre: ['', Validators.required],
      roleC: ['', Validators.required],
      roleRH: ['', Validators.required],
      relationClientRH: ['', Validators.required],
      relationClientC: ['', Validators.required],
      chargeRH: ['', Validators.required],
      chargeC: ['', Validators.required],
      satisficationRH: ['', Validators.required],
      satisficationC: ['', Validators.required],
      noteManager: [''],
      feedbackManager: [''],
    });


  }

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

    this.authService.getUserByEmail(this.missionForm.get('manager')?.value).subscribe(
      (user) => {
        this.m = user;
        const userId = this.m.id;
        console.log("m:" + this.m.id);
        this.mission.manager = userId;

        // Effectuez l'ajout de la mission ici, une fois que vous avez l'ID du manager
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
      },
      (error) => {
        console.log('Error getting user by email:', error);
      }
    );
  }
  addForm() {
    const duplicatedForm = this.fb.group({
      manager: [''],
      titre: ['', Validators.required],
      roleC: ['', Validators.required],
      roleRH: ['', Validators.required],
      relationClientRH: ['', Validators.required],
      relationClientC: ['', Validators.required],
      chargeRH: ['', Validators.required],
      chargeC: ['', Validators.required],
      satisficationRH: ['', Validators.required],
      satisficationC: ['', Validators.required],
      noteManager: [''],
      feedbackManager: [''],
    });
  
    this.missionForms.push(duplicatedForm);
  }
  

 
}
