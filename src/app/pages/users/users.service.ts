import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/shared/model/user';
import { ApiService } from 'src/app/shared/api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService) { }

  public getAllUsers(): Observable<User[]> {
    return this.apiService.get(environment.users);
  }

  public insertUser(user: User): Observable<void> {
    return this.apiService.post(environment.users, user);
  }

  public updateUser(user: User): Observable<void> {
    return this.apiService.put(`${environment.users}/user`, user._id, user);
  }

  public deleteUser(id: string): Observable<void> {
    return this.apiService.delete(`${environment.users}/user`, id);
  }

}
