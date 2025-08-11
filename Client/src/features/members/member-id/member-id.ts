import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { filter } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AgePipe } from '../../../core/pipes/age-pipe';
import { MemberService } from '../../../core/services/member-service';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-member-id',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, AgePipe],
  templateUrl: './member-id.html',
  styleUrl: './member-id.css'
})
export class MemberId implements OnInit {

  private route = inject(ActivatedRoute)
  private router = inject(Router)
  protected title = signal<string | undefined>('Profile')
  protected accountService = inject(AccountService)
  protected memberService = inject(MemberService)
  protected isCurrentUser = computed(
    ()=> this.accountService.currentUser()?.id == this.route.snapshot.paramMap.get('id')
  )
  
  ngOnInit(): void {
    this.title.set(this.route.firstChild?.snapshot?.title);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe({
      next: () => {
        this.title.set(this.route.firstChild?.snapshot?.title);
      }
    })
  }
}
