import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../model/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // LoginService(req: LoginRequest) {
  //   throw new Error('Method not implemented.');
  // }
  constructor(private http: HttpClient) {}

  login(req: LoginRequest) {
    return this.http.post<LoginResponse>('https://reqres.in/api/login', req);
  }
}
