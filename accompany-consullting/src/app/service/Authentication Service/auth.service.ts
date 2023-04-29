import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/Model/user';


interface UserProfile {
  id: string;
  email: string;
  userName : String ;
}

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly apiUrl = 'http://localhost:60734/api/auth';
  private readonly tokenKey = 'jwt';

  constructor(private http: HttpClient, private router: Router) { }

  register(email: string, password: string, role: string, username: string) {
    return this.http.post(`${this.apiUrl}/register`, { email, password, role, username });
  }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response: { token: string; }) => {
          localStorage.setItem(this.tokenKey, response.token);
        })
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return localStorage.getItem(this.tokenKey) !== null;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return token !== null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  

  getUserProfile(token: string | null): Observable<UserProfile> {
    if (!token) {
      // Gérer le cas où le token est manquant
      return throwError('Token missing');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<UserProfile>(`${this.apiUrl}/profile`, { headers });
  }

  getUser(val:any ){
    return this.http.get(this.apiUrl,val);
  }

  getUserByEmail(email: string): Observable<User> {
    const url = `http://localhost:60734/api/auth/email/${email}`;
    return this.http.get<User>(url);
  }
}
