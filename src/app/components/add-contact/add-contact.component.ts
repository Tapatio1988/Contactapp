import { Component, OnInit, ViewChild } from '@angular/core';

import { Contact } from '../../models/Contact'
import { FlashMessagesService } from 'angular2-flash-messages'
import {ContactService} from "../../services/contact.service"
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  contact: Contact = {
    Name: '',
    Email: '',
    Phone: ''
  }
  @ViewChild('contactForm') form: any;



  constructor(
    private flashMessage: FlashMessagesService,
    private contactService: ContactService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onSubmit({value, valid}: {value: Contact, valid: boolean}) {

    if(!valid){
      //show error
      this.flashMessage.show('Failed to add Contact: Invalid Form', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else{
      //Add new Contact
      this.contactService.newContact(value);

      this.flashMessage.show('New Contact Created', {
        cssClass: 'alert-success', timeout: 4000
      });

      this.router.navigate(['/']);
    }
  }

}
