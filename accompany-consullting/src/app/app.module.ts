
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

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
import { ConsultantEvalMissionComponent } from './Mission/projet/consultant-eval-mission/consultant-eval-mission.component';
import { ConsutantevaluationsComponent } from './evaluation/consutantevaluations/consutantevaluations.component';
import { ShowEvaluationIntegrationComponent } from './evaluation/show-evaluation-integration/show-evaluation-integration.component';
import { ShowEval6Component } from './evaluation/eval-competance/show-eval6/show-eval6.component';
import { AdminComponent } from './admin/admin.component';
import { DashadminComponent } from './admin/dashadmin/dashadmin.component';
import { ValidationRhComponent } from './conges/consulterdemande/validation-rh/validation-rh.component';
import { PasswordDialogComponent } from './parametres/password-dialog/password-dialog.component';
import { AnniversairetableComponent } from './anniversaire/anniversairetable/anniversairetable.component';
import { ModifiersoldeComponent } from './modifiersolde/modifiersolde.component';
import { DemanderecupComponent } from '././Recuperation/demanderecup/demanderecup.component';
import { PageerreurComponent } from './parametres/pageerreur/pageerreur.component';
import { RequiperationValidateurComponent } from './Recuperation/demanderecup/requiperation-validateur/requiperation-validateur.component';
import { GroupeconsulterComponent } from './Recuperation/demanderecup/requiperation-validateur/groupeconsulter/groupeconsulter.component';
import { RecupRHComponent } from './Recuperation/recup-rh/recup-rh.component';
import { TraitegroupeComponent } from './Recuperation/recup-rh/traitegroupe/traitegroupe.component';
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
          ConsultantEvalMissionComponent,
          ConsutantevaluationsComponent,
          ShowEvaluationIntegrationComponent,
          ShowEval6Component,
          AdminComponent,
          DashadminComponent,
          ValidationRhComponent,
          PasswordDialogComponent,
          AnniversairetableComponent,
          ModifiersoldeComponent,
          DemanderecupComponent,
          PageerreurComponent,
          RequiperationValidateurComponent,
          GroupeconsulterComponent,
          RecupRHComponent,
          TraitegroupeComponent,
        
          
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
    
     
      provide: 'moment', useValue: moment 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
