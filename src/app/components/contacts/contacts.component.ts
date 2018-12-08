import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service'
import { Router } from '@angular/router'
import { FlashMessagesService } from 'angular2-flash-messages'
import { Contact } from '../../models/Contact'

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];
  data: Contact;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private flashMessage: FlashMessagesService
    ) { }

  ngOnInit() {

    this.contactService.getContacts().subscribe(contacts => this.contacts = contacts);

  }

  onDeleteClick(id: string) {
    this.contactService.getContact(id).subscribe(data => { this.data = data; console.log(data)})
    this.contactService.deleteContact(this.data);
    this.flashMessage.show('Contact Removed', {
    cssClass:'alert-success', timeout: 4000
    });
    this.router.navigate(['/']);
    
  }
}
