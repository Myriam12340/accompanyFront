import { Component, OnInit } from '@angular/core';
import { ConsultantService } from 'src/app/Model/consultant/consultant.service';
import { Consultant } from 'src/app/Model/consultant';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
//import { ConsultantdetailComponent } from 'src/app/consultantdetail/consultantdetail.component';

import { AddConsultantComponent } from 'src/app/add-consultant/add-consultant.component';
import { ConsultantdetailComponent } from '../consultantdetail/consultantdetail.component';
import { UpdateconsultantComponent } from '../updateconsultant/updateconsultant.component';
import { PageEvent } from '@angular/material/paginator';


import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ConsultantModule } from '../Model/consultant/consultant.module';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;




@Component({
  selector: 'app-listconsultant',
  templateUrl: './listconsultant.component.html',
  styleUrls: ['./listconsultant.component.css']
})
export class ListconsultantComponent implements OnInit {
  

  type : string ; 
  selectedConsultant: any;
  searchTerm: string;
  filteredDataSource = new MatTableDataSource<Consultant>([]);

  public filteredConsultants: Consultant[] = [];

  filtre: string = '';

 

  displayedColumns: string[] = ['nom', 'prenom', 'adresse', 'grade', 'date_naissance', 'genre', 'cin', 'tel1', 'tel2', 'mail', 'fonction', 'contrat', 'societe', 'date_integration', 'business_unit', 'status', 'code', 'age', 'situation_amoureuse'];
















  filtreStatuts(status: string) {
    this.filtre = status;
  }

  consultants: Consultant[] = []; // Initialisation de la variable consultants
  selection = new SelectionModel<Consultant>(true, []);
  dataSource = new MatTableDataSource(this.consultants);

  paginatedConsultants: Consultant[] = [];
  
  pageSizeOptions: number[] = [5, 10, 20, 50];
  pageSize = 5;
  currentPage = 0;
  totalConsultants = 0;
  nbactif :Number ;
  nbinactif: number ;
  constructor(private consultantservice: ConsultantService, private router: Router,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.allconsultant();
   
  
  }

  private allconsultant() {
    this.consultantservice.getConsultantlist().subscribe((data) => {
      this.consultants = data.sort((c1, c2) => {
        const date1 = new Date(c1.date_integration);
        const date2 = new Date(c2.date_integration);
        this.paginatedConsultants = this.consultants.slice(0, this.pageSize);
       
        return date2.getTime() - date1.getTime();

      });
      this.totalConsultants = this.consultants.length;
      console.log( this.totalConsultants);
      console.log(data);
      this.type="tous";
      console.log(this.type);

      this.filteredConsultants = this.consultants; // Initialisation de filteredConsultants après avoir reçu les données du service
    });
  }


  

  public filterConsultantsByStatus(status: string): void {
    if (status === 'actif') {
      this.type="actif";

      // Show only active consultants
      this.filteredConsultants = this.consultants.filter(c => c.status === 'actif');
      this.nbactif = this.filteredConsultants.length ;
      console.log ("nb actif"+ this.totalConsultants);
    } else if (status === 'inactif') {
      // Show only inactive consultants
      this.filteredConsultants = this.consultants.filter(c => c.status === 'inactif');
      this.nbinactif = this.filteredConsultants.length ;
      console.log ("nb inactif"+ this.totalConsultants);
      this.type="inactif";



    } else {
      // Show all consultants
      this.filteredConsultants = this.consultants;
      this.type="tous";

    }
console.log(this.type);
  }














  add() {
    this.dialog.open(AddConsultantComponent);

  }


  onSearch() {
    this.filteredConsultants = this.consultants.filter(c =>
      c.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.prenom.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }






  onconsulte(){ const selectedConsultant = this.selection.selected[0]; // assuming only one consultant can be selected
  const dialogConfig = new MatDialogConfig();
  dialogConfig.data = { consultant: selectedConsultant };
  this.dialog.open(ConsultantdetailComponent, dialogConfig);



  }






  onConsultantSelectionChange(event, consultant) {
    this.selection.clear(); // Efface toute sélection précédente
    this.selection.select(consultant); // Sélectionne l'élément souhaité
    console.log("Id consultant sélectionné:", consultant.id);
  }
  

  onEdit() {
    const selectedConsultant = this.selection.selected[0]; // assuming only one consultant can be selected
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { consultant: selectedConsultant };
    console.log( selectedConsultant );
    console.log(dialogConfig );

    this.dialog.open(UpdateconsultantComponent, dialogConfig);
  }
  

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
  }



  loadConsultants() {
    this.consultantservice.getConsultantlist().subscribe(data => {
      this.consultants = data;
      this.totalConsultants = this.consultants.length;
      console.log ("lenth to "+this.totalConsultants);
    });
  }


  isEvalComing(dateIntegration: Date, period: number) {
    const currentDate = new Date();
    const evalDate = new Date(dateIntegration);
    evalDate.setMonth(evalDate.getMonth() + period);
    evalDate.setDate(evalDate.getDate() - 15); // 15 jours avant la date d'évaluation
  
    return currentDate.getTime() >= evalDate.getTime();
  }



///PDF 


pdf(type : any) {
console .log (this.type);
  const logo = ('src/assets/images/Logo-HD.png'); // Only required in Node.js
   const nbActif = this.consultants.filter((consultant) => consultant.status === 'actif').length;
   const nbInActif = this.consultants.filter((consultant) => consultant.status === 'inactif').length;
   var nb = "";
   // Récupérer la liste des consultants en fonction du type sélectionné
   if (type === 'actif') {
    this.filteredConsultants = this.consultants.filter(c => c.status === 'actif');
 nb ="Nombre de  Consultants Actif : " + nbActif ;
  }
  else if (type === 'inactif') {
    this.filteredConsultants = this.consultants.filter(c => c.status === 'inactif');
    nb ="Nombre de Consultants InActif : " + nbInActif ;
  }
  else {
    this.filteredConsultants = this.consultants;
    nb ="Nombre de Consultants Actif : " + nbActif +"\n Nombre de Consultants  InActif :"+ nbInActif ;

  }
  const documentDefinition = {
    
    content: [
   
      {
        text: 'Liste des consultants',
        style: 'header'
        , continue : this.nbactif 
      },  {
        text:  nb,
        style: 'subheader'
      },
    
      {
        table: {
          headerRows: 1,
          widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
          body: [
            [
              { text: 'Nom', style: 'tableHeader', fillColor: '#cccccc' },
              { text: 'Prénom', style: 'tableHeader', fillColor: '#cccccc' },
              { text: 'Grade', style: 'tableHeader', fillColor: '#cccccc' },
              { text: 'Adresse', style: 'tableHeader', fillColor: '#cccccc' },
              { text: 'Téléphone', style: 'tableHeader', fillColor: '#cccccc' },
              { text: 'E-mail', style: 'tableHeader', fillColor: '#cccccc' },
              { text: 'Statut', style: 'tableHeader', fillColor: '#cccccc' }
            ],
            ... this.filteredConsultants.map((cons: Consultant) => {
              return [
                { text: cons.nom, style: 'tableCell' },
                { text: cons.prenom, style: 'tableCell' },
                { text: cons.grade, style: 'tableCell' },
                { text: cons.adress, style: 'tableCell' },
                { text: cons.tel1 + (cons.tel2 ? '\n' + cons.tel2 : ''), style: 'tableCell' },
                { text: cons.mail, style: 'tableCell' },
                { text: cons.status, style: 'tableCell' }
              ];
            })
          ]
        }
      }
    ],
    images: {
      logo: logo, // Use a dataURL for browser environments
    },
    styles: {
      header: {
        fontSize: 16,
        bold: true,
        margin: [0, 0, 0, 20] ,
        color :'red',
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'white',
        fillColor: '#333333',
        margin: [0, 4, 0, 2]
      }, footer: {
        columns: [
          'Left part',
          { text: 'Right part', alignment: 'right' }
        ]
      },
    }
  };
  pdfMake.createPdf(documentDefinition).download();
}




   }
 
  

