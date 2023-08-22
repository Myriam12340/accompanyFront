import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/service/Authentication Service/auth.service";
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html', 
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidlogin : boolean = false ;
  constructor(private http: HttpClient, private router: Router , private authService: AuthService,private dialog: MatDialog) {}

  login(form: NgForm) {
    const credentials = {
      'email': form.value.email,
      'password': form.value.password
    };
  
    this.http.post("http://localhost:60734/api/auth/login", credentials).subscribe(
      response => {
        const token = (<any>response).token;
        localStorage.setItem("jwt", token);
        sessionStorage.setItem("jwt", token);
  
        this.authService.getUserProfile(token).subscribe(
          userProfile => {
            const role = userProfile.role;
  
            if (role === "admin") {
              this.router.navigate(['/dash']); // Redirect to '/conge' for admin
            } else {
              this.router.navigate(['/home']); // Redirect to '/home' for other roles
            }
          },
          error => {
            console.error(error);
            // Handle error if unable to get user profile
          }
        );
  
        this.invalidlogin = false;
      },
      err => {
        this.invalidlogin = true;
  
        // Open the error popup
        this.openErrorPopup('Email ou mot de passe incorrect. ');
      }
    );
  }
  
  
  openErrorPopup(errorMessage: string): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
    
      data: { message: errorMessage }
    });
  }
  
}
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  template:  `
  <div class="pop-up box">
    <button mat-button class="close-button" (click)="dialogRef.close()">
      <span>&times;</span>
    </button>
    <h3>Error ⚠️</h3>
    <p>{{ data.message }}</p>
    <button mat-raised-button color="primary" class="button" (click)="dialogRef.close()">Close</button>
  </div>
`,
styles: [
  `
      .pop-up {
      width: 400px; /* Adjust the width as needed */
      padding: 20px;
      text-align: center;
      margin-left: auto;
      margin-right: auto;
      position: relative;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.1);
    }

    .button {
      font-family: 'Asap', sans-serif;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  text-transform: uppercase;
  width: 80px;
  border: 0;
  padding: 10px 15px ;
  margin-top: 10px;
  margin-left: -10px;
  border-radius: 5px;
  background-color:#0077ff ;
  transition: background-color 300ms;
    }

    .button:hover {
      background-color: #7CCF29;
      box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.1);
    }

    .close-button {
      transition: all 0.5s ease;
      position: absolute;
      background-color: #385170;
      padding: 1.5px 7px;
      left: 0;
      margin-left: -10px;
      margin-top: -9px;
      border-radius: 50%;
      border: 2px solid #fff;
      color: white;
      box-shadow: -3px 1px 6px 0px rgba(0, 0, 0, 0.1);
    }

    .close-button:hover {
      background-color: tomato;
      color: #fff;
    }

    h3 {
      text-align: center;
      padding-top: 15px;
      padding-bottom: 15px;
      color: #fff;
      background-color: #385170;
    }

    p {
      padding: 20px 65px 10px 65px;
      color: dimgray;
    }
    `
  ]
})
export class ErrorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}
}
