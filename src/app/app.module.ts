import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';
import { UpDataService } from "./services/data2.service";

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
  MatExpansionModule,
  MatCardModule,
  MatToolbarModule,
  MatDividerModule
} from '@angular/material';

import { TableFilteringComponent } from './table-filtering/table-filtering.component';
import { HomeComponent } from './home/home.component';
import { MessagingComponent } from './messaging/messaging.component';
import { SupportComponent } from './support/support.component';
import { GithubupdatesComponent } from './githubupdates/githubupdates.component';
import { AddComponent } from './dialogs/add/add.component';
import { DeleteComponent } from './dialogs/delete/delete.component';
import { EditComponent } from './dialogs/edit/edit.component';
import { CommentInfoComponent } from './dialogs/comment-info/comment-info.component';

@NgModule({
  declarations: [
    AppComponent,
    TableFilteringComponent,
    HomeComponent,
    MessagingComponent,
    SupportComponent,
    GithubupdatesComponent,
    AddComponent,
    DeleteComponent,
    EditComponent,
    CommentInfoComponent
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
    MatExpansionModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatDividerModule
  ],
  entryComponents: [
    AddComponent,
    DeleteComponent,
    EditComponent,
    CommentInfoComponent
  ],
  providers: [DataService, UpDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
