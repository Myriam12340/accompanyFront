import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  template: '',
})
export class CalendarComponent {
  calendarPlugins = [dayGridPlugin];
  calendarEvents = [
    { title: 'Événement 1', start: '2023-04-01' },
    { title: 'Événement 2', start: '2023-04-05' },
  ];


  constructor() {
    // Importer les plugins requis ici


  }
}
