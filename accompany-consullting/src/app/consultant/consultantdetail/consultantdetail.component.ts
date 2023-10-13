import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Consultant } from '../../Model/consultant';
import { DatePipe } from '@angular/common';
import { EntretienService } from 'src/app/service/entretient.service';
import { entretient } from 'src/app/Model/entretient';
import { ConsultantService } from 'src/app/Model/consultant/consultant.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { FichierService } from 'src/app/service/fichier.service';
@Component({
  selector: 'app-consultantdetail',
  templateUrl: './consultantdetail.component.html',
  styleUrls: ['./consultantdetail.component.css']
})
export class ConsultantdetailComponent implements OnInit {

  consultant: any;
  formattedDate: string;
day : string ;
nom : any;
candidat:any;
entretients: entretient[] = [];
recruteur :any;
recruteursuivant :any;
imgurl: SafeResourceUrl;
showPdf: boolean = false;
photo:any;
constructor(@Inject(MAT_DIALOG_DATA) private data: any ,private fichieservice:FichierService ,private sanitizer: DomSanitizer,private http: HttpClient,private entretienService:EntretienService, private consultantservice : ConsultantService ) { 
    this.consultant = data.consultant;

  }

  ngOnInit(): void {
    this.photo = this.consultant.photo;

    this.entretienService.getCandidatparphone(this.consultant.tel1).subscribe((candidatData) => {
      this.candidat = candidatData;
      console.log("hello "+ this.candidat.id);


      this.entretienService.getEntretienCandidat(this.candidat.id).subscribe((entretien) => {
        this.entretients = entretien;
        console.log("hellosss "+ this.entretients);


        this.entretients.forEach(e => {
          //recruteur name
          this.consultantservice.getConsultant2(e.recruteur).subscribe((recruteurData) => {
            this.recruteur = recruteurData;
            console.log("hello "+ this.recruteur.nom);
          
            
          });
          this.consultantservice.getConsultant2(e.recruteurSuivant).subscribe((recruteurData) => {
            this.recruteursuivant = recruteurData;
          
            
          });
       
        });
      });
  
      
    });
   
    console.log("urrrrrrl",this.photo);
 

    this.fichieservice.downloadimage( this.photo).subscribe(
      (response: any) => {
        this.imgurl = this.fichieservice.createBlobphoto(response);
      },
      (error) => {
        console.error(error);
      }
    );


  }

  dateconvert(date:any):String{
     
    this.consultant.date_integration =new Date(date);
     this.day = this.consultant.date_integration.getDay()+'-'+this.consultant.date_integration.getMonth()+'-'+this.consultant.date_integration.getFullYear();
    
    return this.consultant.date_integration.getDay()+'-'+this.consultant.date_integration.getMonth()+'-'+this.consultant.date_integration.getFullYear() ;
  }  
  

  // Formater la date en utilisant moment.js

  

  togglePdfViewer(): void {
    this.showPdf = !this.showPdf;
  }
}
