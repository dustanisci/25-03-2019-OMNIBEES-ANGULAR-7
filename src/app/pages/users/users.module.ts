import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersService } from './users.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReversePipe } from 'src/app/shared/pipe/reverse/reverse.pipe';
import { CapitalizePipe } from 'src/app/shared/pipe/capitalize/capitalize.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { TableComponent } from 'src/app/shared/component/table/table.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { TextMaskModule } from 'angular2-text-mask';
import { User } from 'src/app/shared/model/user';

@NgModule({
  declarations: [
    UsersComponent,
    TableComponent,
    ReversePipe,
    CapitalizePipe,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    NgxSmartModalModule.forRoot(),
    ReactiveFormsModule,
    TextMaskModule
  ],
  providers : [
    UsersService,
    FormBuilder,
    User
  ]
})
export class UsersModule { }
