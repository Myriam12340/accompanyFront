import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/service/Authentication Service/auth.service';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

@Injectable()
export class MenuItems {
  private MENUITEMS: Menu[] = []; // Initialize an empty array

  constructor(private authService: AuthService) {
    this.loadMenuItems();
  }
  ngOnInit(
    
    ): void {
      window.location.reload();}
  private loadMenuItems(): void {

    if (sessionStorage.getItem("jwt")) {
      this.authService.getUserProfile(localStorage.getItem("jwt")).subscribe(
        userProfile => {
          const role = userProfile.role;

          if (role === "consultant") {
            this.MENUITEMS.push(
              {
                state: 'demande',
                name: 'Demande de congé',
                type: 'link',
                icon: 'note_add'
              },
              {
                state: 'listconge',
                name: 'Mes congés',
                type: 'link',
                icon: 'face'
              },
              {
                state: 'projet',
                type: 'link',
                name: 'Projet',
                icon: 'featured_play_list'
              }
              , 
              {
                state: 'list_missions',
                name: 'list_missions',
                type: 'link',
                icon: 'playlist_add_check'
              }
              , {
                state: 'listconge',
                name: 'Mes congés',
                type: 'link',
                icon: 'face'
              }
            );
          } else if (role === "admin") {
            this.MENUITEMS.push(
              { state: 'add_mission', 
type: 'link', name: 'créer mission ',
 icon: 'assignment_ind' },
             
              { state: 'listconsultants', 
type: 'link', name: 'Liste du personnels ',
 icon: 'assignment_ind' },
 {
  state: 'les conges',
  name: 'list Conge',
  type: 'link',
  icon: 'face'
},
              {
                state: 'demande',
                name: 'Demande de congé',
                type: 'link',
                icon: 'note_add'
              },
              {
                state: 'listconge',
                name: 'Mes congés',
                type: 'link',
                icon: 'face'
              },
              {
                state: 'projet',
                type: 'link',
                name: 'Projet',
                icon: 'featured_play_list'
              },
              {
                state: 'evaluation',
                type: 'link',
                name: 'Évaluation',
                icon: 'notifications_active'
              },
              {
                state: 'list-entretien',
                type: 'link',
                name: 'Entretiens',
                icon: 'elevator'
              },
              {
                state: 'birthday',
                type: 'link',
                name: 'Anniversaire',
                icon: '✺︎'
              },
              {
                state: 'listdemandes',
                name: 'Liste des demandes de congés',
                type: 'link',
                icon: 'playlist_add_check'
              }
            );
          }

          else if (role === "manager") {
            this.MENUITEMS.push(
             
             
              { state: 'listconsultants', 
type: 'link', name: 'Liste du personnels ',
 icon: 'assignment_ind' },
             
              {
                state: 'demande',
                name: 'Demande de congé',
                type: 'link',
                icon: 'note_add'
              },
              {
                state: 'listconge',
                name: 'Mes congés',
                type: 'link',
                icon: 'face'
              },
              {
                state: 'projet',
                type: 'link',
                name: 'Projet',
                icon: 'featured_play_list'
              },
              {
                state: 'evaluation',
                type: 'link',
                name: 'Évaluation',
                icon: 'notifications_active'
              },
              {
                state: 'list-entretien',
                type: 'link',
                name: 'Entretiens',
                icon: 'elevator'
              },
              {
                state: 'birthday',
                type: 'link',
                name: 'Anniversaire',
                icon: '✺︎'
              },
              {
                state: 'listdemandes',
                name: 'Liste des demandes de congés',
                type: 'link',
                icon: 'playlist_add_check'
              },
              {
                state: 'list_missions',
                name: 'list_missions',
                type: 'link',
                icon: 'playlist_add_check'
              }
            );}

          console.log(this.MENUITEMS);
        },
        error => console.error(error)
      );
    }
  }

  getMenuitem(): Menu[] {
    return this.MENUITEMS;
  }
}
