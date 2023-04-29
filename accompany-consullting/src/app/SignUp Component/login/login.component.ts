import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/service/Authentication Service/auth.service";
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html', 
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidlogin : boolean = false ;
  constructor(private http: HttpClient, private router: Router , private authService: AuthService) {}


  login(form : NgForm){


    const credentials ={
  
      'email': form.value.email ,
      'password' : form.value.password
    }
    this.http.post("http://localhost:60734/api/auth/login",credentials).subscribe(response=>{
    const token =(<any> response).token;
    localStorage.setItem("jwt",token);
    sessionStorage.setItem("jwt",token);
    
    this.invalidlogin = false;
    console.log('ok');
    this.router.navigate(["/home"]);
  
    }, err => {this.invalidlogin = true})




  }
}