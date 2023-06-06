import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultantService } from '../Model/consultant/consultant.service';
import { AuthService } from '../service/Authentication Service/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EvaluationService } from '../service/evaluation.service';
import { Evaluation } from '../Model/evaluation';
import { MissionComponent } from '../mission/mission.component';
import { EmailMessage } from '../Model/email-message';

@Component({
  selector: 'app-eval-rh-integration',
  templateUrl: './eval-rh-integration.component.html',
  styleUrls: ['./eval-rh-integration.component.css']
})
export class EvalRhIntegrationComponent implements OnInit {
  email: EmailMessage = {
    fromName: '',
    fromEmail: '',
    toName: '',
    toEmail: '',
    subject: '',
    body: ''
  };
  consultantnom: string;

  demo: number = 0;
  val = 50;
  min = 1;
  max = 5;
  //envoyer parmettre
  consultantData: any;
  rh: any;
  userProfile: any;
  evaluationForm: FormGroup;
  @ViewChild(MissionComponent) missionComponent: MissionComponent;

  evaluation: Evaluation = new Evaluation();

  constructor(
    private router: Router,
    private evaluationservice: EvaluationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private consultantService: ConsultantService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.consultantService.getConsultantData().subscribe((data) => {
      this.consultantData = data;

      // Utilize the consultant data in the EvaluationRHComponent
    });

    // Retrieve the name of the connected user
    if (sessionStorage.getItem('jwt')) {
      this.authService.getUserProfile(localStorage.getItem('jwt')).subscribe(
        (userProfile) => {
          this.userProfile = userProfile;
          console.log(this.userProfile);
          this.rh = userProfile.userName;
        },
        (error) => console.error(error)
      );
    }

    // Create form builder
    this.evaluationForm = this.formBuilder.group({
      processusR: [],
      communication_interne: [],
      relation: [],
      rapport: [],
      outils: [],
      pt24: [],
      formation: [],
      processRH: [],
      admC: [],
      admRH: [],
      communicationC: [],
      communicationRH: [],
      esprit_equipeC: [],
      esprit_equipeRH: [],
      projet_interneC: [],
      dev_commercialC: [],
      vie_cabinetC: [],
      projet_interneRH: [],
      dev_commercialRH: [],
      vie_cabinetRH: []
    });
  }

  onSubmit() {
    // Handle form submission
    console.log(this.evaluationForm.value);

    // Assign form values to evaluation object
    this.evaluation.processusR = this.evaluationForm.get('processusR')?.value;
    this.evaluation.communicationinterne = this.evaluationForm.get('communication_interne')?.value;
    this.evaluation.relation = this.evaluationForm.get('relation')?.value;
    this.evaluation.rapport = this.evaluationForm.get('rapport')?.value;
    this.evaluation.outils = this.evaluationForm.get('outils')?.value;
    this.evaluation.pt24 = this.evaluationForm.get('pt24')?.value;
    this.evaluation.formation = this.evaluationForm.get('formation')?.value;
    this.evaluation.processRH = this.evaluationForm.get('processRH')?.value;
    this.evaluation.admC = this.evaluationForm.get('admC')?.value;
    this.evaluation.admRH = this.evaluationForm.get('admRH')?.value;
    this.evaluation.communicationC = this.evaluationForm.get('communicationC')?.value;
    this.evaluation.communicationRH = this.evaluationForm.get('communicationRH')?.value;
    this.evaluation.espritequipeC = this.evaluationForm.get('esprit_equipeC')?.value;
    this.evaluation.espritequipeRH = this.evaluationForm.get('esprit_equipeRH')?.value;
    this.evaluation.projetinterneC = this.evaluationForm.get('projet_interneC')?.value;
    this.evaluation.devcommercialC = this.evaluationForm.get('dev_commercialC')?.value;
    this.evaluation.viecabinetC = this.evaluationForm.get('vie_cabinetC')?.value;
    this.evaluation.projetinterneRH = this.evaluationForm.get('projet_interneRH')?.value;
    this.evaluation.devcommercialRH = this.evaluationForm.get('dev_commercialRH')?.value;
    this.evaluation.viecabinetRH = this.evaluationForm.get('vie_cabinetRH')?.value;
    this.evaluation.hr = this.userProfile.id;
    this.evaluation.type_eval = this.consultantData.evaluationType;
    console.log(this.evaluation);

    this.evaluationservice.addeval(this.evaluation).subscribe(
      (response) => {
        console.log('Evaluation added successfully!');
        // Reset the form
        this.evaluation = new Evaluation();
        const evaluationId = response.id;
        this.evaluationForm.reset();

        // Pass the evaluation ID to the MissionComponent
        this.missionComponent.evaluationId = evaluationId;

        // Call the submitForm method in MissionComponent
        this.missionComponent.submitForm();
      },
      (error) => {
        console.log('An error occurred while adding the evaluation:', error);
      }
    );
  }

  annuler() {
    this.router.navigate(['/evaluation']);
  }
}
