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
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;




@Component({
  selector: 'app-listconsultant',
  templateUrl: './listconsultant.component.html',
  styleUrls: ['./listconsultant.component.css']
})
export class ListconsultantComponent implements OnInit {
  

  
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
      console.log(data);
      this.filteredConsultants = this.consultants; // Initialisation de filteredConsultants après avoir reçu les données du service
    });
  }

  

  public filterConsultantsByStatus(status: string): void {
    if (status === 'actif') {
      // Show only active consultants
      this.filteredConsultants = this.consultants.filter(c => c.status === 'actif');
    } else if (status === 'inactif') {
      // Show only inactive consultants
      this.filteredConsultants = this.consultants.filter(c => c.status === 'inactif');
    } else {
      // Show all consultants
      this.filteredConsultants = this.consultants;
    }
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




generatePdf() {
  const documentDefinition = {
    content: [
      {
        text: 'Liste des consultants',
        style: 'header'
      },
      {
        table: {
          headerRows: 1,
          widths: ['*', '*', '*', '*', '*', '*'],
          body: [
            [
              { text: 'Nom', style: 'tableHeader' },
              { text: 'Prénom', style: 'tableHeader' },
              { text: 'Grade', style: 'tableHeader' },
              { text: 'Adresse', style: 'tableHeader' },
              { text: 'Téléphone', style: 'tableHeader' },
              { text: 'E-mail', style: 'tableHeader' }
            ],
            ...this.consultants.map((consultant: Consultant) => {
              return [
                consultant.nom,
                consultant.prenom,
                consultant.grade,
                consultant.adress,
                consultant.tel1 + (consultant.tel2 ? '\n' + consultant.tel2 : ''),
                consultant.mail
              ];
            })
          ]
        }
      }
    ],
    styles: {
      header: {
        fontSize: 22,
        bold: true,
        margin: [0, 0, 0, 20]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      }
    }
  };
  pdfMake.createPdf(documentDefinition).download();
}



   }
 
  

