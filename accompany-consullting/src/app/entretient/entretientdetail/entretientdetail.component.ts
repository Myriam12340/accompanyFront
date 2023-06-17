import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Candidat } from '../../Model/candidat';
import { EntretienService } from '../../service/entretient.service';
import { entretient } from '../../Model/entretient';
import { AuthService } from '../../service/Authentication Service/auth.service';

@Component({
  selector: 'app-entretientdetail',
  templateUrl: './entretientdetail.component.html',
  styleUrls: ['./entretientdetail.component.css']
})
export class EntretientdetailComponent implements OnInit {
  candidatid : number ;
  descriptionPoste: string
  post : string ;
  candidatprofil : any;
  avis : any ;
  recruteur : any ;
  
  entretients: entretient[] = [];
  constructor(private route: ActivatedRoute ,private entretienService: EntretienService,private authService: AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      const candidat = params['Candidat'];
      const recruteurSuivant =params['recruteurSuivant']
      const post  =params['post']
      const descriptionPoste  =params['descriptionPoste']

      this.descriptionPoste = descriptionPoste ; 
this.post = post ;
      this.candidatid = candidat;
    });
this.getCandidatprofil();
this.entretienService.getEntretienCandidat(this.candidatid).subscribe((data) => {
    
  this.entretients = data;
 
  
  this.entretients.forEach(e => {
    //recruteur name
    this.authService.getUser(e.recruteur).subscribe((recruteurData) => {
      this.recruteur = recruteurData;
      console.log("hello "+ this.recruteur.nom);
    
      e.nom_recruteur = this.recruteur.userName ;
    });

 
});
  console.log("ttt" ,this.entretients);
});

  }



  getentretien(){
    this.entretienService.getEntretienCandidat(this.candidatid)



  }

  getCandidatprofil (){



this.entretienService.getCandidat(this.candidatid).subscribe(
  (user) => {
    this.candidatprofil = user;
    console.log('User foundddd:', this.candidatprofil.nom);
    // Appel à la fonction qui ajoute l'entretien après la récupération de l'utilisateur
  },
  (error) => {
    console.log('Error getting user by email:', error);
  }
);

  }




}
