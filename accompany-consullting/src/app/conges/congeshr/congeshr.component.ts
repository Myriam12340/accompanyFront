import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Conge } from 'src/app/Model/conge';
import { ConsultantService } from 'src/app/Model/consultant/consultant.service';
import { AuthService } from 'src/app/service/Authentication Service/auth.service';
import { CongeService } from 'src/app/service/conge.service';
@Component({
  selector: 'app-congeshr',
  templateUrl: './congeshr.component.html',
  styleUrls: ['./congeshr.component.css']
})
export class CongeshrComponent implements OnInit {
  conges: Conge[] = [];
  filteredConges: Conge[];

  constructor(private congeService: CongeService,
    private router: Router,
    private consultantService: ConsultantService,
    private authService: AuthService) { }

  ngOnInit(): void {

    this.congeService.getCongelist().subscribe(
      (data: Conge[]) => {
        this.conges = data;
        this.filteredConges = this.conges.filter(conge => conge.etat !== 'pas envoyer' && conge.etat !== 'Annuler');

        this.conges.forEach((conge) => {
          this.consultantService.getConsultant2(conge.demandeur).subscribe(
            (consultant: any) => {
              conge.demandeurnom = consultant.nom + ' ' + consultant.prenom;
            
              conge.duree = this.calculateDuree(conge.dateDebut , conge.dateFin);
            },
            (error) => {
              console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
            }
          );
        });

        this.conges.forEach((conge) => {
          this.consultantService.getConsultant2(conge.validateur).subscribe(
            (consultant: any) => {
              conge.validateurnom = consultant.nom + ' ' + consultant.prenom;
            
              conge.duree = this.calculateDuree(conge.dateDebut , conge.dateFin);
            },
            (error) => {
              console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
            }
          );
        });


      },
      (error) => {
        console.log('Une erreur s\'est produite lors de la récupération des congés :', error);
      }
    );

  }
  calculateDuree(debut : Date , fin : Date) {
    const dateDebut = new Date(debut);
    const dateFin = new Date(fin);

    // Calculez la différence en jours
    const differenceEnJours = Math.floor((dateFin.getTime() - dateDebut.getTime()) / (1000 * 3600 * 24));

  
   return differenceEnJours;
  } 
  congedata(
    conge : Conge , consulterby:string
   ) {
     const congeData = {
       conge:conge ,
       consulterby:consulterby
     };
 
     this.congeService.setcongeData(congeData);
     console.log("from list"+congeData);
     this.router.navigate(['/detailconge']);
   }
   filterByToday() {
    // Logic to filter by today's date
    const today = new Date();
    this.filteredConges = this.conges.filter(conge => {
      // Compare the conge.dateDebut with today's date
      const congeDate = new Date(conge.dateDebut);
      return congeDate.toDateString() === today.toDateString();
    });
  }

  filterByWeek() {
    // Logic to filter by the current week
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));

    this.filteredConges = this.conges.filter(conge => {
      // Compare the conge.dateDebut with the start and end of the current week
      const congeDate = new Date(conge.dateDebut);
      return congeDate >= startOfWeek && congeDate <= endOfWeek;
    });
  }

}
