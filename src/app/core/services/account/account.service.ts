import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { RegisterUser } from '../../models/user/register';
import { LoginUser } from '../../models/user/login';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl: string = environment.apiUrl;
  currentUser = signal<RegisterUser | null>(null);
  private http = inject(HttpClient);

  login(login: LoginUser){
    return this.http.post(`${this.baseUrl}/account/login`, {login}, {withCredentials: true, observe: 'response'}).pipe(
      switchMap(() => {
        return this.getUserInfo();
      }),
      tap(() => {
        this.getUserInfo().subscribe();
      })
    );
  }

  getUserInfo(){
    return this.http.get<RegisterUser>(`${this.baseUrl}/account/user-info`, {withCredentials: true}).pipe(
      tap(user => {
        this.currentUser.set(user)
      })
    );
  }

  logout(){
    return this.http.post(`${this.baseUrl}/account/logout`, {}, {withCredentials: true});
  }
}
