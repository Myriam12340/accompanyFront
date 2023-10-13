import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConsultantService } from 'src/app/Model/consultant/consultant.service';
import { Recuperation } from 'src/app/Model/recuperation';
import { RecuperationService } from 'src/app/service/recuperation.service';

@Component({
  selector: 'app-traitegroupe',
  templateUrl: './traitegroupe.component.html',
  styleUrls: ['./traitegroupe.component.css']
})
export class TraitegroupeComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private Recuperationservice :RecuperationService, private consultantService: ConsultantService) 
  { }
  demandes :any ;
manager: string;
showInput : boolean ;
consultant :any ;
  ngOnInit(): void {
    this.demandes = this.data.demandes;
     console.log("ddh", this.data);
 
     for (const demande of this.demandes) {
      this.consultantService.getConsultant2(demande.demandeur).subscribe(
        (consultant :any) => {
         demande.demandeurnom = consultant.nom +" " + consultant.prenom ;
          
        },
        (error) => console.error(error)
      );
    }
 
     this.consultantService.getConsultantbyemail(this.data.manager).subscribe(
       (response) => {
        
         this.consultant = response;
         console.log(this.consultant);
         this.manager = this.consultant.nom + " " + this.consultant.prenom;
        
       },
       (error) => {
         console.error(error); // Gérez l'erreur de la requête
       }
     );
   }
   validateRequest(demande : Recuperation)
   {
   demande.showInput = true;
   }
 
   rejectRequest(demande : Recuperation){
     this.Recuperationservice.updaterequpEtat(demande.id , "Rejeter", demande.duree).subscribe(
       (consultant: any) => {
         // Réussite de la mise à jour, rafraîchir la page
         demande.show = true;
   
       },
       (error) => {
         console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
       }
     );
 
 
   }
 
   confirmValidation(demande : Recuperation)
   {console.log("nombre de jour valide", demande.joursValides)
 
   this.consultantService.updatesbonus(demande.demandeur, demande.duree).subscribe(
    (response) => {
      console.log(`Solde de conge mis à jour avec succès pour le consultant ${demande.demandeur}`);
    },
    (error) => {
      console.error(`Erreur lors de la mise à jour du solde de conge pour le consultant ${demande.demandeur}`, error);
    }
  );
   
   this.Recuperationservice.updaterequpEtat(demande.id , "Traite", demande.duree).subscribe(
     (consultant: any) => {
       // Réussite de la mise à jour, rafraîchir la page
      
       demande.show = true;
 
     },
     (error) => {
       console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
     }
 
     
   );}
  
  
  
  
  
  
  
  
  
  
  }
