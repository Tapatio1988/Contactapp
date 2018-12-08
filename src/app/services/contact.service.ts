import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, from } from 'rxjs'
import { map } from 'rxjs/operators'
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
    return this.contactCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data()
          const id = a.payload.doc.id
          return { id, ...data }
      }),  
    ),
    )
  }

  newContact(contact: Contact) {
    return from(this.contactCollection.add(contact).then(data => data.id))
  }

  getContact(id: string): Observable<any> {
    return this.contactCollection.doc(id).valueChanges()
  }

  updateContact(contact: Contact) {
    this.contactDoc = this.afs.doc(`contact/detail/${contact.id}`)
    this.contactDoc.update(contact)
  }

  deleteContact(contact: Contact) {
    this.contactDoc = this.afs.doc(`contact/detail/${contact.id}`)
  }
}
