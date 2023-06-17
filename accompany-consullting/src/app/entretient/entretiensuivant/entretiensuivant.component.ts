import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EntretienService } from '../../service/entretient.service';
import { entretient } from '../../Model/entretient';
import { AuthService } from '../../service/Authentication Service/auth.service';
import { AbstractEmitterVisitor } from '@angular/compiler/src/output/abstract_emitter';
import { MatDialog } from '@angular/material/dialog';
import { MailRecruteurComponent } from '../mail-recruteur/mail-recruteur.component';

@Component({
  selector: 'app-entretiensuivant',
  templateUrl: './entretiensuivant.component.html',
  styleUrls: ['./entretiensuivant.component.css']
})
export class EntretiensuivantComponent implements OnInit {
candidatid : number ;
recruteurid :number ;
descriptionPoste: string
post : string ;
entretienForm: FormGroup;
  entretient: entretient = new entretient();


  constructor(private route: ActivatedRoute , public snackBar: MatSnackBar, private router:Router, private authService: AuthService,
    private fb: FormBuilder,
    private entretienService: EntretienService , private dialog: MatDialog ) { }
  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      console.log(params);
      const candidat = params['Candidat'];
      const recruteurSuivant =params['recruteurSuivant']
      const post  =params['post']
      const descriptionPoste  =params['descriptionpost']

      this.descriptionPoste = this.descriptionPoste ; 
this.post = post ;
this.recruteurid = recruteurSuivant ;
      this.candidatid = candidat;
    });


    this.entretienForm = this.fb.group({ 
     avis:[''],

     statut: [''],
     
    });
  }


//add 

async addEntretien(): Promise<void> {


 //form 
  this.entretient.avis =this.entretienForm.get('avis')?.value;
  this.entretient.statut = this.entretienForm.get('statut')?.value ;

//requipere 
this.entretient.descriptionPoste = this.entretienForm.get('descriptionPoste')?.value ;
  this.entretient.post = this.entretienForm.get('post')?.value ;
  this.entretient.candidat = this.candidatid ;
  this.entretient.recruteur = this.recruteurid ;
  this.entretient.post = this.post ;
  this.entretient.descriptionPoste = this.descriptionPoste;





  if (this.entretient.statut == "GO")
  {this.entretient.valid = true }
 
  
  
  
  
  this.entretienService.addEntretiensuivant(this.entretient)
    .subscribe(entretient => {
      console.log(entretient);
      // réinitialiser le formulaire après ajout réussi
    });
    console.log(this.entretient.recruteur);
    if (this.entretienForm.valid) {
      await this.snackBar.open("entretient  ajouté avec succès","test", {
        duration: 2000,
        panelClass: ['mat-toolbar', 'mat-primary']
      });
      this.router.navigate(['/list-entretien']).then(() => {
        window.location.reload();
      }); 
    } 

  }

  add() {
    const dialogRef = this.dialog.open(MailRecruteurComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('E-mail address ress :', result);
     this.entretient.recruteurSuivant = result.id ;
      // Do whatever you want with the retrieved email address here
    });
    
  
  
  
  }
  
  
  annuler(){
    this.router.navigate(['/list-entretien'])}
  




}
