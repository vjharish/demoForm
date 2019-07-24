import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { formComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatNativeDateModule, MatSelectModule, MatTable, MatTableModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { demoForm } from '/home/ameex/orbita/demoForm/src/app/demoForm.service'
import { HttpModule } from '@angular/http';
import { listComponent } from './listComponent/list.component';

const appRoutes: Routes = [
  { path: 'Form', component: formComponent },
  { path: 'Edit/:uid', component: formComponent },
  { path: 'List', component: listComponent },
];


@NgModule({
  declarations: [
    AppComponent, formComponent, listComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule, ReactiveFormsModule,
    BrowserAnimationsModule, MatButtonModule, MatCheckboxModule,
    MatInputModule, MatNativeDateModule, MatSelectModule,
    MatDatepickerModule, HttpModule, MatTableModule
  ],
  providers: [demoForm],
  bootstrap: [AppComponent]
})
export class AppModule { }
