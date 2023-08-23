
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  ,FormControl, ValidatorFn, AbstractControl} from '@angular/forms';

import { Router } from '@angular/router';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { Consultant } from '../Model/consultant';
import { DemoColor } from '../material-component/chips/chips.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConsultantService } from '../Model/consultant/consultant.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  img:any;
  sp=false;
  consultant: Consultant = new Consultant();
  myForm: FormGroup;
  step = 0;
  availableColors: DemoColor[] = [
     
    { name: 'vous devez Remplir tous les champs ', color: 'warn' }
  ];

  constructor(public snackBar: MatSnackBar, private router:Router,private consultantService: ConsultantService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    const numericValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value && isNaN(Number(value))) {
        return { 'numeric': true }; // Validation échouée si la valeur n'est pas numérique
      }
      return null; // Validation réussie
    };
    function exactLengthValidator(length: number): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any; } | null => {
        const value = control.value;
        if (value && value.length !== length) {
          return { 'exactLength': true }; // Validation échouée si la longueur n'est pas exacte
        }
        return null; // Validation réussie
      };
    }



    this.myForm = this.formBuilder.group({
      nom: ["",[Validators.required, Validators.minLength(3)]],
      prenom: ["",[Validators.required, Validators.minLength(3)]],
      adress: ['', Validators.required],
      grade: ['', Validators.required],
      date_naissance: ['', Validators.required],
      genre: ['', Validators.required],
      cin: ["",[Validators.required, numericValidator,exactLengthValidator(8)]],
      tel1:["",[Validators.required, numericValidator,exactLengthValidator(8)]],
      tel2: ["",[Validators.required, numericValidator,exactLengthValidator(8)]],
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
       ,photo:[ this.img]
    });


  }

  async ajouterConsultant() {
    this.consultant = this.myForm.value;
    console.log(this.myForm.value);
  
    if (this.myForm.valid) {
      console.log(this.consultant);
  
      this.consultantService.addadmin(this.consultant).subscribe(
        () => {
          this.snackBar.open("Admin  ajouté avec succès", "test", {
            duration: 2000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });
          this.router.navigate(['/listconsultants']).then(() => {
            window.location.reload();
          });
        },
        (error) => {
          console.error(error); // Afficher l'erreur dans la console
          const errorMessage = error?.error?.message ;
          alert(errorMessage); // Afficher l'erreur dans l'alerte
        }
      );
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
  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
  
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      this.consultantService.uploadFile(formData).subscribe(
        (response) => {
          const fileUrl = response.fileUrl;
          this.img= fileUrl;
          this.myForm.patchValue({ photo: fileUrl }); // Mise à jour de la valeur dans le formulaire
          console.log('File uploaded successfully. File URL:', fileUrl);
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    }
  }
}
