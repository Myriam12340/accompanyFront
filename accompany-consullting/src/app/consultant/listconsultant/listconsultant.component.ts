import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsultantService } from 'src/app/Model/consultant/consultant.service';
import { Consultant } from 'src/app/Model/consultant';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
//import { ConsultantdetailComponent } from 'src/app/consultantdetail/consultantdetail.component';

import { AddConsultantComponent } from 'src/app/consultant/add-consultant/add-consultant.component';
import { ConsultantdetailComponent } from '../consultantdetail/consultantdetail.component';
import { UpdateconsultantComponent } from '../updateconsultant/updateconsultant.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ConsultantModule } from '../../Model/consultant/consultant.module';
import { AuthService } from 'src/app/service/Authentication Service/auth.service';

import * as XLSX from 'xlsx';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;




@Component({
  selector: 'app-listconsultant',
  templateUrl: './listconsultant.component.html',
  styleUrls: ['./listconsultant.component.css']
})
export class ListconsultantComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  role : any ;

  type : string ; 
  selectedConsultant: any;
  searchTerm: string;
  filteredDataSource = new MatTableDataSource<Consultant>([]);

  public filteredConsultants: Consultant[] = [];

  filtre: string = '';

 

  displayedColumns: string[] = ['nom', 'prenom', 'adresse', 'grade', 'date_naissance', 'genre', 'cin', 'tel1', 'tel2', 'mail', 'fonction', 'contrat', 'societe', 'date_integration', 'business_unit', 'status', 'code', 'age', 'situation_amoureuse'];

  selectedStatus: string = '';

  exportToExcel() {
    let consultantsToExport = this.filteredConsultants;
  
  if (this.selectedStatus === 'actif') {
    consultantsToExport = this.filteredConsultants.filter(cons => cons.status === 'Actif');
  } else if (this.selectedStatus === 'inactif') {
    consultantsToExport = this.filteredConsultants.filter(cons => cons.status === 'Inactif');
  }
    const personalData = this.filteredConsultants.map(cons => ({


      Nom: cons.nom,
      Prénom: cons.prenom,
      Adresse: cons.adress,

      Email: cons.mail,
      Age: cons.age,
      
      Date_naissance: this.formatDate(cons.date_naissance),   
         situation_amoureuse:cons.situation_amoureuse,
      Cin:cons.cin,
      Mobile1:cons.tel1,
      Mobile2:cons.tel2,
      Statut:cons.status
    }));
  
    const hrData = this.filteredConsultants.map(cons => ({
      Nom: cons.nom,
      Prénom: cons.prenom,
      Code: cons.code,
      Grade: cons.grade,
    
      Foncttion:cons.fonction
    }));
  
    const contractData = this.filteredConsultants.map(cons => ({
      Nom: cons.nom,
      Prénom: cons.prenom,
      Contrat: cons.contrat,
      Salaire:cons.salaire,
      Date_integration:this.formatDate(cons.date_integration),
      Societe:cons.societe,
      Business_Unit:cons.business_unit
    }));
    
  
    const personalWorksheet = XLSX.utils.json_to_sheet(personalData);
    
    const hrWorksheet = XLSX.utils.json_to_sheet(hrData);
    const contractWorksheet = XLSX.utils.json_to_sheet(contractData);
   
    // Set background color for header row to red
    personalWorksheet['!cols'] = [
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 150 },
      { wpx: 150 },
      { wpx: 100 },
      { wpx: 150 },
      { wpx: 200 }
    ];
    const blueBackgroundColorStyle = { fgColor: { rgb: '#0000FF' } };
    personalWorksheet['A1'].s = blueBackgroundColorStyle; 
    personalWorksheet['B1'].s = blueBackgroundColorStyle; 
    const style = {
      fill: {
        fgColor: { rgb: 'FF0000' }, // Red color
      },
    };
  
    const firstRowCols = ['A', 'B', 'C', 'D', 'E', 'F', 'G']; // Update with your column letters
    firstRowCols.forEach(col => {
      personalWorksheet[col + '1'] = Object.assign({}, personalWorksheet[col + '1'], { s: style });
    });
  
    const workbook = {
      Sheets: {
        'Données Personnelles': personalWorksheet,
        'Données RH': hrWorksheet,
        'Données Contractuelles': contractWorksheet
      },
      SheetNames: ['Données Personnelles', 'Données RH', 'Données Contractuelles']
    };
  
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx',type: 'buffer'  });
  
    this.saveAsExcelFile(excelBuffer, 'consultants_data');
  }
  
  
  saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const blobUrl = URL.createObjectURL(data);
  
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${fileName}.xlsx`;
    link.click();
  
    URL.revokeObjectURL(blobUrl);
  }


  formatDate(isoDate: any) {
    const dateParts = isoDate.split('T')[0].split('-');
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  }





  filtreStatuts(status: string) {
    this.filtre = status;
    this.selectedStatus = status;

  }

  consultants: Consultant[] = []; // Initialisation de la variable consultants
  selection = new SelectionModel<Consultant>(true, []);
  dataSource = new MatTableDataSource(this.consultants);

  paginatedConsultants: Consultant[] = [];
  
  pageSizeOptions: number[] = [5,10,20];
  pageSize = 5;
  currentPage : number;
  totalConsultants: number;
  
  nbactif :Number ;
  nbinactif: number ;
  userProfile: any;

  constructor(    private authService: AuthService,
    private consultantservice: ConsultantService, private router: Router,private dialog: MatDialog) { }

  
  
    ngOnInit(): void {
    const jwt = sessionStorage.getItem('jwt');
    if (jwt) {
      this.authService.getUserProfile(jwt).subscribe(
        (userProfile) => {
          this.userProfile = userProfile;
          console.log(this.userProfile);
          this.role  = userProfile.role;

       
        },
        (error) => console.error(error)
      );
    }
    this.allconsultant();
   
  }

  private allconsultant() {
    this.consultantservice.getConsultantlist().subscribe((data) => {
      this.consultants = data.sort((c1, c2) => {
        const date1 = new Date(c1.date_integration);
        const date2 = new Date(c2.date_integration);
       
       
        return date2.getTime() - date1.getTime();

      });
      this.totalConsultants = this.consultants.length;
      console.log( this.totalConsultants);
      console.log(data);
      this.type="tous";
      console.log(this.type);

      this.filteredConsultants = this.consultants; // Initialisation de filteredConsultants après avoir reçu les données du service
   
      this.filteredConsultants.slice(0, this.pageSize);
   
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
 paginateConsultants() {
  const startIndex = this.currentPage * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  console.log('Start Index:', startIndex);
  console.log('End Index:', this.pageSize);
 this.filteredConsultants= this.filteredConsultants.slice(0, this.pageSize);

  console.log('Paginated Consultants:', this.paginatedConsultants);
}

  

 
  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.paginateConsultants();
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
 
  
