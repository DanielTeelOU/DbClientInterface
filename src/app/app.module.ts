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
  MatIconModule
} from '@angular/material';

import { TableFilteringComponent } from './table-filtering/table-filtering.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

@NgModule({
  declarations: [
    AppComponent,
    TableFilteringComponent,
    DialogBoxComponent
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
    MatIconModule
  ],
  entryComponents: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
