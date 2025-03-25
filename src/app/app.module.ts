import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  // ✅ Import this
import { MatTableModule } from '@angular/material/table'; 
import { AppRoutingModule } from './app-routing.module';

import { MatDialogModule } from '@angular/material/dialog';  
import { MatInputModule } from '@angular/material/input';  
import { MatButtonModule } from '@angular/material/button';  
import { MatIconModule } from '@angular/material/icon';  

import { AddressBookComponent } from './components/address-book/address-book.component';
import { AddPersonComponent } from './components/add-person/add-person.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AddressBookComponent,
    AddPersonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,  // ✅ Add this
    FormsModule,          // ✅ Add this (optional, but good for template-driven forms)
    MatTableModule, 
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
