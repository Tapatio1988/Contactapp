import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs'
import { map } from "rxjs/operators";
import { Contact } from '../models/Contact'



@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactCollection: AngularFirestoreCollection<Contact>;
  contactDoc: AngularFirestoreDocument<Contact>;
  contacts: Observable<Contact[]>;
  contact: Observable<Contact>;


  constructor(private afs: AngularFirestore) { 
    this.contactCollection = this.afs.collection('contact',
    ref => ref.orderBy('Name', 'desc'));
  }

  getContacts(): Observable<Contact[]> {
    this.contacts = this.contactCollection.snapshotChanges().pipe(
      map(changes => changes.map(action => {
        const data = action.payload.doc.data() as Contact;
        data.id = action.payload.doc.id;
        return data;
      })
    ));

    return this.contacts
  }


  newContact(contact: Contact) {
    this.contactCollection.add(contact);
  }

  getContact(id: string): Observable<Contact> {
    this.contactDoc = this.afs.doc<Contact>(`contact/${id}`);
    this.contact = this.contactDoc.snapshotChanges().pipe(map(action => {
      if(action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Contact;
        data.id = action.payload.id;
        return data;
      }
    }));

    return this.contact;
  }

  updateContact(contact: Contact) {
    this.contactDoc = this.afs.doc(`contact/${contact.id}`)
    this.contactDoc.update(contact)
  }

  deleteContact(contact: Contact) {
    this.contactDoc = this.afs.doc(`contact/${contact.id}`)
    this.contactDoc.delete();
  }
}
