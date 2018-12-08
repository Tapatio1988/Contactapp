import { Component, OnInit } from '@angular/core';
import {ContactService } from '../../services/contact.service'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { FlashMessagesService } from 'angular2-flash-messages'
import { Contact } from '../../models/Contact'

@Component({
  selector: 'app-detail-contact',
  templateUrl: './detail-contact.component.html',
  styleUrls: ['./detail-contact.component.css']
})
export class DetailContactComponent implements OnInit {
  id: string;
  contact: Contact;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.getContactDetails();
   
  }
  private getContactDetails(){
    this.contactService.getContact(this.id).subscribe(contact => {
      console.log(contact)
      this.contact = contact;
    });
  }

}
