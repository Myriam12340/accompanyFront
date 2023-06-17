import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EvalMensuel } from 'src/app/Model/eval-mensuel';
import { MissionService } from 'src/app/service/mission.service';

@Component({
  selector: 'app-eval-month-consultant',
  templateUrl: './eval-month-consultant.component.html',
  styleUrls: ['./eval-month-consultant.component.css']
})
export class EvalMonthConsultantComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any , private missionservice: MissionService, private formBuilder: FormBuilder,private dialogRef: MatDialogRef<EvalMonthConsultantComponent>) {  console.log(data);
  }
  evalForm: FormGroup;
  evalMensuel: EvalMensuel = new EvalMensuel();
  ngOnInit(): void {
    this
    console.log(this.data.consultant);
    console.log(this.data.manager);
    console.log(this.data.mission);
    this.evalForm = this.formBuilder.group({
      Qualité: [''],
      Budget: [''],
      Périmètre: ['',Validators.required],
      Délai:['']
      ,Budge:['']
    });
  
    // Move this closing brace to the end of the ngOnInit function
  }


  getErrorMessage(errorKey: string): string {
    const errorMessages: { [key: string]: string } = {
      required: 'This field is required.',
      // Add more error messages as needed
    };
  
    return errorMessages[errorKey] || 'Ce champ ne peut pas être vide. Veuillez choisir une valeur.';
  }
  
  
add() {
  if (this.evalForm.invalid) {
    Object.keys(this.evalForm.controls).forEach(field => {
      const control = this.evalForm.get(field);
      if (control?.invalid) {
        const errors = control.errors;
        if (errors) {
          Object.keys(errors).forEach(errorKey => {
            console.log(`Invalid ${field}: ${this.getErrorMessage(errorKey)}`);
          });
        }
      }
    });
    return;
  }

  this.evalMensuel.consultant = this.data.consultant;
  this.evalMensuel.manager = this.data.manager;
  this.evalMensuel.mission = this.data.mission;
  this.evalMensuel.qualité = this.evalForm.value.Qualité;
  this.evalMensuel.délai = this.evalForm.value.Délai;
  this.evalMensuel.périmètre = this.evalForm.value.Périmètre;
  this.evalMensuel.Budge = this.evalForm.value.Budge;

  this.missionservice.addeval_menusel_Mission(this.evalMensuel).subscribe(
    result => {
      // Handle the success response
      console.log('Evaluation added successfully', result);

      this.dialogRef.close(this.evalMensuel.consultant);
    },
    error => {
      // Handle the error response
      console.error('Failed to add evaluation', error);
    }
  );
}

  
  getCriteriaColor(criteria: string): string {
    switch (criteria) {
      case 'Très satisfait':
        return 'darkgreen';
      case 'Satisfait':
        return 'green';
      case 'Moyennement satisfait':
        return 'orange';
      case 'Insuffisant':
        return 'red';
      default:
        return '';
    }
  }
  

}
