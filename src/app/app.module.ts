import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/component/header/header.component';
import { FooterComponent } from './shared/component/footer/footer.component';
import { UsersComponent } from './pages/users/users.component';
import { TableComponent } from './shared/component/table/table.component';
import { ReversePipe } from './shared/pipe/reverse/reverse.pipe';
import { CapitalizePipe } from './shared/pipe/capitalize/capitalize.pipe';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { UsersService } from './pages/users/users.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UsersComponent,
    TableComponent,
    ReversePipe,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    NgxSmartModalModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [
    UsersService,
    FormBuilder,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
