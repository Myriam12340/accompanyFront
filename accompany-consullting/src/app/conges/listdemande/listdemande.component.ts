import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Conge } from 'src/app/Model/conge';
import { ConsultantService } from 'src/app/Model/consultant/consultant.service';
import { AuthService } from 'src/app/service/Authentication Service/auth.service';
import { CongeService } from 'src/app/service/conge.service';

@Component({
  selector: 'app-listdemande',
  templateUrl: './listdemande.component.html',
  styleUrls: ['./listdemande.component.css']
})
export class ListdemandeComponent implements OnInit {
  conges: Conge[] = [];
  filteredConges: Conge[];

  userProfile: any;
  consultantemail: any;
  consultantid: any;
validateurnom : any ;
  constructor(
    private congeService: CongeService,
    private router: Router,
    private consultantService: ConsultantService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('jwt')) {
      this.authService.getUserProfile(localStorage.getItem('jwt')).pipe(
        switchMap((userProfile) => {
          this.userProfile = userProfile;
          console.log(this.userProfile);
          this.consultantemail = this.userProfile.email;
          console.log("userid");
  
          return this.consultantService.getConsultantbyemail(this.consultantemail);
        })
      ).subscribe(
        (consultant: any) => {
          this.consultantid = consultant.id;
          console.log("id de user" + this.consultantid);
          this.validateurnom = consultant.nom + ' ' + consultant.prenom;
  
          this.congeService.getCongeByValidateurId(this.consultantid).subscribe(
            (data: Conge[]) => {
              this.conges = data;
              console.log("list des conges de validateur " + this.conges);
              this.filteredConges = this.conges.filter(conge => conge.etat === 'En attente');

              this.conges.forEach((conge) => {
                this.consultantService.getConsultant2(conge.demandeur).subscribe(
                  (consultant: any) => {
                    conge.demandeurnom = consultant.nom + ' ' + consultant.prenom;
                  
                    
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
        },
        (error) => {
          console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
        }
      );
    }
    console.log(this.conges);
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

}
