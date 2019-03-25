import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { TableComponent } from 'src/app/shared/component/table/table.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { UsersService } from './users.service';
import { User } from 'src/app/shared/model/user';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { TextMaskModule } from 'angular2-text-mask';
import { ReversePipe } from 'src/app/shared/pipe/reverse/reverse.pipe';
import { CapitalizePipe } from 'src/app/shared/pipe/capitalize/capitalize.pipe';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        NgxPaginationModule,
        NgxSpinnerModule,
        NgxSmartModalModule.forRoot(),
        ReactiveFormsModule,
        TextMaskModule
      ],

      declarations: [
        UsersComponent,
        TableComponent,
        ReversePipe,
        CapitalizePipe
      ],

      providers: [
        UsersService,
        FormBuilder,
        User
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
