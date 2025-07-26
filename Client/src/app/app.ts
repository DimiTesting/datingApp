import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { Nav } from '../layout/nav/nav';
import { AccountService } from '../core/services/account-service';
import { Home } from "../features/home/home";
import { User } from '../types/user';

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http : HttpClient = inject(HttpClient);
  private accountService = inject(AccountService);
  protected readonly title = 'Dating App';
  protected members = signal<User[]>([])

  ngOnInit(): void {
    this.http.get<User[]>('https://localhost:5001/api/members').subscribe({
      next: response => this.members.set(response),
      error: error => console.log(error),
      complete: () => console.log('Completed http request')
    })

    this.setCurrentUser();
  }

  setCurrentUser()
  {
    const userString = localStorage.getItem("user");
    if (!userString) return; 
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }
}
