import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { ConsultantService } from 'src/app/Model/consultant/consultant.service';
import { Consultant } from '../Model/consultant';
import { ConsultantModule } from '../Model/consultant/consultant.module';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EmailMessage } from '../Model/email-message';
import { MailService } from '../service/mail.service';
import { AuthService } from '../service/Authentication Service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HolidayService } from '../service/holiday-service.service';
import { MatDialog } from '@angular/material/dialog';
import { PasswordDialogComponent } from '../parametres/password-dialog/password-dialog.component';

@Component({
  selector: 'app-anniversaire',
  templateUrl: './anniversaire.component.html',
  styleUrls: ['./anniversaire.component.css']
})
export class AnniversaireComponent implements OnInit, AfterViewInit {
 translationMap = {
    'New Year\'s Day': 'Jour de l\'An',
  
    'Revolution and Youth Day':'Journée de la Révolution et de la Jeunesse',
    'Independence Day':'Jour de l indépendance',
    "Martyrs' Day":'Journée des martyrs',
    'Labour Day':'Fête du Travail',
    "Women's Day":'Journée de la femme',
    "Victory Day":"Jour de la victoire"
    ,
    "Republic Day":"Jour de la République",
    "Eid El Jala'":"Eid El Jala'"
    // Ajoutez d'autres traductions ici...
  };




  joursFeries: any[] = []; // Définissez joursFeries comme un tableau vide par défaut

year :any;
emailrh:any;

 userProfile: any;
  consultants: Consultant[];
  birthdayConsultants: Consultant[] = [];
  integration: Consultant[] = [];
  anni: string;
  dataSource = new MatTableDataSource();
  consultants_cl: Consultant[];
  events: CalendarEvent[] = [];
  email: EmailMessage = {
    fromName: '',
    fromEmail: '',
    toName: '',
    toEmail: '',
    subject: '',
    body: '',
    CcEmail:''
    ,CcName:'',     UserEmail:''

  };
  type:any;
  constructor(private dialog: MatDialog,   private holidayService: HolidayService,private _snackBar: MatSnackBar,private authService: AuthService,private consultantService: ConsultantService,private emailService: MailService) {}
  sendEmail() {
    this.emailService.sendEmailsanscc(this.email).subscribe(
      () => {
        console.log('Email sent successfully');
        // Faites ce que vous devez faire lorsque l'e-mail est envoyé avec succès

      },
      (error) => {
        console.log('Error sending email:', error);
        // Faites ce que vous devez faire en cas d'erreur lors de l'envoi de l'e-mail
      }
    );
  }
  ngAfterViewInit() {
    this.initCalendar();
  }

  ngOnInit() {
    this.consultantService.getConsultantlist().subscribe(
      (data: ConsultantModule[]) => {
        this.consultants = data;
        console.log(this.consultants);
        this.filterConsultants();
        this.dataSource.data = this.consultants;
        this.loadCalendarEvents(); // Chargez les événements du calendrier après avoir reçu les données
      },
      (error) => {
        console.log('An error occurred while retrieving the consultants list: ', error);
      }
    );



    this.authService.getUserProfile(localStorage.getItem('jwt')).subscribe(
      (userProfile) => {
        this.userProfile = userProfile;
        console.log(this.userProfile);

     this.emailrh = this.userProfile.email;
console.log(this.emailrh);
       
      },
      (error) => console.error(error)
    );

    const currentYear = new Date().getFullYear();
    console.log("year",currentYear);
    this.year= currentYear;
    this.loadHolidays(this.year);
    

    this.email.fromName = "RH Accompany Consulting";
  }

  loadHolidays(year: number) {
    this.holidayService.getTunisianHolidays(year).subscribe(
      (data) => {
        // Stockez tous les jours fériés, qu'ils soient payés ou non, dans la même liste (joursFeries)
        this.joursFeries = data;
        console.log(this.joursFeries);
        this.loadCalendarEvents();
      },
      (error) => {
        console.error('Error fetching Tunisian holidays:', error);
      }
    );


    
  }

  
  loadCalendarEvents() {
    const currentDate = moment().format('MM-DD');
    const entrepriseAnniversaryEvent = {
      title: "Anniversaire de l'entreprise",
      date: `${this.year}-04-17`, // Utilisez la date de l'anniversaire de l'entreprise
      className: 'entreprise-anniversary',
      eventColor: '#FF5733', // Couleur de votre choix
    };
    // Créez des événements pour les jours fériés non payés
    const joursFeriesPayesEvents = this.joursFeries.map((jourFerie) => {
      const [day, month] = jourFerie.date.split('-').map((part) => parseInt(part, 10));
      return {
        title: this.translationMap[jourFerie.localName] || jourFerie.localName,
        date:moment(jourFerie.date).format('YYYY-MM-DD'),
        className: 'jour-ferie-paye',
        eventColor: 'blue',
      };
    });
  
    // Créez des événements pour les jours fériés non payés
 
    // Créez des événements pour les anniversaires
    const birthdayEvents = this.consultants
      .filter((consultant) => {
        const birthdate = moment(consultant.date_naissance).format('MM-DD');
        return birthdate === currentDate;
      })
      .map((consultant) => {
        return {
          title: `${consultant.nom} ${consultant.prenom} Anniversaire 🎁 `,
          date: moment().format('YYYY-MM-DD'),
          className: 'personal-birthday',
          eventColor: '#339AB0',
          consultantId: consultant.id,
       

        };
           
      });
  
    // Créez des événements pour les intégrations
    const integrationEvents = this.consultants
      .filter((consultant) => {
        const integration = moment(consultant.date_integration).format('MM-DD');
        return integration === currentDate;
      })
      .map((consultant) => {
        return {
          title: `${consultant.nom} ${consultant.prenom} Integration`,
          date: moment().format('YYYY-MM-DD'),
          className: 'pro-integration',
          eventColor: '#C70039',
          consultantId: consultant.id,
        };
      });
  
    this.events = [
      ...joursFeriesPayesEvents,
      entrepriseAnniversaryEvent, // Ajoutez l'événement de l'anniversaire de l'entreprise ici

      ...birthdayEvents,
      ...integrationEvents,
    ];
  
    this.initCalendar();
  }
  
  
  initCalendar() {
    const calendarEl = document.getElementById('calendar');
    if (calendarEl) {
      const calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        eventDidMount: (info) => {
          if (info.event.classNames) {
            if (info.event.classNames.includes('personal-birthday')) {
              info.el.style.backgroundColor = info.event.extendedProps.eventColor; // Couleur pour les anniversaires personnels
            } else if (info.event.classNames.includes('pro-integration')) {
              info.el.style.backgroundColor = info.event.extendedProps.eventColor; // Couleur pour les intégrations professionnelles
            } else if (info.event.classNames.includes('jour-ferie-non-paye')) {
              info.el.style.backgroundColor = info.event.extendedProps.eventColor; // Couleur pour les jours fériés non payés
            } else if (info.event.classNames.includes('jour-ferie-paye')) {
              info.el.style.backgroundColor = info.event.extendedProps.eventColor; // Couleur pour les jours fériés payés
            }
          }
        },
        events: this.events,
        eventClick: (info) => {
          const consultantId = info.event.extendedProps.consultantId;
          this.type = info.event.extendedProps.eventColor; // Affectez la valeur de className à la variable de classe type
          this.openConsultantDetails(consultantId, this.type);
          console.log("typpppe", this.type);
        },
      });
      calendar.render();
    } else {
      console.error('Element with ID "calendar" not found.');
    }
  }
  
  async openConsultantDetails(consultantId: number, className: string) {
    // Recherchez le consultant par identifiant
    const consultant = this.consultants.find((c) => c.id === consultantId);
  
    if (consultant) {
      // Affichez les détails du consultant dans une fenêtre modale ou une autre interface utilisateur
      console.log(`Consultant: ${consultant.nom} ${consultant.prenom} ${consultant.mail}`);
     
      this.email.toEmail = consultant.mail;
      this.email.toName = consultant.nom + " " + consultant.prenom;

     
      console.log('Meeem :',    this.email.fromEmail);
      // Générez le contenu du courriel en fonction du type d'événement
    
          // Vous pouvez utiliser le mot de passe saisi ici
       
          console.log('Mot de passe saisi2 :', this.email.UserEmail);
  
          let body = '';
  
             if (className === '#339AB0') {
        this.email.subject = 'Anniversaire personnel💬';
        body = `
        <div style="color: #333; font-family: Arial, sans-serif;">
        <p>Cher(e) ${consultant.nom} ${consultant.prenom},</p>
        <p>En ce jour spécial, toute l'équipe de Accompany Consulting  vous souhaite un joyeux anniversaire ! 🎉</p>
        <p>Que cette nouvelle année de votre vie soit remplie de bonheur, de succès et de réalisations. Nous sommes honorés de faire partie de votre voyage professionnel et espérons que cette année sera la meilleure de toutes.</p>
        <p>Passez une journée fantastique entouré de vos proches, et n'oubliez pas de profiter de votre gâteau d'anniversaire ! 🎂</p>
        <p>Encore une fois, joyeux anniversaire ! 🥳</p>
        <p>Cordialement,</p>
        <p>Votre équipe Accompany Consulting</p>
      </div>
        `;
      } else if (className === '#C70039') {
        this.email.subject = 'Anniversaire professional 💬';

        body = `
        <div style="color: #333; font-family: Arial, sans-serif;">
        <p>Cher(e) ${consultant.nom} ${consultant.prenom},</p>
        <p>En ce jour spécial, nous célébrons votre intégration au sein de notre équipe ! 🎉</p>
        <p>Nous sommes ravis de vous avoir parmi nous et nous espérons que votre parcours au sein de Accompany Consulting sera rempli de réussites et d'opportunités.</p>
        <p>N'hésitez pas à poser des questions, à partager vos idées et à contribuer à notre culture d'entreprise en croissance.</p>
        <p>Encore une fois, bienvenue parmi nous ! 🥳</p>
        <p>Cordialement,</p>
        <p>Votre équipe Accompany Consulting</p>
      </div>
    `;
      }
  
          this.email.body = body;
  
          try {
            // ...
            await this.sendEmail();
  
            // Si l'e-mail a été envoyé avec succès, affichez le snackbar de succès
            this._snackBar.open('L\'e-mail a été envoyé avec succès', 'Fermer', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          } catch (error) {
            // Une erreur s'est produite lors de l'envoi de l'e-mail, vous pouvez gérer l'erreur ici si nécessaire
            console.error("Une erreur s'est produite lors de l'envoi de l'e-mail : ", error);
  
            // Vous pouvez également afficher un message d'erreur ici si vous le souhaitez
            this._snackBar.open('Erreur lors de l\'envoi de l\'e-mail', 'Fermer', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          }
       
      
     
    } else {
      // Gérez le cas où le consultant n'est pas trouvé
      console.error(`Consultant not found for id: ${consultantId}`);
    }
  }
  

  displayedColumns: string[] = [
    'nom',
    'prenom',
    'email',
    'telephone',
    'date_naissance',
    'date_integration',
    'anniversaire'
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

interface CalendarEvent {
  
  title: string;
  date: string;
  className: string;
  eventColor: string;
}
