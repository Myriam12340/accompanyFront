import { Routes } from '@angular/router';

import { ButtonsComponent } from './buttons/buttons.component';
import { GridComponent } from './grid/grid.component';
import { ListsComponent } from './lists/lists.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { StepperComponent } from './stepper/stepper.component';
import { ExpansionComponent } from './expansion/expansion.component';
import { ChipsComponent } from './chips/chips.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProgressSnipperComponent } from './progress-snipper/progress-snipper.component';
import { ProgressComponent } from './progress/progress.component';
import { DialogComponent } from './dialog/dialog.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { ListerannonceComponent } from '../listerannonce/listerannonce.component';
import { ConsulterannonceComponent } from './consulterannonce/consulterannonce.component';
import { UpdateAnnonceComponent } from './update-annonce/update-annonce.component';
import { ListeReservationComponent } from './liste-reservation/liste-reservation.component';
import { FacturePdfComponent } from '../facture-pdf/facture-pdf.component';

import { AddresponsableComponent } from './addresponsable/addresponsable.component';
import { HomeComponent } from '../home/home.component';
import { ListresponsableComponent } from '../listresponsable/listresponsable.component';
import { ConsultantComponent } from '../consultant/consultant.component';
import { ListconsultantComponent } from '../listconsultant/listconsultant.component';
import { AddConsultantComponent } from '../add-consultant/add-consultant.component';
import { EvaluationListComponent } from '../evaluation-list/evaluation-list.component'; 
import { CalendarComponent } from '../calendar/calendar.component';
import { EntretientComponent } from '../entretient/entretient.component';
import { MailRecruteurComponent } from '../mail-recruteur/mail-recruteur.component';
import  { ListEntretienComponent } from '../list-entretien/list-entretien.component';
import { EntretiensuivantComponent } from '../entretiensuivant/entretiensuivant.component';
import { EntretientdetailComponent } from '../entretientdetail/entretientdetail.component';
import { EvaluationComponent } from '../evaluation/evaluation.component';
import { EvalRhIntegrationComponent } from '../eval-rh-integration/eval-rh-integration.component';
import { MissionComponent } from '../mission/mission.component';
import { ListmissionComponent } from '../listmission/listmission.component';
import { ManagerEvalComponent } from '../manager-eval/manager-eval.component';
import { EvalCompetanceComponent } from '../eval-competance/eval-competance.component';
import { DemandeComponent } from '../conges/demande/demande.component';
import { ListcongeComponent } from '../conges/listconge/listconge.component';
import { ConsulterdemandeComponent } from '../conges/consulterdemande/consulterdemande.component';
import { ListdemandeComponent } from '../conges/listdemande/listdemande.component';
import { CongeshrComponent } from '../conges/congeshr/congeshr.component';
import { CreateMissionComponent } from '../mission/create-mission/create-mission.component';
export const MaterialRoutes: Routes = [
  {path :'add_mission',component:CreateMissionComponent},

  {path :'les conges',component:CongeshrComponent},

  {path :'listdemandes',component:ListdemandeComponent},

  {path :'detailconge',component:ConsulterdemandeComponent},
  {path : 'listconge', component: ListcongeComponent},

  {path : 'demande', component: DemandeComponent},
  {path:'eval_competance', component:EvalCompetanceComponent},
  {path:'eval_mission', component:ManagerEvalComponent},

  {path:'list_missions', component:ListmissionComponent},
  {path:'evaluation-Integration',component:EvalRhIntegrationComponent},

  {path:'mission',component:MissionComponent},

  {path:'evaluation',component:EvaluationComponent},
  {path:'entretiensuivant',component:EntretiensuivantComponent},
{path:'entretientdetail',component :EntretientdetailComponent},
  {path:'list-entretien',component:ListEntretienComponent},
  {path: 'Entretient',component:EntretientComponent},
    {path: 'mail',component:MailRecruteurComponent},
  

  {path: 'evaluationlist',component:EvaluationListComponent},
  {path: 'calender',component:CalendarComponent},

  {path: 'AddConsultant', component:AddConsultantComponent},

  {path: 'consultant', component:ConsultantComponent},
  {path: 'listconsultants', component:ListconsultantComponent},

  {path: 'allusers', component:ListresponsableComponent},
  {path: 'addresponsable', component: AddresponsableComponent},
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

  {path: 'listeres',  component:  ListeReservationComponent},
  
  {path: 'facture',  component:  FacturePdfComponent},
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
    path: 'expansion',
    component: ExpansionComponent
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
  {
    path: 'listerannonce',
    component: ListerannonceComponent
  },
  {
    path: 'consulterannonce/:id',
    component: ConsulterannonceComponent
  },
  {
    path: 'modifierAnnonce/:annonceid',
    component: UpdateAnnonceComponent
  },


];
