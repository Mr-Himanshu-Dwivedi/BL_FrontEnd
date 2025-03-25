import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressBookComponent } from './components/address-book/address-book.component';

const routes: Routes = [
  { path: '', redirectTo: '/address-book', pathMatch: 'full' },  // Default route
  { path: 'address-book', component: AddressBookComponent } // Main Page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
