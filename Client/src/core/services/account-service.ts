import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginCreds, RegisterCreds, User } from '../../types/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  private http = inject(HttpClient);
  private url : string = "https://localhost:5001/api/";
  currentUser = signal<User | null>(null) 

  register(creds: RegisterCreds)
  {
    return this.http.post<User>(this.url + "account/register", creds).pipe(
      tap(user => {
        if(user) {
          this.setCurrentUser(user)
        }
      })
    )
  }

  login(creds: LoginCreds)
  {
    return this.http.post<User>(this.url + "account/login", creds).pipe(
      tap(user => {
        if(user) {
          this.setCurrentUser(user)
        }
      })
    )
  }

  logout()
  {
    this.currentUser.set(null)
    localStorage.removeItem("user")
  }

  private setCurrentUser(user: User)
  { 
    this.currentUser.set(user)
    localStorage.setItem("user", JSON.stringify(user))
  }
}
