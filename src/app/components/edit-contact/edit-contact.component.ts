import { Component, OnInit } from '@angular/core';
import {ContactService } from '../../services/contact.service'
import { Router, ActivatedRoute, Params,} from '@angular/router'
import { FlashMessagesService } from 'angular2-flash-messages'
import { Contact } from '../../models/Contact'



@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  id: string;
  contact: Contact = {
    Name: '',
    Email: '',
    Phone: ''
  }

  

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id']
    this.contactService.getContact(this.id).subscribe(contact => this.contact = contact)
  }
 
  onSubmit({value, valid}: {value: Contact, valid: boolean}){
    if(!valid) {
      this.flashMessage.show('Invalid Form', {
        cssClass: 'alert-danger', timeout: 4000
      })
    } else {
      value.id = this.id

      this.contactService.updateContact(value);
      this.flashMessage.show('Success', {
        cssClass: 'alert-success', timeout: 4000
      })
      this.router.navigate(['/'])
    }
  }



}
