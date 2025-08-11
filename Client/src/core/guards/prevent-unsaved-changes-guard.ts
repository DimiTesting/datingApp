import { CanDeactivateFn } from '@angular/router';
import { MemberProfile } from '../../features/members/member-profile/member-profile';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberProfile> = (component) => {
  
  if(component.editForm?.dirty) {
    return confirm('The changes you planing to make will not be saved.');
  }

  return true;
};
