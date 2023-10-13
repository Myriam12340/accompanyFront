import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Consultant } from 'src/app/Model/consultant';
import { ConsultantModule } from 'src/app/Model/consultant/consultant.module';
import { ConsultantService } from 'src/app/Model/consultant/consultant.service';

@Component({
  selector: 'app-anniversairetable',
  templateUrl: './anniversairetable.component.html',
  styleUrls: ['./anniversairetable.component.css']
})
export class AnniversairetableComponent implements OnInit {
  consultants: Consultant[];
  birthdayConsultants: Consultant[] = [];
  integration: Consultant[] = [];
  anni: string;
  dataSource = new MatTableDataSource();

  constructor(private consultantService: ConsultantService) {}

  ngOnInit() {
    this.consultantService.getConsultantlist().subscribe(
      (data: ConsultantModule[]) => {
        this.consultants = data;
        this.filterConsultants();
        this.dataSource.data = this.consultants;
      },
      (error) => {
        console.log('An error occurred while retrieving the consultants list: ', error);
      }
    );
  }


  displayedColumns: string[] = [
    'nom',
    'prenom',
    'email',
    'telephone',
    'date_naissance',
    'date_integration','anniversaire'
  ];

  filterConsultants() {
    if (this.consultants) {
      const today = moment().format('MM-DD');
      const filteredConsultants = this.consultants.filter((consultant: ConsultantModule) => {
        const birthdate = moment(consultant.date_naissance).format('MM-DD');
        const integration = moment(consultant.date_integration).format('MM-DD');

        if (birthdate === today && integration === today) {
          consultant.isPro = true;
          consultant.isBirthday = true;
        } else if (birthdate === today) {
          consultant.isBirthday = true;
        } else if (integration === today) {
          consultant.isPro = true;
        }

        return consultant.isBirthday || consultant.isPro;
      });
      this.birthdayConsultants = filteredConsultants;
    }
  }
}
