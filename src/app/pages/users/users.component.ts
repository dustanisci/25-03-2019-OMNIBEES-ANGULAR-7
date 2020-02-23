import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSmartModalService, NgxSmartModalComponent } from 'ngx-smart-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/model/user';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Crud } from 'src/app/shared/enum/crud';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users: User[] = new Array<User>();
  public user: User = new User();
  public formGroupUser: FormGroup;
  public actionCrud = Crud;

  constructor(
    private usersService: UsersService,
    private spinner: NgxSpinnerService,
    public ngxSmartModalService: NgxSmartModalService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getUsers();
    this.formUser();
  }

  public formUser() {
    this.formGroupUser = this.formBuilder.group({
      id: this.formBuilder.control('', []),
      name: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/)
      ]),
      email: this.formBuilder.control('', [
        Validators.required,
        Validators.email
      ]),
      cpf: this.formBuilder.control('', [
        Validators.pattern(/^[0-9]*$/),
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)
      ]),
    });
  }

  public setValueFormUser(): void {
    this.user._id = this.formGroupUser.value.id;
    this.user.cpf = this.formGroupUser.value.cpf;
    this.user.email = this.formGroupUser.value.email;
    this.user.name = this.formGroupUser.value.name;
  }

  public receiveSettingEmitted(event?): NgxSmartModalComponent {
    this.ngxSmartModalService.resetModalData('createEdit');
    if (event && event.setting === Crud.Edit) {
      this.formGroupUser.controls['id'].setValue(event.user._id);
      this.formGroupUser.controls['name'].setValue(event.user.name);
      this.formGroupUser.controls['cpf'].setValue(event.user.cpf);
      this.formGroupUser.controls['email'].setValue(event.user.email);
      this.ngxSmartModalService.setModalData(Crud.Edit, 'createEdit');
      return this.ngxSmartModalService.getModal('createEdit').open();
    }

    if (event && event.setting === Crud.Delete) {
      this.formGroupUser.controls['id'].setValue(event._id);
      return this.ngxSmartModalService.getModal('delete').open();
    }

    this.ngxSmartModalService.setModalData(Crud.Create, 'createEdit');
    this.formUser();
    return this.ngxSmartModalService.getModal('createEdit').open();
  }

  public getUsers(): Observable<Subscription> {
    this.spinner.show();
    return of(this.usersService.getAllUsers()
      .subscribe(
        (result: User[]) => {
          this.users = result;
          this.spinner.hide();
        },
        () => {
          this.spinner.hide();
          this.ngxSmartModalService.getModal('fail').open();
        }
      ));
  }


  public insertUser(): void {
    this.spinner.show();
    this.setValueFormUser();
    this.usersService.insertUser(this.user).pipe(switchMap(() => this.getUsers())).subscribe(() => {
      this.ngxSmartModalService.getModal('createEdit').close();
      this.spinner.hide();
      this.ngxSmartModalService.getModal('success').open();
    }, () => {
      this.spinner.hide();
      this.ngxSmartModalService.getModal('fail').open();
    });
  }


  public updateUser(): void {
    this.spinner.show();
    this.setValueFormUser();

    this.usersService.updateUser(this.user).pipe(switchMap(() => this.getUsers())).subscribe(() => {
      this.ngxSmartModalService.getModal('createEdit').close();
      this.spinner.hide();
      this.ngxSmartModalService.getModal('success').open();
    }, () => {
      this.spinner.hide();
      this.ngxSmartModalService.getModal('fail').open();
    });
  }


  public deletetUser(): void {
    this.spinner.show();
    this.setValueFormUser();
    this.usersService.deleteUser(this.user._id).pipe(switchMap(() => this.getUsers())).subscribe(() => {
      this.ngxSmartModalService.getModal('delete').close();
      this.spinner.hide();
      this.ngxSmartModalService.getModal('success').open();
    }, () => {
      this.spinner.hide();
      this.ngxSmartModalService.getModal('fail').open();
    });
  }

}
