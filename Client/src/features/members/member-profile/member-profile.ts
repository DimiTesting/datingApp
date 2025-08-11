import { Component, HostListener, inject, OnDestroy, OnInit, signal, ViewChild, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditableMember, Member } from '../../../types/member';
import { DatePipe } from '@angular/common';
import { MemberService } from '../../../core/services/member-service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastService } from '../../../core/services/toast-service';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe, FormsModule],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css'
})
export class MemberProfile implements OnInit, OnDestroy {
  @ViewChild('editForm') editForm?: NgForm; 
  @HostListener('window:beforeunload', ['$event']) notify($event:BeforeUnloadEvent) {
    if(this.editForm?.dirty)
    {
      $event.preventDefault();
    }
  }

  protected accountService = inject(AccountService)
  protected route = inject(ActivatedRoute)
  protected memberService = inject(MemberService)
  private toast = inject(ToastService)
  public editableMember : EditableMember = {
      displayName : '', 
      city : '', 
      country : '', 
      description : '',  
    }

  ngOnInit(): void {

    this.editableMember = {
      displayName : this.memberService.member()?.displayName || '', 
      city : this.memberService.member()?.city || '', 
      country : this.memberService.member()?.country || '', 
      description : this.memberService.member()?.description || '', 
    }
  }

  ngOnDestroy(): void {
    if(this.memberService.editClicked()) {
      this.memberService.editClicked.set(false);
    }
  }

  updateProfile()
  {
    if(!this.memberService.member()) return;
    const updatedMember = {...this.memberService.member(), ...this.editableMember}
    this.memberService.updateMember(this.editableMember).subscribe({
      next: () => {

        const user = this.accountService.currentUser();
        console.log(user?.displayName)

        if(user && user.displayName !== updatedMember.displayName)
        {
          user.displayName = updatedMember.displayName;
          this.accountService.setCurrentUser(user)
        }

        this.toast.success('Profile updated successfully');
        this.memberService.editClicked.set(false);
        this.memberService.member.set(updatedMember as Member);
        this.editForm?.reset(updatedMember);
      }
    })
  }

}
