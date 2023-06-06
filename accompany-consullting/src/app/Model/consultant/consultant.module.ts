import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListconsultantComponent } from 'src/app/listconsultant/listconsultant.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
 
  imports: [
    CommonModule   , MatCheckboxModule ,MatPaginatorModule,
    // Importez le module MatCheckboxModule ici

  ]
})
export class ConsultantModule {
  id: number;
  salaire : number;
  nom: string;
  prenom: string;
  adress: string;
  grade: string;
  status: string;
  fonction: string;
  contrat: string;
  societe: string;
  business_unit: string;
  date_integration: Date;
  date_naissance: Date;
  age: number;
  cin: string;
  tel1: string;
  tel2: string;
  mail: string;
  code:string;
  situation_amoureuse:string;
  isBirthday:boolean;
  isPro:boolean;
  isI1 : Boolean ;
  isI3 : boolean ;
  isI6 : boolean ;
  prochain_entretien: string; // Nouvelle propriété

 }
