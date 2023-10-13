import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './Authentication Service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
userProfile:any;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if (sessionStorage.getItem('jwt')) {
      this.authService.getUserProfile(localStorage.getItem('jwt')).subscribe(
        (userProfile) => {
          this.userProfile = userProfile;
        
         
          
        },
        (error) => console.error(error)
      );
    }
    
    const userRole = this.userProfile.role; 

    // Vérifiez si l'utilisateur a le rôle requis pour accéder à la route
    if (route.data && route.data.roles && route.data.roles.includes(userRole)) {
      return true;
    }

    // Redirigez vers la page d'accueil ou une page d'erreur si l'utilisateur n'a pas le bon rôle
    this.router.navigate(['/Error']); // Remplacez par la route de votre choix
    return false;
  }
}
