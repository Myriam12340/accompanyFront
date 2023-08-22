import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Conge } from 'src/app/Model/conge';
import { ConsultantService } from 'src/app/Model/consultant/consultant.service';

@Component({
  selector: 'app-validation-rh',
  templateUrl: './validation-rh.component.html',
  styleUrls: ['./validation-rh.component.css']
})
export class ValidationRhComponent implements OnInit {
  @Output() validationCompleted: EventEmitter<number> = new EventEmitter<number>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private router: Router,private dialogRef: MatDialogRef<ValidationRhComponent>,private consultantservice: ConsultantService) { }
  selectedType: string = ""; // Variable pour stocker la valeur sélectionnée

  ngOnInit(): void {

  }
after(){
  this.dialogRef.close( "test");

}

valider(congeup : Conge) {
  // Utilisez la valeur sélectionnée (this.selectedType) comme nécessaire
  console.log("Selected Type:", this.selectedType);

  const id = congeup.id;
  const consultantid = congeup.demandeur;  
  var solde ;
  solde = this.data.soldeMaladie - congeup.duree;
  var etatModifier = 'valider';


//update solde conge 
var soldec;
soldec = this.data.soldeconge - congeup.duree;


  if (this.selectedType == "Solde de congé")

{
this.consultantservice.updatesoldeconge(consultantid,soldec ).subscribe(() => {
   
  // You can also perform any other necessary operations or handle the response here
  alert("Le solde de congé modifier ");
  this.validationCompleted.emit(soldec);
});

}
else if (this.selectedType == "Solde Maladie")
{  this.validationCompleted.emit(solde);
  alert("Le solde de maladie modifier ");

this.consultantservice.updatesoldemaladie(consultantid,solde ).subscribe(() => {
   
    // You can also perform any other necessary operations or handle the response here
   

  });


 }
    
  // Fermer la boîte de dialogue
  this.dialogRef.close();
  this.router.navigate(['/les conges'])


}
}
