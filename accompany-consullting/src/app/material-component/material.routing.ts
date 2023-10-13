import { Routes } from '@angular/router';

import { ButtonsComponent } from './buttons/buttons.component';
import { GridComponent } from './grid/grid.component';
import { ListsComponent } from './lists/lists.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { StepperComponent } from './stepper/stepper.component';
import { ChipsComponent } from './chips/chips.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProgressSnipperComponent } from './progress-snipper/progress-snipper.component';
import { ProgressComponent } from './progress/progress.component';
import { DialogComponent } from './dialog/dialog.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';

import { HomeComponent } from '../home/home.component';
import { ListresponsableComponent } from '../listresponsable/listresponsable.component';
import { ConsultantComponent } from '../consultant/consultant.component';
import { ListconsultantComponent } from '../consultant/listconsultant/listconsultant.component';
import { AddConsultantComponent } from '../consultant/add-consultant/add-consultant.component';
import { EvaluationListComponent } from '../evaluation-list/evaluation-list.component'; 
import { CalendarComponent } from '../calendar/calendar.component';
import { EntretientComponent } from '../entretient/entretient.component';
import { MailRecruteurComponent } from '../entretient/mail-recruteur/mail-recruteur.component';
import  { ListEntretienComponent } from '../entretient/list-entretien/list-entretien.component';
import { EntretiensuivantComponent } from '../entretient/entretiensuivant/entretiensuivant.component';
import { EntretientdetailComponent } from '../entretient/entretientdetail/entretientdetail.component';
import { EvaluationComponent } from '../evaluation/evaluation.component';
import { EvalRhIntegrationComponent } from '../evaluation/eval-rh-integration/eval-rh-integration.component';
import { ManagerEvalComponent } from '../manager-eval/manager-eval.component';
import { EvalCompetanceComponent } from '../evaluation/eval-competance/eval-competance.component';
import { DemandeComponent } from '../conges/demande/demande.component';
import { ListcongeComponent } from '../conges/listconge/listconge.component';
import { ConsulterdemandeComponent } from '../conges/consulterdemande/consulterdemande.component';
import { ListdemandeComponent } from '../conges/listdemande/listdemande.component';
import { CongeshrComponent } from '../conges/congeshr/congeshr.component';
import { CreateMissionComponent} from '../Mission/create-mission/create-mission.component'
import { EvalMonthComponent } from '../manager-eval/eval-month/eval-month.component';
import { EvalMonthConsultantComponent } from '../manager-eval/eval-month/eval-month-consultant/eval-month-consultant.component';
import { MissionsManagerComponent } from '../Mission/missions-manager/missions-manager.component';
import { ProjetComponent } from '../Mission/projet/projet.component';
import { ConsultantEvalMissionComponent } from '../Mission/projet/consultant-eval-mission/consultant-eval-mission.component';
import { ConsutantevaluationsComponent } from '../evaluation/consutantevaluations/consutantevaluations.component';
import { ShowEvaluationIntegrationComponent } from '../evaluation/show-evaluation-integration/show-evaluation-integration.component';
import { ShowEval6Component } from '../evaluation/eval-competance/show-eval6/show-eval6.component';
import { DashadminComponent } from '../admin/dashadmin/dashadmin.component';
import { AnniversaireComponent } from '../anniversaire/anniversaire.component';
import { AdminComponent } from '../admin/admin.component';
import { AnniversairetableComponent } from '../anniversaire/anniversairetable/anniversairetable.component';
import { ModifiersoldeComponent } from '../modifiersolde/modifiersolde.component';
import { DemanderecupComponent } from '../Recuperation/demanderecup/demanderecup.component';
import { AuthGuardService } from '../service/auth-guard-service.service';
import { RequiperationValidateurComponent } from '../Recuperation/demanderecup/requiperation-validateur/requiperation-validateur.component';
import { RecupRHComponent } from '../Recuperation/recup-rh/recup-rh.component';

export const MaterialRoutes: Routes = [

  { path: 'RecupRH', component: RecupRHComponent },

  { path: 'demanderequip', component: DemanderecupComponent },

  { path: 'validateurRequip', component: RequiperationValidateurComponent },

  { path: 'modifiersolde', component: ModifiersoldeComponent, canActivate: [AuthGuardService], data: { roles: ['admin'] }},

  { path: 'birthdaytable', component: AnniversairetableComponent},

  { path: 'birthday', component: AnniversaireComponent},
  


  { path: 'dash', component: DashadminComponent},

  { path: 'showevaluation', component: ShowEvaluationIntegrationComponent, canActivate: [AuthGuardService], data: { roles: ['admin'] }},
  { path: 'showevaluationcompetance', component: ShowEval6Component, canActivate: [AuthGuardService], data: { roles: ['admin'] }},

  { path: 'consultantEvals', component: ConsutantevaluationsComponent , canActivate: [AuthGuardService], data: { roles: ['admin'] }},

  { path: 'list_missions', component: MissionsManagerComponent },
  { path: 'eval-consultant', component:ConsultantEvalMissionComponent},


  { path: 'projet', component: ProjetComponent },
  { path: 'eval-month-consultant', component: EvalMonthConsultantComponent },

  { path: 'eval-month', component: EvalMonthComponent },

  { path: 'evaluation/:consultantId', component: EvaluationComponent },

  {path :'add_mission',component:CreateMissionComponent, canActivate: [AuthGuardService], data: { roles: ['admin'] }},

  {path :'les conges',component:CongeshrComponent, canActivate: [AuthGuardService], data: { roles: ['admin'] }},

  {path :'listdemandes',component:ListdemandeComponent},

  {path :'detailconge',component:ConsulterdemandeComponent},
  {path : 'listconge', component: ListcongeComponent},

  {path : 'demande', component: DemandeComponent},
  {path:'eval_competance', component:EvalCompetanceComponent},
  {path:'eval_mission', component:ManagerEvalComponent},

  {path:'evaluation-Integration',component:EvalRhIntegrationComponent, canActivate: [AuthGuardService], data: { roles: ['admin'] }},


  {path:'evaluation',component:EvaluationComponent},
  {path:'entretiensuivant',component:EntretiensuivantComponent},
{path:'entretientdetail',component :EntretientdetailComponent},
  {path:'list-entretien',component:ListEntretienComponent},
  {path: 'Entretient',component:EntretientComponent},
    {path: 'mail',component:MailRecruteurComponent},
  

  {path: 'Anniversaire',component:EvaluationListComponent},
  {path: 'calender',component:CalendarComponent},

  {path: 'AddConsultant', component:AddConsultantComponent, canActivate: [AuthGuardService], data: { roles: ['admin'] }},

  {path: 'consultant', component:ConsultantComponent},
  {path: 'listconsultants', component:ListconsultantComponent},

  {path: 'allusers', component:ListresponsableComponent},

  {
    path: 'button',
    component: ButtonsComponent
  },
  {path: 'home', component: HomeComponent},
  {
    path: 'button',
    component: ButtonsComponent
  },
  {
    path: 'grid',
    component: GridComponent
  },

  
  {
    path: 'lists',
    component: ListsComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'tabs',
    component: TabsComponent
  },
  {
    path: 'stepper',
    component: StepperComponent
  },

  {
    path: 'chips',
    component: ChipsComponent
  },
  {
    path: 'toolbar',
    component: ToolbarComponent
  },
  {
    path: 'progress-snipper',
    component: ProgressSnipperComponent
  },
  {
    path: 'progress',
    component: ProgressComponent
  },
  {
    path: 'dialog',
    component: DialogComponent
  },
  {
    path: 'tooltip',
    component: TooltipComponent
  },
  {
    path: 'snackbar',
    component: SnackbarComponent
  },
  {
    path: 'slider',
    component: SliderComponent
  },
  {
    path: 'slide-toggle',
    component: SlideToggleComponent
  },

 



];
