import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConsultantService } from 'src/app/Model/consultant/consultant.service';
import { Recuperation } from 'src/app/Model/recuperation';
import { RecuperationService } from 'src/app/service/recuperation.service';
import { TraitegroupeComponent } from './traitegroupe/traitegroupe.component';

@Component({
  selector: 'app-recup-rh',
  templateUrl: './recup-rh.component.html',
  styleUrls: ['./recup-rh.component.css']
})
export class RecupRHComponent implements OnInit {

  constructor(private dialog: MatDialog,private Recuperationservice :RecuperationService,private consultantService: ConsultantService,) { }
  recups: Recuperation[];
  groups : Recuperation[];
  ngOnInit(): void {
    this.Recuperationservice.getRecuperationsGroupedByNumero().subscribe(
      (data) => {
        // Filtrer les groupes ayant au moins une demande à l'état "valide" ou "Rejeter"
        this.groups = data.filter(group => 
          group && group.demandes && group.demandes.some(demande => 
            demande && (demande.etat === 'valide' )
          )
        );
    
        console.log('Données groupées filtrées :', this.groups);
    
        this.groups.forEach((recup) => {
          console.log('Type du groupe :', recup.type);
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des données groupées :', error);
      }
    );
    
    
    
    this.Recuperationservice.getlistrequiptous().subscribe(
      (data: Recuperation[]) => {
        this.recups = data.filter(recup => recup.etat === 'valide' && recup.type=='Personnel');

        this.recups.forEach((recup) => {
          this.consultantService.getConsultant2(recup.validateur).subscribe(
            (consultant: any) => {
              recup.validateurmail= consultant.mail;
            },
            (error) => {
              console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
            }
          );
          this.consultantService.getConsultant2(recup.demandeur).subscribe(
            (consultant: any) => {
              recup.demandeurnom= consultant.nom + ' ' + consultant.prenom;
            },
            (error) => {
              console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
            }
          );
        });
      },
      (error) => {
        console.log('Une erreur s\'est produite lors de la récupération recups :', error);
      }
    );

  }
  validateRequest(recup : Recuperation){
    this.consultantService.updatesbonus(recup.demandeur, recup.duree).subscribe(
      (response) => {
        console.log(`Solde de conge mis à jour avec succès pour le consultant ${recup.demandeur}`);
      },
      (error) => {
        console.error(`Erreur lors de la mise à jour du solde de conge pour le consultant ${recup.demandeur}`, error);
      }
    );
    this.Recuperationservice.updaterequpEtat(recup.id , "Traite", recup.duree).subscribe(
      (consultant: any) => {
        // Réussite de la mise à jour, rafraîchir la page
       
  
      },
      (error) => {
        console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
      }
  
      
    );
    window.location.reload();

  }
  Consulter(demandes: any , manager:string) {
    console.log("leee", demandes);
  
    // Ouvrir le MatDialog ici
    const dialogRef = this.dialog.open( TraitegroupeComponent, {
      width: '2000px', // ajustez la largeur selon vos besoins
      data: {demandes,manager} // transmettez des données au composant du MatDialog si nécessaire
    });
  
    // Vous pouvez écouter les événements du MatDialog, par exemple, la fermeture du dialog
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog fermé', result);
      window.location.reload();

      // Faire quelque chose après la fermeture du dialog si nécessaire
    });
  }
}
