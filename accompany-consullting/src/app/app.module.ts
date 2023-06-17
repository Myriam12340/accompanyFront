
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { RegisterComponent } from './SignUp Component/register/register.component';
import { LoginComponent } from './SignUp Component/login/login.component';
import { HomeComponent } from './home/home.component';
import { ListresponsableComponent } from './listresponsable/listresponsable.component';
import { ConsultantComponent } from './consultant/consultant.component';
import { ListconsultantComponent } from './consultant/listconsultant/listconsultant.component';
import { AddConsultantComponent } from './consultant/add-consultant/add-consultant.component';
import { ConsultantdetailComponent } from './consultant/consultantdetail/consultantdetail.component';
import { UpdateconsultantComponent } from './consultant/updateconsultant/updateconsultant.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; 
import { MatCardModule } from '@angular/material/card';

import { MatTableModule } from '@angular/material/table';
import * as moment from 'moment';
import { EntretientComponent } from './entretient/entretient.component';
import { AnniversaireComponent } from './anniversaire/anniversaire.component';
import { JwtModule } from "@auth0/angular-jwt";
import { MailRecruteurComponent } from './entretient/mail-recruteur/mail-recruteur.component';
import { ListEntretienComponent } from './entretient/list-entretien/list-entretien.component';
import { EntretiensuivantComponent } from './entretient/entretiensuivant/entretiensuivant.component';
import { EntretientdetailComponent } from './entretient/entretientdetail/entretientdetail.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { EvalRhIntegrationComponent } from './evaluation/eval-rh-integration/eval-rh-integration.component';
import { ManagerEvalComponent } from './manager-eval/manager-eval.component';
import { EvalCompetanceComponent } from './evaluation/eval-competance/eval-competance.component';
import { DemandeComponent } from './conges/demande/demande.component';
import { ListcongeComponent } from './conges/listconge/listconge.component';
import { ConsulterdemandeComponent } from './conges/consulterdemande/consulterdemande.component';
import { ListdemandeComponent } from './conges/listdemande/listdemande.component';
import { CongeshrComponent } from './conges/congeshr/congeshr.component';
import { CreateMissionComponent } from './Mission/create-mission/create-mission.component';
import { EvalMonthComponent } from './manager-eval/eval-month/eval-month.component';
import { EvalMonthConsultantComponent } from './manager-eval/eval-month/eval-month-consultant/eval-month-consultant.component';
import { ProjetComponent } from './Mission/projet/projet.component';
import { MissionsManagerComponent } from './Mission/missions-manager/missions-manager.component';
export function tokenGetter() { 
  return localStorage.getItem("jwt"); 
}
@NgModule({
  
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
  
   
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    

    ListresponsableComponent,
          ConsultantComponent,
          ListconsultantComponent,
          AddConsultantComponent,
          ConsultantdetailComponent,
          UpdateconsultantComponent,
          EntretientComponent,
          AnniversaireComponent,
          MailRecruteurComponent,
          ListEntretienComponent,
          EntretiensuivantComponent,
          EntretientdetailComponent,
          EvaluationComponent,
          EvalRhIntegrationComponent,
      
          ManagerEvalComponent,
          EvalCompetanceComponent,
          DemandeComponent,
          ListcongeComponent,
          ConsulterdemandeComponent,
          ListdemandeComponent,
          CongeshrComponent,
          CreateMissionComponent,
          EvalMonthComponent,
          EvalMonthConsultantComponent,
          ProjetComponent,
          MissionsManagerComponent,
          
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),    FullCalendarModule,MatTableModule
    ,MatCardModule, JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:60734"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    {
    
      useClass: PathLocationStrategy,
      provide: 'moment', useValue: moment 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
