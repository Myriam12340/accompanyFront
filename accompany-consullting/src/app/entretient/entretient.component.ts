import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntretienService } from '../service/entretient.service';
import { Candidat } from '../Model/candidat';
import { entretient } from '../Model/entretient';
import { F } from '@angular/cdk/keycodes';
import { EntretientViewModel } from '../Model/entretient-view-model';
import { AuthService } from '../service/Authentication Service/auth.service'
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MailRecruteurComponent } from '../mail-recruteur/mail-recruteur.component';
import { User } from '../Model/user';

@Component({
  selector: 'app-entretient',
  templateUrl: './entretient.component.html',
  styleUrls: ['./entretient.component.css']
})
export class EntretientComponent implements OnInit {
  entretienForm: FormGroup;
  candidat: Candidat = new Candidat();
  entretient: entretient = new entretient();
  userProfile: any;
  u1 : any ;
  u2 : any ;
  recruteur : any ;
  user: any ;
  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private entretienService: EntretienService , private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.entretienForm = this.fb.group({
      nom: ['',Validators.required],
      prenom: ['', Validators.required],
      tel1: ['', Validators.required],
      tel2: ['', Validators.required],
      competance:[''],
      email: ['', [Validators.required, Validators.email]],
     avis:[''],

     post: ['', Validators.required],
     descriptionPoste: [''],
     statut: [''],
     cvPdf: [''] // Ajouter le champ pour le fichier PDF



    });



    if (sessionStorage.getItem("jwt")) {
      this.authService.getUserProfile(localStorage.getItem("jwt")).subscribe(
        userProfile => {
          this.userProfile = userProfile;
          console.log("*************")
    
          this.authService.getUserByEmail(this.userProfile.email).subscribe(
            (user) => {
              this.user = user;
              console.log('User found:', this.user.id);
              this.recruteur = this.user.id;
              this.addEntretien(); // Appel à la fonction qui ajoute l'entretien après la récupération de l'utilisateur
            },
            (error) => {
              console.log('Error getting user by email:', error);
            }
          );
        },
        error => console.error(error)
      );
    }




  }




// Extract the logic for adding entretien to a separate method
addEntretien(): void {


  











  this.candidat.nom = this.entretienForm.get('nom')?.value;
  this.candidat.Prenom = this.entretienForm.get('prenom')?.value;
  this.candidat.email = this.entretienForm.get('email')?.value;
  this.candidat.tel1 = this.entretienForm.get('tel1')?.value ;
  this.candidat.tel2 = this.entretienForm.get('tel2')?.value ;
  this.candidat.competance = this.entretienForm.get('competance')?.value ;
  this.entretient.avis =this.entretienForm.get('avis')?.value;
  this.entretient.descriptionPoste = this.entretienForm.get('descriptionPoste')?.value ;
  this.entretient.post = this.entretienForm.get('post')?.value ;
  this.entretient.statut = this.entretienForm.get('statut')?.value ;
  this.entretient.recruteur = this.recruteur ;
  const viewModel = new EntretientViewModel();
  viewModel.candidat = this.candidat;
  viewModel.entretient = this.entretient;
  this.onFileSelected;
  console.log(viewModel);
  this.entretienService.addEntretien(viewModel)
    .subscribe(entretient => {
      console.log(entretient);
      // réinitialiser le formulaire après ajout réussi
    });
    console.log(this.entretient.recruteur);

}





///partie dialog mail 
add() {
  const dialogRef = this.dialog.open(MailRecruteurComponent);

  dialogRef.afterClosed().subscribe(result => {
    console.log('E-mail address ress :', result);
   this.entretient.recruteurSuivant = result.id ;
    // Do whatever you want with the retrieved email address here
  });
  



}






//partie file 
onFileSelected(event) {
  const file: File = event.target.files[0];
  this.entretienForm.get('cvPdf')?.setValue(file); // Enregistrer le fichier PDF dans le formulaire
}




}