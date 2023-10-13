import { Injectable } from '@angular/core';
import { Consultant } from 'src/app/Model/consultant';
import { ConsultantService } from 'src/app/Model/consultant/consultant.service';
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
consultant:any;
  constructor(private authService: AuthService,private consultantservice: ConsultantService) {
    this.loadMenuItems();
  }
  ngOnInit(
    
    ): void {
      }
  private loadMenuItems(): void {

    if (sessionStorage.getItem("jwt")) {
      this.authService.getUserProfile(localStorage.getItem("jwt")).subscribe(
        userProfile => {
          const role = userProfile.role;

          this.consultantservice.getConsultantbyemail(userProfile.email).subscribe(
            (response) => {
              this.consultant = response;
              const grade = this.consultant.grade;
          

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
                icon: 'insert_invitation'
              },
              {
                state: 'projet',
                type: 'link',
                name: 'Projet',
                icon: 'work'
              }
             , {
                state: 'demanderequip',
                name: 'Demande_de_réquiperation',
                type: 'link',
                icon: 'note_add'
              }
        ,{
          state: 'list_missions',
          name: 'list_missions',
          type: 'link',
          icon: 'playlist_add_check'
        }
              , 
            );
          } else if (role === "admin") {
            this.MENUITEMS.push(
              { state: 'add_mission', 
type: 'link', name: 'créer mission ',
 icon: 'work_outline' },
             
              { state: 'listconsultants', 
type: 'link', name: 'Liste du personnel ',
 icon: 'assignment_ind' },
 {
  state: 'les conges',
  name: 'liste des congés',
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
                icon: 'insert_invitation'
              },
              {
                state: 'projet',
                type: 'link',
                name: 'Projet',
                icon: 'work'
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
                state: 'birthdaytable',
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
                state: 'modifiersolde',
                name: 'Modifier Solde',
                type: 'link',
                icon: 'face'
              },
              {
                state: 'demanderequip',
                name: 'Demande_de_réquiperation',
                type: 'link',
                icon: 'note_add'
              },
              {
                state: 'RecupRH',
                name: 'Traiter les demandes de réquiperation',
                type: 'link',
                icon: 'face'
              },
              {
                state: 'list_missions',
                name: 'list_missions',
                type: 'link',
                icon: 'playlist_add_check'
              }
            );
          }

          else if (role === "Manager") {
            this.MENUITEMS.push(
             
             
              { state: 'listconsultants', 
type: 'link', name: 'Liste du personnel ',
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
                icon: 'insert_invitation'
              },
              {
                state: 'projet',
                type: 'link',
                name: 'Projet',
                icon: 'work'
              },
            
              {
                state: 'list-entretien',
                type: 'link',
                name: 'Entretiens',
                icon: 'elevator'
              },
              {
                state: 'birthdaytable',
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
              , {
                state: 'demanderequip',
                name: 'Demande_de_réquiperation',
                type: 'link',
                icon: 'note_add'
              }
            );}

            else if (role === "consultant" && grade=="Consultant_Senior") {
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
                  icon: 'insert_invitation'
                },
                {
                  state: 'projet',
                  type: 'link',
                  name: 'Projet',
                  icon: 'work'
                },
              
            
                {
                  state: 'birthdaytable',
                  type: 'link',
                  name: 'Anniversaire',
                  icon: '✺︎'
                },
            
                {
                  state: 'demanderequip',
                  name: 'Demande_de_réquiperation',
                  type: 'link',
                  icon: 'note_add'
                }
                ,{
                  state: 'listdemandes',
                  name: 'Liste des demandes de congés',
                  type: 'link',
                  icon: 'playlist_add_check'
                },
              );}

          console.log(this.MENUITEMS);
        },
        (error) => {
          console.error(error); // Gérez l'erreur de la requête
        }
      );
        },
        error => console.error(error)
      );
    }
  }

  getMenuitem(): Menu[] {
    return this.MENUITEMS;
  }
}
