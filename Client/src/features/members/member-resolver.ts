import { ResolveFn, Router } from '@angular/router';
import { Member } from '../../types/member';
import { inject } from '@angular/core';
import { MemberService } from '../../core/services/member-service';
import { EMPTY } from 'rxjs';

export const memberResolver: ResolveFn<Member> = (route, state) => {

  const router = inject(Router)
  const memberService = inject(MemberService)

  const id = route.paramMap.get('id') || ''

  if(!id)
  {
    router.navigateByUrl('/not-found');
    return EMPTY;
  }

  return memberService.getMember(id);
};
