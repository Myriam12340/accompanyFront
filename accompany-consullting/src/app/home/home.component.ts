import { OnInit, Component } from '@angular/core';
import { User } from '../Model/user';
import { TokenStorageService } from '../service/Authentication Service/token-storage-service.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/Authentication Service/auth.service';
import { Consultant } from '../Model/consultant';
import { ConsultantService } from '../Model/consultant/consultant.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { FichierService } from '../service/fichier.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent  {
    userProfile: any;
    email : string ;
    username : any ;
    id : any ;
    role:any ;
    user: any ;
    imgurl: SafeResourceUrl;
    showPdf: boolean = false;
    photo:any;
    showPasswordFields: boolean = false; // Nouvelle variable

    currentPassword: string = '';
  newPassword: string = '';
  constructor(private fichieservice:FichierService,private sanitizer: DomSanitizer,private http: HttpClient,private authService: AuthService , private consultantservice: ConsultantService,) { }
  togglePasswordFields(): void {
    this.showPasswordFields = !this.showPasswordFields;
    // Réinitialisez les champs lorsque vous basculez l'affichage
    this.currentPassword = '';
    this.newPassword = '';
  }
  ngOnInit(): void {
    const token = this.authService.getToken();
    console.log(localStorage.getItem("jwt"));
    if (sessionStorage.getItem("jwt")) {
      this.authService.getUserProfile(localStorage.getItem("jwt")).subscribe(
        userProfile => {
          this.userProfile = userProfile;
          this.username = userProfile.userName;
          this.email = userProfile.email;
          this.id = userProfile.id;
          this.role = userProfile.role ;
          console.log(this.id);
          console.log(this.role);





          this.consultantservice.getConsultantbyemail(this.email).subscribe(
            (user) => {
              this.user = user;
              this.photo = this.user.photo;
              this.fichieservice.downloadimage(this.photo).subscribe(
                (response: any) => {
                  this.imgurl = this.fichieservice.createBlobphoto(response);
                },
                (error) => {
                  console.error(error);
                }
              );
            });


            console.log("urrrrrrl",this.photo);
          




        },
        error => console.error(error)
      );


    }

  }
  updatePassword(): void {
    const userId =   this.id ; // Remplacez par l'ID de l'utilisateur
    
    this.authService.updatePassword(userId, this.currentPassword, this.newPassword)
      .subscribe(
        () => {
          console.log('Mot de passe mis à jour avec succès.');
          // Réinitialisez les champs après la mise à jour réussie
          this.currentPassword = '';
          this.newPassword = '';
          // Gérez les messages de succès ici
        },
        error => {
          console.error('Erreur lors de la mise à jour du mot de passe:', error);
          // Gérez les erreurs ici
        }
      );
  }

  logout() {
    // Call logout method from auth service
    this.authService.logout();
  }
}