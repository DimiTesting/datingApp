import { Component, inject, OnInit, signal } from '@angular/core';
import { filter } from 'rxjs';
import { Member } from '../../../types/member';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AgePipe } from '../../../core/pipes/age-pipe';

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
  public member = signal<Member | undefined>(undefined)

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => this.member.set(data['member'])
    })
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
