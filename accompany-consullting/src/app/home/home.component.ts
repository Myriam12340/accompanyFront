import { OnInit, Component } from '@angular/core';
import { User } from '../Model/user';
import { TokenStorageService } from '../service/Authentication Service/token-storage-service.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/Authentication Service/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent  {
    userProfile: any;
    email : string ;
    username : any ;
    id : any ;

  constructor(private authService: AuthService) { }

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
          console.log(this.id);

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