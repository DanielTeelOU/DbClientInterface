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
  MatPaginatorModule
} from '@angular/material';

import { DialogBoxxComponent } from './dialog-boxx/dialog-boxx.component';
import { TableFilteringComponent } from './table-filtering/table-filtering.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogBoxxComponent,
    TableFilteringComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule
  ],
  entryComponents: [
    DialogBoxxComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
