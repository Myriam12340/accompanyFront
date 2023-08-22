import { OnInit, Component } from '@angular/core';
import { User } from '../Model/user';
import { TokenStorageService } from '../service/Authentication Service/token-storage-service.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/Authentication Service/auth.service';
import { Consultant } from '../Model/consultant';
import { ConsultantService } from '../Model/consultant/consultant.service';

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

  constructor(private authService: AuthService , private consultantservice: ConsultantService,) { }

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
            console.log("utlisateur",this.user);
            });







        },
        error => console.error(error)
      );


    }

  }

  logout() {
    // Call logout method from auth service
    this.authService.logout();
  }
}