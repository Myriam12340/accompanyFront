import { Component, OnInit } from '@angular/core';
import { EntretienService } from '../service/entretient.service';
import { entretient } from '../Model/entretient';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EntretientComponent } from '../entretient/entretient.component';
import { AuthService } from '../service/Authentication Service/auth.service';

@Component({
  selector: 'app-list-entretien',
  templateUrl: './list-entretien.component.html',
  styleUrls: ['./list-entretien.component.css']
})
export class ListEntretienComponent implements OnInit {
  entretients: entretient[] = [];
  filtre: string = '';
  id: any ; 
  userProfile: any;
  user: any;
  constructor(private authService: AuthService,private entretienService:EntretienService,private dialog: MatDialog) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("jwt")) {
      this.authService.getUserProfile(localStorage.getItem("jwt")).subscribe(
        userProfile => {
          this.id = userProfile.id;
          console.log(this.id);
  
          this.allentretien();
        },
        error => console.error(error)
      );
    }
  }
  



  filteredDataSource = new MatTableDataSource<entretient>([]);
  public filteredEntretiens: entretient[] = [];

  dataSource = new MatTableDataSource(this.entretients);
  displayedColumns: string[] = ['avis','statut','candidat','recruteursuivant'];

  allentretien() {
    this.entretienService.getEntretienaaffecte(this.id).subscribe((data) => {
      this.entretients = data
  
      this.dataSource.data =  this.entretients ;
     
  
      console.log(data);
    });
  }

  public filteredEntretiensbyaction(action : string ): void {

if (action ==='Historique'){
  this.entretienService.getEntretientsHistorique(this.id).subscribe((data) => {
    this.entretients = data
    this.filteredEntretiens = data ;

    this.dataSource.data =  this.filteredEntretiens ;
   

    console.log(data);
  });
}

  }
  add(){


    this.dialog.open(EntretientComponent);

  }




}
