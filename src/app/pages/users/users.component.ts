import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users: User[];
  public formGroupUser: FormGroup;

  constructor(
    private usersService: UsersService,
    private spinner: NgxSpinnerService,
    public ngxSmartModalService: NgxSmartModalService,
    private formBuilder: FormBuilder,
    public user: User) { }

  ngOnInit() {
    this.getUsers();
    this.formUser();
  }

  public formUser() {
    this.formGroupUser = this.formBuilder.group({
      id: this.formBuilder.control('', []),
      name: this.formBuilder.control('', [Validators.required, Validators.pattern(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/)]),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      cpf: this.formBuilder.control('', [Validators.pattern(/^[0-9]*$/), Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    });
  }

  public setValueFormUser() {
    this.user._id = this.formGroupUser.value.id;
    this.user.cpf = this.formGroupUser.value.cpf;
    this.user.email = this.formGroupUser.value.email;
    this.user.name = this.formGroupUser.value.name;
  }

  public receiveSettingEmitted(event) {
    this.ngxSmartModalService.resetModalData('createEdit');
    if (event.setting === 'edit') {
      this.formGroupUser.controls['id'].setValue(event.user._id);
      this.formGroupUser.controls['name'].setValue(event.user.name);
      this.formGroupUser.controls['cpf'].setValue(event.user.cpf);
      this.formGroupUser.controls['email'].setValue(event.user.email);
      this.ngxSmartModalService.setModalData('edit', 'createEdit');
      return this.ngxSmartModalService.getModal('createEdit').open();
    }
    this.formGroupUser.controls['id'].setValue(event._id);
    return this.ngxSmartModalService.getModal('delete').open();
  }

  public getUsers(): void {
    this.spinner.show();
    this.usersService.getAllUsers(environment.users)
      .subscribe(
        result => {
          this.users = result;
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        },
        error => {
          this.ngxSmartModalService.getModal('fail').open();
        }
      );
  }

  public postUser(): void {
    this.spinner.show();
    this.setValueFormUser();
    this.usersService.postUser(environment.users, this.user)
      .subscribe(
        result => {
          this.ngxSmartModalService.getModal('createEdit').close();
          this.getUsers();
          setTimeout(() => {
            this.spinner.hide();
            this.ngxSmartModalService.getModal('success').open();
          }, 1000);
        },
        error => {
          this.ngxSmartModalService.getModal('fail').open();
        }
      );
  }

  public updateUser(): void {
    this.spinner.show();
    this.setValueFormUser();
    this.usersService.updateUser(environment.users, this.user)
      .subscribe(
        result => {
          this.ngxSmartModalService.getModal('createEdit').close();
          this.getUsers();
          setTimeout(() => {
            this.spinner.hide();
            this.ngxSmartModalService.getModal('success').open();
          }, 1000);
        },
        error => {
          this.ngxSmartModalService.getModal('fail').open();
        }
      );
  }

  public deletetUser(): void {
    this.spinner.show();
    this.setValueFormUser();
    this.usersService.deleteUser(environment.users, this.user._id)
      .subscribe(
        result => {
          this.ngxSmartModalService.getModal('delete').close();
          this.getUsers();
          setTimeout(() => {
            this.spinner.hide();
            this.ngxSmartModalService.getModal('success').open();
          }, 1000);
        },
        error => {
          this.ngxSmartModalService.getModal('fail').open();
        }
      );
  }

}
