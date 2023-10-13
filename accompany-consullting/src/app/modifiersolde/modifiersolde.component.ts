import { Component, OnInit } from '@angular/core';
import { ConsultantService } from '../Model/consultant/consultant.service';
import { Consultant } from '../Model/consultant';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-modifiersolde',
  templateUrl: './modifiersolde.component.html',
  styleUrls: ['./modifiersolde.component.css']
})
export class ModifiersoldeComponent implements OnInit {

  numberOfDays: number;
  selectedConsultantsBeforeSearch: Consultant[] = [];

  type: string;
  selectedConsultant: any;

  filteredDataSource = new MatTableDataSource<Consultant>([]);

  public filteredConsultants: Consultant[] = [];

  filtre: string = '';

  displayedColumns: string[] = ['select', 'nom', 'prenom', 'adresse', 'grade', 'date_naissance', 'genre', 'cin', 'tel1', 'tel2', 'mail', 'fonction', 'contrat', 'societe', 'SoldeConge', 'business_unit', 'status', 'code', 'age', 'situation_amoureuse'];

  selectedStatus: string = '';

  formatDate(isoDate: any) {
    const dateParts = isoDate.split('T')[0].split('-');
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  }

  filtreStatuts(status: string) {
    this.filtre = status;
    this.selectedStatus = status;
  }

  consultants: Consultant[] = [];
  selection = new SelectionModel<Consultant>(true, []);
  dataSource = new MatTableDataSource(this.consultants);

  paginatedConsultants: Consultant[] = [];
  pageSizeOptions: number[] = [5, 10, 20];
  pageSize = 5;
  currentPage: number;
  totalConsultants: number;
  nbactif: Number;
  nbinactif: number;
  userProfile: any;

  constructor(private consultantservice: ConsultantService) { }

  ngOnInit(): void {
    this.allconsultant();
  }
  filterInactiveConsultants() {
    this.filteredConsultants = this.consultants.filter(consultant => consultant.status === 'actif');
    this.paginateConsultants(); // Appliquez la pagination si nécessaire
}

private allconsultant() {
  this.consultantservice.getConsultantlist().subscribe((data) => {
      this.consultants = data.sort((c1, c2) => {
          const date1 = new Date(c1.date_integration);
          const date2 = new Date(c2.date_integration);
          return date2.getTime() - date1.getTime();
      });

      this.filterInactiveConsultants(); // Filtrer les consultants inactifs
      
      this.totalConsultants = this.filteredConsultants.length;
      console.log(this.totalConsultants);

      this.type = "tous";
      this.selection.select(...this.filteredConsultants);
  });
}

  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
  
    // Sauvegarder la sélection avant la recherche
    this.selectedConsultantsBeforeSearch = this.getSelectedConsultants();
  
    // Appliquer le filtre
    this.filteredConsultants = this.consultants.filter((consultant) =>
      consultant.nom.toLowerCase().includes(filterValue) || consultant.prenom.toLowerCase().includes(filterValue)
    );
  
    // Mettre à jour la pagination
    this.paginateConsultants();
  }
  
  
  paginateConsultants() {
    const startIndex = this.currentPage * this.pageSize;
    this.paginatedConsultants = this.filteredConsultants.slice(startIndex, startIndex + this.pageSize);
  
    // Restaurer la sélection après la pagination
    this.selection.clear();
    this.selection.select(...this.paginatedConsultants, ...this.selectedConsultantsBeforeSearch);
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
    });
  }

  isEvalComing(dateIntegration: Date, period: number) {
    const currentDate = new Date();
    const evalDate = new Date(dateIntegration);
    evalDate.setMonth(evalDate.getMonth() + period);
    evalDate.setDate(evalDate.getDate() - 15);
    return currentDate.getTime() >= evalDate.getTime();
  }

  updateSoldeCongeForSelectedConsultants() {
    const selectedConsultants = this.getSelectedConsultants();

    if (selectedConsultants.length === 0) {
      return;
    }

    for (const consultant of selectedConsultants) {
      this.consultantservice.updatesoldeconge(consultant.id, this.numberOfDays).subscribe(
        (response) => {
          console.log(`Solde de conge mis à jour avec succès pour le consultant ${consultant.id}`);
        },
        (error) => {
          console.error(`Erreur lors de la mise à jour du solde de conge pour le consultant ${consultant.id}`, error);
        }
      );
    }
    window.location.reload();


  }

  updateSoldeCongeajouter() {
    const selectedConsultants = this.getSelectedConsultants();

    if (selectedConsultants.length === 0) {
      return;
    }

    for (const consultant of selectedConsultants) {
      this.consultantservice.updatesbonus(consultant.id, this.numberOfDays).subscribe(
        (response) => {
          console.log(`Solde de conge mis à jour avec succès pour le consultant ${consultant.id}`);
        },
        (error) => {
          console.error(`Erreur lors de la mise à jour du solde de conge pour le consultant ${consultant.id}`, error);
        }
      );
    }
    window.location.reload();

  }



  getSelectedConsultants(): Consultant[] {
    return Array.from(this.selection.selected);
  }

  onConsultantSelectionChange(event: any, consultant: Consultant) {
    // Si la case à cocher est cochée, ajoutez le consultant à la sélection
    if (event.checked) {
      this.selection.select(consultant);
    } else {
      // Si la case à cocher est désélectionnée, retirez le consultant de la sélection
      this.selection.deselect(consultant);
    }
  }
  
}
