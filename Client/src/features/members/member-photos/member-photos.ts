import { Component, inject } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { Observable } from 'rxjs';
import { Photo } from '../../../types/member';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-member-photos',
  imports: [AsyncPipe],
  templateUrl: './member-photos.html',
  styleUrl: './member-photos.css'
})
export class MemberPhotos {
  protected memberService = inject(MemberService)
  protected photo$?: Observable<Photo[]>
  protected route = inject(ActivatedRoute)

  constructor()
  {
    const memberId = this.route.parent?.snapshot.paramMap.get('id')
    if(memberId)
    {
      this.photo$ = this.memberService.getMemberPhotos(memberId); 
    }
  }
}
