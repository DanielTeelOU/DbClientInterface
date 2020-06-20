import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';
import { UpDataService } from './services/data2.service';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { TableFilteringComponent } from './table-filtering/table-filtering.component';
import { HomeComponent } from './home/home.component';
import { MessagingComponent } from './messaging/messaging.component';
import { SupportComponent } from './support/support.component';
import { GithubupdatesComponent } from './githubupdates/githubupdates.component';
import { AddComponent } from './dialogs/add/add.component';
import { DeleteComponent } from './dialogs/delete/delete.component';
import { EditComponent } from './dialogs/edit/edit.component';
import { CommentInfoComponent } from './dialogs/comment-info/comment-info.component';
import { ApipopupComponent } from './dialogs/apipopup/apipopup.component';

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
    CommentInfoComponent,
    ApipopupComponent
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
