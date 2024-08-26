import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewTaskDialogComponent } from './components/dialogs/new-task-dialog/new-task-dialog.component';
import { EditTaskDialogComponent } from './components/dialogs/edit-task-dialog/edit-task-dialog.component';
import { DashboardToolbarComponent } from './components/toolbars/dashboard-toolbar/dashboard-toolbar.component';
import { TaskContentComponent } from './components/task-content/task-content.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AuthService } from './services/auth.service';
import {
  CorsInterceptor,
  HttpRequestInterceptor,
  TokenInterceptor,
} from './services/auth.interceptor';
import { RegisterComponent } from './components/pages/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NewTaskDialogComponent,
    EditTaskDialogComponent,
    DashboardToolbarComponent,
    TaskContentComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
