import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { 
  MatTableModule, 
  MatDialogModule, 
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSortModule,
  MatPaginator,
  MatPaginatorModule,
  MatIconModule,
  MatSelectModule,
  MatMenuModule,
  MatTabsModule,
  MatRippleModule,
  MatExpansionModule
} from '@angular/material';

import { TableFilteringComponent } from './table-filtering/table-filtering.component';
import { AddComponent } from './add/add.component';
import { HomeComponent } from './home/home.component';
import { MessagingComponent } from './messaging/messaging.component';
import { SupportComponent } from './support/support.component';

@NgModule({
  declarations: [
    AppComponent,
    TableFilteringComponent,
    AddComponent,
    HomeComponent,
    MessagingComponent,
    SupportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
    MatRippleModule,
    MatExpansionModule
  ],
  entryComponents: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
