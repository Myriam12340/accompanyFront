import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultantService } from '../../Model/consultant/consultant.service';
import { Consultant } from '../../Model/consultant';
import { DemoColor } from '../../material-component/chips/chips.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

@Component({
  selector: 'app-add-consultant',
  templateUrl: './add-consultant.component.html',
  styleUrls: ['./add-consultant.component.css']
})
export class AddConsultantComponent implements OnInit {
  sp=false;
  consultant: Consultant = new Consultant();
  myForm: FormGroup;
  step = 0;
  availableColors: DemoColor[] = [
     
    { name: 'vous devez Remplir tous les champs ', color: 'warn' }
  ];

  constructor(public snackBar: MatSnackBar, private router:Router,private consultantService: ConsultantService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      nom: [ "",Validators.required ],
      prenom: [ "",Validators.required],
      adress: ['', Validators.required],
      grade: ['', Validators.required],
      date_naissance: ['', Validators.required],
      genre: ['', Validators.required],
      cin: ['', Validators.required],
      tel1: ['', Validators.required],
      tel2: ['', Validators.required],
      mail:["",Validators.email],
      fonction:["",Validators.required],
      contrat:["",Validators.required],
     
      salaire:["",Validators.required],
societe:["",Validators.required],
date_integration: ["", Validators.required],
business_unit:["",Validators.required],
      status: ['', Validators.required],
      code:["",Validators.required],
      age:['', Validators.required],
       situation_amoureuse:["",Validators.required]
    });


  }

  async ajouterConsultant() {
    this.consultant = this.myForm.value;
    console.log(this.myForm.value);
    if (this.myForm.valid) {
      console.log(this.consultant)
      this.consultantService.addConsultant(this.consultant).subscribe();
      await this.snackBar.open("Consultant ajouté avec succès","test", {
        duration: 2000,
        panelClass: ['mat-toolbar', 'mat-primary']
      });
      this.router.navigate(['/listconsultants']).then(() => {
        window.location.reload();
      }); 
    } else {
      console.log(this.myForm);
      alert("Vous devez remplir tous les champs.");
    }
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
}
