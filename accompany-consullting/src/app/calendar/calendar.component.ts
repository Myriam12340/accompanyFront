import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ConsultantService } from '../Model/consultant/consultant.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  template: `
  <h2>Notifications</h2>
  <ul>
    <li *ngFor="let consultant of consultants">{{ consultant.nom }} - {{ consultant.dateNaissance | date:'dd/MM/yyyy' }}</li>
  </ul>
`
})
export class CalendarComponent implements OnInit {
  consultants: any[] = [];



  constructor(private consultantService: ConsultantService) { }

  ngOnInit() {
    this.consultantService.getConsultantlist().subscribe(data => {
      this.consultants = data;
    });
  }
}