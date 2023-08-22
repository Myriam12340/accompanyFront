import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashadmin',
  templateUrl: './dashadmin.component.html',
  styleUrls: ['./dashadmin.component.css']
})
export class DashadminComponent implements OnInit {
  zoomedSection: string | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
