import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';
import { themes } from './themes';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav implements OnInit{

  protected accountService = inject(AccountService)
  protected toastService = inject(ToastService)
  private router = inject(Router)
  protected creds: any = {}
  protected themes = themes;
  protected selectedTheme = signal<string>(localStorage.getItem('theme') || "light")

  handleSelectedTheme(theme: string)
  {
    document.documentElement.setAttribute(`data-theme`, theme);
    this.selectedTheme.set(theme);
    localStorage.setItem('theme', theme)
    const elem = document.activeElement as HTMLDivElement;
    if (elem) elem.blur();
  }

  ngOnInit(): void {
    document.documentElement.setAttribute(`data-theme`, this.selectedTheme());
  }

  login() {
    this.accountService.login(this.creds).subscribe({
      next: () => {
        this.router.navigateByUrl("/members")
        this.toastService.success('Successfully logged in')
      },
      error: error => {
        console.log(error);
        this.toastService.error(error.error)
      }
    })
  }

  logout() {
    this.accountService.logout()
    this.router.navigateByUrl("/")
  }
}
