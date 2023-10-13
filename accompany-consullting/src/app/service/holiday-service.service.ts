import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HolidayService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://date.nager.at/api/v3/PublicHolidays';

  getTunisianHolidays(year: number): Observable<any[]> {
    const url = `${this.apiUrl}/${year}/TN`;
    return this.http.get<any[]>(url);
  }
}
