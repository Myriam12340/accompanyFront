import { Component, OnInit } from '@angular/core';
import { EntretienService } from '../../service/entretient.service';
import { entretient } from '../../Model/entretient';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EntretientComponent } from '../entretient.component';
import { AuthService } from '../../service/Authentication Service/auth.service';
import { Candidat } from '../../Model/candidat';
import { concat } from 'rxjs-compat/operator/concat';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-entretien',
  templateUrl: './list-entretien.component.html',
  styleUrls: ['./list-entretien.component.css']
})
export class ListEntretienComponent implements OnInit {

 nom : any 
  showHistorique = false;
  showEntretienAFaire = true;

  entretients: entretient[] = [];
  filtre: string = '';
  id: any ; 
  userProfile: any;
  user: any;
  candidat : any ;
  recruteur : any ;
  candidats : Candidat[]=[];
role : any ;
  constructor( private router:Router,private authService: AuthService,private entretienService:EntretienService,private dialog: MatDialog) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("jwt")) {
      this.authService.getUserProfile(localStorage.getItem("jwt")).subscribe(
        userProfile => {
          this.id = userProfile.id;
          console.log(this.id);
        this.role  = userProfile.role;
  
        this.allentretien();
        },
        error => console.error(error)
      );
    }
  }
  



  filteredDataSource = new MatTableDataSource<entretient>([]);
  public filteredEntretiens: entretient[] = [];

  dataSource = new MatTableDataSource(this.entretients);
  displayedColumns: string[] = ['avis','statut','candidat','recruteursuivant','Action'];
  historiqueColumns: string[] = ['avis', 'statut', 'candidat', 'recruteur'];

  
  public filteredEntretiensbyaction(action : string ): void {

if (action ==='Historique'){
  this.entretienService.getEntretientsHistorique(this.id).subscribe((data) => {
    this.showHistorique = true;
      this.showEntretienAFaire = false;
    this.entretients = data
    this.filteredEntretiens = data ;
    this.entretients.forEach(e => {

      this.authService.getUser(e.recruteur).subscribe((recruteurData) => {
        this.recruteur = recruteurData;
        console.log("hello "+ this.candidat.nom);
        e.nom_recruteur = this.recruteur.userName;
      });

      this.entretienService.getCandidat(e.candidat).subscribe((candidatData) => {
        this.candidat = candidatData;
        console.log("hello "+ this.candidat.nom);
        e.nom_candidat = this.candidat.nom +" " + this.candidat.prenom;
      });
    });

    this.dataSource.data =  this.filteredEntretiens ;
   

    console.log(data);
  });
}
else
{
  this.showHistorique = false;
  this.showEntretienAFaire = true;
}

  }
  showEntretiensAFaire(): void {
    this.entretienService.getEntretienaaffecte(this.id).subscribe((data) => {
      this.entretients = data.filter(e => e.traite === 'pasencore');

      // Rest of your existing code...

      this.dataSource.data = this.entretients;
      console.log(data);
    });
  }










  allentretien() {
    this.entretienService.getEntretienaaffecte(this.id).subscribe((data) => {
      this.entretients = data.filter(e => e.traite === 'pasencore');
      
      this.entretients.forEach(e => {
//recruteur name
this.authService.getUser(e.recruteur).subscribe((recruteurData) => {
  this.recruteur = recruteurData;
  console.log("hello "+ this.recruteur.nom);

  e.nom_recruteur = this.recruteur.userName ;
});



        //candidat name
        this.entretienService.getCandidat(e.candidat).subscribe((candidatData) => {
          this.candidat = candidatData;
          console.log("hello "+ this.candidat.nom);
          e.nom_candidat = this.candidat.nom +" " + this.candidat.prenom;        });

      });
      this.dataSource.data = this.entretients;
      console.log(data);
    });
  }








  add(){


    this.router.navigate(['/Entretient']);

  }



  onPasseClicked(Candidat: number , recruteurSuivant : number , descriptionPoste: string , post : string , entretien : entretient ) {
    this.router.navigate(['/entretiensuivant'], { queryParams: { Candidat ,  recruteurSuivant , descriptionPoste , post , entretien: JSON.stringify(entretien)  } });
  }
  buttondetail(Candidat: number  , descriptionPoste : string , post : string ) {
    this.router.navigate(['/entretientdetail'], { queryParams: { Candidat  , descriptionPoste , post} });
  }

}


