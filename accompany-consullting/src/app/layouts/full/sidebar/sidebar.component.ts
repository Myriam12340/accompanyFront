import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/Authentication Service/auth.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy {
  nom : any;
  mobileQuery: MediaQueryList;
  userProfile: any;

  private _mobileQueryListener: () => void;

  constructor(private authService: AuthService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems
    , private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit() {
    if (sessionStorage.getItem("jwt")) {
      this.authService.getUserProfile(localStorage.getItem("jwt")).subscribe(
        userProfile => {
          this.userProfile = userProfile;
          console.log(this.userProfile);
          this.nom = userProfile.userName;
        },
        error => console.error(error)
      );
    }
    
  console.log(this.nom);
  
  
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
 
  logout() {
    // Call logout method from auth service
    this.authService.logout();
  }
  home(){
    this.router.navigate(['/home'])
  }
}
