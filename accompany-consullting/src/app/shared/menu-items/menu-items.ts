import { Injectable, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/Authentication Service/auth.service';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
 
}
var MENUITEMS;


MENUITEMS = [


  
 /* { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
  { state: 'button', type: 'link', name: 'Buttons', icon: 'crop_7_5' },
  { state: 'grid', type: 'link', name: 'Grid List', icon: 'view_comfy' },
  { state: 'lists', type: 'link', name: 'Lists', icon: 'view_list' },
  { state: 'menu', type: 'link', name: 'Menu', icon: 'view_headline' },
  { state: 'tabs', type: 'link', name: 'Tabs', icon: 'tab' },
  { state: 'stepper', type: 'link', name: 'Stepper', icon: 'web' },
  
  {
    state: 'addresponsable',
    type: 'link',
    name: 'Ajouter Responsable',
    icon: 'vertical_align_center'
  },
  {
    state: 'expansion',
    type: 'link',
    name: 'Ajouter Annonce',
    icon: 'all_inclusive'
  },
  
   {
    state: 'listerannonce',
    type: 'link',
    name: 'Lister Annonce',
    icon: 'blur_circular'
  },
    { state: 'button', type: 'link', name: 'Buttons', icon: 'crop_7_5' },
  { state: 'dashboard', type: 'link', name: 'Rapport Statistique ', icon: 'assignment_turned_in' },
  */

  { state: 'listconsultants', type: 'link', name: 'Liste des consultants ', icon: 'assignment_ind' },
  
  {
    state: 'Conge',
    type: 'sub',
    name: 'Dropdown',
    icon: 'arrow_drop_down',
    children: [
      {
        state: 'demande',
        name: 'Deamnde conge'
        
      },
      {
        state: 'listconge',
        name: 'list conge'
      },
      // Add more submenu items as needed
    ]
  },

  {
    state: 'projet',
    type: 'link',
    name: 'projet',
    icon: 'featured_play_list'
  },
  {
    state: 'list_missions',
    type: 'link',
    name: 'Missions',
    icon: 'featured_play_list'
  },
  {
    state: 'evaluation',
    type: 'link',
    name: 'evaluation',
    icon: 'notifications_active'
  },
  {
    state: 'list-entretien',
    type: 'link',
    name: 'Entretiens',
    icon: 'elevator'
  },
  {
    state: 'evaluationlist',
    type: 'link',
    name: 'Anniversaire ',
    icon: '✺︎'
  },
  
  
  {
    state: 'les conges',
    name: 'les conges',
    type:'link',
    icon:'find_in_page'
    
  },
  {
    state: 'demande',
    name: 'demande de congé',
    type:'link', icon:'note_add'
    
  },
  
  {
    state: 'listconge',
    name: 'Mes congés',
    type:'link',
    icon:'face'
  },
  {
    state: 'listdemandes',
    name: 'list demande des congés',
    type:'link'
    , icon:'playlist_add_check'
  },
 
  
  /*{
    state: 'progress-snipper',
    type: 'link',
    name: 'Progress snipper',
    icon: 'border_horizontal'
  },
    { state: 'toolbar', type: 'link', name: 'Toolbar', icon: 'voicemail' },
  {
    state: 'progress',
    type: 'link',
    name: 'Progress Bar',
    icon: 'blur_circular'
  },
  {
    state: 'dialog',
    type: 'link',
    name: 'Dialog',
    icon: 'assignment_turned_in'
  },
  { state: 'tooltip', type: 'link', name: 'Tooltip', icon: 'assistant' },
  { state: 'snackbar', type: 'link', name: 'Snackbar', icon: 'adb' },
  { state: 'slider', type: 'link', name: 'Slider', icon: 'developer_mode' },
  {
    state: 'slide-toggle',
    type: 'link',
    name: 'Slide Toggle',
    icon: 'all_inclusive'
  }
];

if ( sessionStorage.getItem("roles") == '["ROLE_RESPONSABLE"]')
{ console.log(sessionStorage.getItem("roles"));
  MENUITEMS = [{
    state: 'expansion',
    type: 'link',
    name: 'Ajouter Annonce',
    icon: 'vertical_align_center'
  },
  {
    state: 'evaluationlist',
    type: 'link',
    name: 'evaluationlist',
    icon: 'blur_circular'
  },
  
  { state: 'dashboard', type: 'link', name: 'Rapport Statistique ', icon: 'assignment_turned_in' },];
}


else if ( sessionStorage.getItem("roles") == '["ROLE_CLIENT"]')
{ console.log(sessionStorage.getItem("roles"));
  MENUITEMS = [{
    state: 'listerannonce',
    type: 'link',
    name: 'Lister Annonce',
    icon: 'blur_circular'
  },{
    state: 'listeres',
    type: 'link',
    name: 'Mes Réservation',
    icon: 'assignment_turned_in'
  }*/];


@Injectable()
export class MenuItems implements OnInit{
  ngOnInit(): void {
    window.location.reload();
  }
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
