import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Conge } from 'src/app/Model/conge';
import { ConsultantService } from 'src/app/Model/consultant/consultant.service';
import { AuthService } from 'src/app/service/Authentication Service/auth.service';
import { CongeService } from 'src/app/service/conge.service';
@Component({
  selector: 'app-congeshr',
  templateUrl: './congeshr.component.html',
  styleUrls: ['./congeshr.component.css']
})
export class CongeshrComponent implements OnInit {
  searchForm: FormGroup;

  selectedConge: Conge | null = null;

  showMonthSearch: boolean = false;
  selectedSearchMonth: Date | null = null;

  months = [
    { name: 'Janvier', value: 0 },
    { name: 'Février', value: 1 },
    { name: 'Mars', value: 2 },
    { name: 'Avril', value: 3 },
    { name: 'Mai', value: 4 },
    { name: 'Juin', value: 5 },
    { name: 'Juillet', value: 6 },
    { name: 'Août', value: 7 },
    { name: 'Septembre', value: 8 },
    { name: 'Octobre', value: 9 },
    { name: 'Novembre', value: 10 },
    { name: 'Décembre', value: 11 },
  ];
  
  searchValidatorTerm: string = '';
  selectedMonth: Date | null = null;

  conges: Conge[] = [];
  filteredConges: Conge[];

  constructor(private formBuilder: FormBuilder, private congeService: CongeService,
    private router: Router,
    private consultantService: ConsultantService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchValidatorTerm: [''],
      selectedMonth: [null],
    });
    this.congeService.getCongelist().subscribe(
      (data: Conge[]) => {
        this.conges = data;
        this.filteredConges = this.conges.filter(conge => conge.etat !== 'pas envoyer' && conge.etat !== 'Annuler');

        this.conges.forEach((conge) => {
          this.consultantService.getConsultant2(conge.demandeur).subscribe(
            (consultant: any) => {
              conge.demandeurnom = consultant.nom + ' ' + consultant.prenom;
            
              conge.duree = this.calculateDuree(conge.dateDebut , conge.dateFin);
            },
            (error) => {
              console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
            }
          );
        });

        this.conges.forEach((conge) => {
          this.consultantService.getConsultant2(conge.validateur).subscribe(
            (consultant: any) => {
              conge.validateurnom = consultant.nom + ' ' + consultant.prenom;
            
           
            },
            (error) => {
              console.log('Une erreur s\'est produite lors de la récupération du consultant :', error);
            }
          );
        });


      },
      (error) => {
        console.log('Une erreur s\'est produite lors de la récupération des congés :', error);
      }
    );

  }
  calculateDuree(debut : Date , fin : Date) {
    const dateDebut = new Date(debut);
    const dateFin = new Date(fin);

    // Calculez la différence en jours
    const differenceEnJours = Math.floor((dateFin.getTime() - dateDebut.getTime()) / (1000 * 3600 * 24))+1;

  
   return differenceEnJours;
  } 
  congedata(
    conge : Conge , consulterby:string
   ) {
     const congeData = {
       conge:conge ,
       consulterby:consulterby
     };
 
     this.congeService.setcongeData(congeData);
     console.log("from list"+congeData);
     this.router.navigate(['/detailconge']);
   }
   filterByToday() {
    // Logic to filter by today's date
    const today = new Date();
    this.filteredConges = this.conges.filter(conge => {
      // Compare the conge.dateDebut with today's date
      const congeDate = new Date(conge.dateDebut);
      return congeDate.toDateString() === today.toDateString();
    });
  }

  filterByWeek() {
    // Logic to filter by the current week
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));

    this.filteredConges = this.conges.filter(conge => {
      // Compare the conge.dateDebut with the start and end of the current week
      const congeDate = new Date(conge.dateDebut);
      return congeDate >= startOfWeek && congeDate <= endOfWeek;
    });
  }
  filterByMonth() {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
    this.filteredConges = this.conges.filter(conge => {
      const congeDate = new Date(conge.dateDebut);
      return congeDate >= startOfMonth && congeDate <= endOfMonth;
    });
  }
 
  
  
 
  
  
  

  
  
  
  

  searchConges() {
    const searchTerm = this.searchForm.get('searchValidatorTerm')?.value.toLowerCase();
    const selectedMonth = this.searchForm.get('selectedMonth')?.value;
  
    this.filteredConges = this.conges.filter(conge => {
      const demandeurnom = conge.demandeurnom.toLowerCase();
      const congeDate = new Date(conge.dateDebut);
    
      const matchesSearch = !searchTerm || demandeurnom.includes(searchTerm);
      const matchesMonth = selectedMonth === null || congeDate.getMonth()  === selectedMonth;
    
      return (matchesSearch && matchesMonth);
    });
    
  }
  
  
 

 

  toggleMonthSearch() {
    this.showMonthSearch = !this.showMonthSearch;
  }

  selectMonthSearch(selectedConge: Conge) {
    this.selectedConge = selectedConge;
    this.showMonthSearch = true;
  }

  searchByMonth() {
    this.selectedMonth = null;
    this.showMonthSearch = false;
    this.selectedConge = null;
  }
  
}
