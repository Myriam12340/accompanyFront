import { Component, OnInit } from '@angular/core';
import { EntretienService } from '../service/entretient.service';
import { entretient } from '../Model/entretient';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-entretien',
  templateUrl: './list-entretien.component.html',
  styleUrls: ['./list-entretien.component.css']
})
export class ListEntretienComponent implements OnInit {
  entretients: entretient[] = [];

  constructor(private entretienService:EntretienService) { }

  ngOnInit(): void {

  this.allentretien();
  }

  dataSource = new MatTableDataSource(this.entretients);
  displayedColumns: string[] = ['avis','statut','recruteur','recruteursuivant'];


  allentretien() {
    this.entretienService.getEntretientsHistorique(2).subscribe((data) => {
      this.entretients = data
      this.dataSource.data = this.entretients;

      console.log(data);
    });
  }

}
