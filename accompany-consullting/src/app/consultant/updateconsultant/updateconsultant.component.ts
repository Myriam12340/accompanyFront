import { Component, OnInit, Inject } from '@angular/core';
import { ConsultantService } from '../../Model/consultant/consultant.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Consultant } from '../../Model/consultant';
import { ActivatedRoute, Router } from '@angular/router';


import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DemoColor } from '../../material-component/chips/chips.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-updateconsultant',
  templateUrl: './updateconsultant.component.html',
  styleUrls: ['./updateconsultant.component.css']
})
export class UpdateconsultantComponent implements OnInit {
  consultantForm: FormGroup;
  availableColors: DemoColor[] = [

    { name: 'vous devez Remplir tous les champs ', color: 'warn' }
  ];
  c: any;
  consultant: any;
  dialog: any;
  step = 0;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private consultantService: ConsultantService, public snackBar: MatSnackBar) {
    this.c = data.consultant;
  }
  setStep(index: number) {
    this.step = index;

  }


  nextStep() {
    this.step++;
    console.log(this.step);
  }

  prevStep() {
    this.step--;
    console.log(this.step);
  }


  ngOnInit() {
    // Récupérer l'objet consultant correspondant à l'id passé en paramètre (par exemple en utilisant le service consultantService)
    console.log(this.c.nom);
    this.consultantForm = this.fb.group({
      salaire: [this.
        c.salaire, Validators.required],
      nom: [this.
        c.nom, Validators.required],
      prenom: [this.c.prenom, Validators.required],
      mail: [this.
        c.mail, Validators.required],
      tel1: [this.
        c.tel1, Validators.required,],
      date_integration: [new Date (this.
        c.date_integration), Validators.required],

      adress: [this.c.adress, Validators.required],
      grade: [this.c.grade, Validators.required],
      date_naissance: [this.c.date_naissance, Validators.required],
      genre: [this.c.genre],
      cin: [this.c.cin, Validators.required],
      tel2: [this.c.tel2, Validators.required],
      fonction: [this.c.fonction],
      contrat: [this.c.contrat],
      status: [this.c.status],
      societe: [this.c.société],
      business_unit: [this.c.business_unit],
      code: [this.c.code, Validators.required],
      age: [this.c.age, Validators.required],
      situation_amoureuse: [this.c.situation_amoureuse]

    });
  }

  async onclique() {
    this.consultantForm.markAllAsTouched(); // marquer tous les champs comme touchés
    if (this.consultantForm.valid) { // vérifier si le formulaire est valide
      const consultantup = this.consultantForm.value;
      consultantup.id = this.c.id;

      
    
      this.consultantService.updateConsultant(this.c.id, consultantup)
        .subscribe(async () => {

          this.router.navigate(['/listconsultants'])
            .then(() => {
              window.location.reload();
            });
          await this.snackBar.open("consultant modifier  avec sucées", "test", {
            duration: 40000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });
        }, (error) => {
          console.log('Error updating consultant: ', error);
        });
    } else {
      console.log("Le formulaire n'a pas été rempli correctement");
      await this.snackBar.open("Le formulaire n'a pas été rempli correctement", "bg-success", {
        duration: 40000,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    }


  }



}
