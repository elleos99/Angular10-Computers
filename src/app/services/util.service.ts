import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  isLogged = new Subject<boolean>();
  constructor() {}

  saveToken(token: string) {
    localStorage.setItem('Token', token);
    this.isLogged.next(true);
  }
  getToken(): string | null {
    return localStorage.getItem('Token');
  }
  deleteToken() {
    localStorage.removeItem('Token');
    this.isLogged.next(false);
  }
}
