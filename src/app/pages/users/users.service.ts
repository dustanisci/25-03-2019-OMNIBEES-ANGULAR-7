import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/shared/model/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public getAllUsers(url: string): Observable<any> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(url, { headers: headers });
  }

  public postUser(url: string, user: User): Observable<any> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post(url, user, { headers: headers });
  }

  public updateUser(url: string, user: User): Observable<any> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.put(`${url}/user/${user._id}`, user, { headers: headers });
  }

  public deleteUser(url: string, id: string): Observable<any> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.delete(`${url}/user/${id}`, { headers: headers });
  }

}
