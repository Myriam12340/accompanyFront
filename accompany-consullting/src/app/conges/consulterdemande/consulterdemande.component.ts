import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CongeService } from 'src/app/service/conge.service';

@Component({
  selector: 'app-consulterdemande',
  templateUrl: './consulterdemande.component.html',
  styleUrls: ['./consulterdemande.component.css']
})
export class ConsulterdemandeComponent implements OnInit {
congedata : any ;
  constructor(private router: Router,private congeservice : CongeService) { }

  ngOnInit(): void {
    this.congeservice.getcongeData().subscribe((data) => {
      this.congedata = data;
      console.log(this.congedata.consultantId);
    });
  }
  Annuler(){
    this.router.navigate(['/listconge'])
  }
}
