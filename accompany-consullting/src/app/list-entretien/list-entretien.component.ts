import { Component, OnInit } from '@angular/core';
import { EntretienService } from '../service/entretient.service';
import { entretient } from '../Model/entretient';

@Component({
  selector: 'app-list-entretien',
  templateUrl: './list-entretien.component.html',
  styleUrls: ['./list-entretien.component.css']
})
export class ListEntretienComponent implements OnInit {
  entretients: entretient[] = [];

  constructor(private entretienService:EntretienService) { }

  ngOnInit(): void {

    this.entretienService.getEntretientsByRecruteur(1234).subscribe(
      (data: entretient[]) => {
        this.entretients = data;
      },
      (error: any) => console.log(error)
    );
  }

}
