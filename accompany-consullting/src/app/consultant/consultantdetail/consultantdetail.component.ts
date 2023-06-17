import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Consultant } from '../../Model/consultant';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-consultantdetail',
  templateUrl: './consultantdetail.component.html',
  styleUrls: ['./consultantdetail.component.css']
})
export class ConsultantdetailComponent implements OnInit {

  consultant: any;
  formattedDate: string;
day : string ;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any ) { 
    this.consultant = data.consultant;

  }

  ngOnInit(): void {
   
    
  }

  dateconvert(date:any):String{
     
    this.consultant.date_integration =new Date(date);
     this.day = this.consultant.date_integration.getDay()+'-'+this.consultant.date_integration.getMonth()+'-'+this.consultant.date_integration.getFullYear();
    
    return this.consultant.date_integration.getDay()+'-'+this.consultant.date_integration.getMonth()+'-'+this.consultant.date_integration.getFullYear() ;
  }  
  

  // Formater la date en utilisant moment.js


}
