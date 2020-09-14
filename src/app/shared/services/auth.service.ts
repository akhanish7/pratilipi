import { Injectable } from '@angular/core';

import { Users } from '../../users';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  res: Users;

  loginVerify(username: string, password: string): Observable<any> {
    return this.http.post(
      '/signin',
      { username: username, password: password },
      { observe: 'response' }
    );
  }

  signUpUser(
    username: string,
    email: string,
    password: string
  ): Observable<any> {
    return this.http.post(
      '/signup',
      {
        username: username,
        email: email,
        password: password,
      },
      { observe: 'response' }
    );
  }
}
