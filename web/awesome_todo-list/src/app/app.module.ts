import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewTaskDialogComponent } from './components/dialogs/new-task-dialog/new-task-dialog.component';
import { EditTaskDialogComponent } from './components/dialogs/edit-task-dialog/edit-task-dialog.component';
import { DashboardToolbarComponent } from './components/toolbars/dashboard-toolbar/dashboard-toolbar.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent, NewTaskDialogComponent, EditTaskDialogComponent, DashboardToolbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
