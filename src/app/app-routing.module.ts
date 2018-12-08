import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router'

import { AddContactComponent } from './components/add-contact/add-contact.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { ContactsComponent} from './components/contacts/contacts.component'
import { DetailContactComponent } from './components/detail-contact/detail-contact.component'
import { EditContactComponent } from './components/edit-contact/edit-contact.component'
import { NotFoundComponent } from './components/not-found/not-found.component'


const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'contact/add', component: AddContactComponent},
  {path: 'contact/edit/:id', component: EditContactComponent},
  {path: 'contact/detail/:id', component: DetailContactComponent},
  {path: '**', component: NotFoundComponent},


]

@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
