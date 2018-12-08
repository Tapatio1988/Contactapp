import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service'

import { Contact } from '../../models/Contact'

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.getContacts().subscribe(contacts => this.contacts = contacts);
  }

}
