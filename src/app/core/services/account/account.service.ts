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
    console.log('accountService::login(). loginUser: ', login)
    return this.http.post(`${this.baseUrl}/account/login`, login, {withCredentials: true, observe: 'response'}).pipe(
      switchMap(() => {
        return this.getUserInfo();
      })
      // tap(() => {
      //   this.getUserInfo().subscribe();
      // })
    );
  }

  register(register: RegisterUser){
    return this.http.post(`${this.baseUrl}/account/register`, register, {withCredentials: true});
  }

  getUserInfo(){
    console.log('accountService::getUserInfo() called');
    return this.http.get<RegisterUser>(`${this.baseUrl}/account/user-info`, {withCredentials: true}).pipe(
      tap(user => {
        if(user){
          console.log('getUserInfo(). user: ', user)
          this.setUserHintCookie(user.email);
          this.currentUser.set(user)
        }
        else {
            this.setUserHintCookie(null);
            this.currentUser.set(null);
          }
      })
    );
  }

  logout(){
    return this.http.post(`${this.baseUrl}/account/logout`, {}, {withCredentials: true});
  }

  private setUserHintCookie(email: string | null) {
    const name = 'bb_user';
    document.cookie = email
      ? `${name}=${encodeURIComponent(
          email
        )}; Path=/; Max-Age=2592000; SameSite=None; Secure`
      : `${name}=; Path=/; Max-Age=0; SameSite=None; Secure`;
  }

  private readUserHintCookie(): string | null {
    const m = document.cookie.match(/(?:^|;\s*)bb_user=([^;]+)/);
    return m ? decodeURIComponent(m[1]) : null;
  }

  // Called on the client very early (see AppComponent below)
  primeFromCookie() {
    const email = this.readUserHintCookie();
    if (email) {
      const user = this.currentUser() ?? ({} as RegisterUser);
      this.currentUser.set({ ...user, email } as RegisterUser);
    }
    else {
      // Important for prerender: mark as "loaded and logged-out" on the client
      this.currentUser.set(null);
    }
  }

}
