import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  ,FormControl, ValidatorFn, AbstractControl} from '@angular/forms';
import { ConsultantService } from '../../Model/consultant/consultant.service';
import { Consultant } from '../../Model/consultant';
import { DemoColor } from '../../material-component/chips/chips.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { MailService } from 'src/app/service/mail.service';
import { EmailMessage } from 'src/app/Model/email-message';
import { AuthService } from 'src/app/service/Authentication Service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PasswordDialogComponent } from 'src/app/parametres/password-dialog/password-dialog.component';

@Component({
  selector: 'app-add-consultant',
  templateUrl: './add-consultant.component.html',
  styleUrls: ['./add-consultant.component.css']
})

export class AddConsultantComponent implements OnInit {
  sp=false;
  img:any;
  consultant: Consultant = new Consultant();
  myForm: FormGroup;
  step = 0;
  userProfile: any;
  emailrh:any;

  email: EmailMessage = {
    fromName: '',
    fromEmail: '',
    toName: '',
    toEmail: '',
    subject: '',
    body: '',
    CcEmail:''
    ,CcName:''
   , UserEmail:''
  };





  
  sendEmail() {
    this.emailService.sendEmailsanscc(this.email).subscribe(
      () => {
        console.log('Email sent successfully');
        // Faites ce que vous devez faire lorsque l'e-mail est envoyé avec succès

      },
      (error) => {
        console.log('Error sending email:', error);
        // Faites ce que vous devez faire en cas d'erreur lors de l'envoi de l'e-mail
      }
    );
  }
  availableColors: DemoColor[] = [
     
    { name: 'vous devez Remplir tous les champs ', color: 'warn' }
  ];

  constructor(private dialog: MatDialog,private _snackBar: MatSnackBar,private authService: AuthService,private emailService: MailService, public snackBar: MatSnackBar, private router:Router,private consultantService: ConsultantService, private formBuilder: FormBuilder) {}

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
      tel1:["",[ numericValidator,exactLengthValidator(8)]],
      tel2: ["",[Validators.required, numericValidator,exactLengthValidator(8)]],
      mail:["",Validators.email],
      fonction:["",Validators.required],
      contrat:["",Validators.required],
      SoldeConge:["",Validators.required],
      SoldeMaladie:["",Validators.required],
      salaire:[0],
societe:["",Validators.required],
date_integration: ["", Validators.required],
business_unit:["",Validators.required],
      status: ['', Validators.required],
      code:["",Validators.required],
      age:[""],
       situation_amoureuse:["",Validators.required]
       ,photo:[ this.img],
       otherBusinessUnit: [''] 
    });

    const dateNaissanceControl = this.myForm.get('date_naissance');
  const ageControl = this.myForm.get('age');

  if (dateNaissanceControl && ageControl) {
    dateNaissanceControl.valueChanges.subscribe(value => {
      if (value) {
        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();
  
        // Mettez à jour automatiquement le champ de l'âge dans le formulaire
        this.myForm.patchValue({
          age: age
        });
      }
    });
  }
  
  }  

  async ajouterConsultant() {
   
    console.log("ggg"+this.myForm.value);
    const businessUnitControl = this.myForm.get('business_unit');
    const otherBusinessUnitControl = this.myForm.get('otherBusinessUnit');
    
    let businessUnitValue = businessUnitControl?.value;
    const salaire = this.myForm.get('salaire');
    if(salaire == null)
    {
       const a = 0 ;
      this.myForm.patchValue({
        salaire : a
      });
    }
    if (businessUnitValue === 'Autre' && otherBusinessUnitControl) {
      businessUnitValue = otherBusinessUnitControl.value;
    
      // Use patchValue to dynamically update the form control
      this.myForm.patchValue({
        business_unit: businessUnitValue
      });
    }
    
    
    console.log('Nouvelle valeur de businessUnitValue:', businessUnitValue);
     this.consultant = this.myForm.value;
     console.log("Consultant Object:", this.consultant);

    if (this.myForm.valid) {
      console.log(this.consultant);

   
  
      try {
        // Récupérez le profil utilisateur
        this.userProfile = await this.authService.getUserProfile(localStorage.getItem('jwt')).toPromise();
        console.log(this.userProfile);
  
        this.emailrh = this.userProfile.email;
  

        this.email.toEmail = this.myForm.get('mail')?.value;
        this.email.toName = this.myForm.get('nom')?.value;
        this.email.subject = 'Création de compte : 💬';
  
        // Générez un mot de passe aléatoire pour le consultant
        const password = `accompany${this.myForm.get('nom')?.value}${this.myForm.get('cin')?.value}`;
  
        const body = `
        <div style="color: #333; font-family: Arial, sans-serif;">
          <p>Bonjour consultant,</p>
          <p>Votre compte a été créé avec succès. Voici vos informations de connexion :</p>
        
          <ul>
            <li><strong>Login :</strong> ${this.myForm.get('mail')?.value}</li>
            <li><strong>Password :</strong> ${password}</li>
            <li><strong>Lien d'accès : </strong><a href="http://51.75.142.119:8780/" target="_blank">Accéder au SI RH </a></li>
          </ul>
        
          <p>Cordialement,</p>
          <p>RH Accompany Consulting</p>
        </div>
        `;
  
   
  
        // Attendez la fermeture du dialogue et récupérez le mot de passe
  
    
          // Vous pouvez utiliser le mot de passe saisi ici
          
          this.email.body = body;

          // Envoyez l'e-mail ici
         
  
          this.consultantService.addConsultant(this.consultant).subscribe(
            () => {
              this.snackBar.open("Consultant ajouté avec succès", "test", {
                duration: 2000,
                panelClass: ['mat-toolbar', 'mat-primary']
              });
              this.sendEmail();
  
              this._snackBar.open('L\'e-mail a été envoyé avec succès', 'Fermer', {
                duration: 3000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
              });
              this.router.navigate(['/listconsultants']).then(() => {
                window.location.reload();
              });
            },
            (error) => {
              console.error(error); // Afficher l'erreur dans la console
              const errorMessage = error?.error;


            

              this.snackBar.open(errorMessage, 'Fermer', {
            
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: ['mat-toolbar', 'mat-warn', 'custom-snackbar'],
                // Ajoutez une classe personnalisée pour le style
              });
            }
          );
        
      } catch (error) {
        console.error(error);

      }
    } else {
      console.log(this.myForm);
      this.snackBar.open("Vous devez remplir tous les champs", 'Fermer', {
            
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['mat-toolbar', 'mat-warn', 'custom-snackbar'],
        // Ajoutez une classe personnalisée pour le style
      });
    
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
