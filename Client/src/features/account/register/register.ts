import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../types/user';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  accountService = inject(AccountService)
  cancelRegister = output<boolean>();
  protected creds: any = {}

  register() {
    this.accountService.register(this.creds).subscribe({
      next: response => {
        console.log(response)
        this.cancel()
      },
      error: error => console.log(error)
    })
  }

  cancel()
  {
    this.cancelRegister.emit(false)
  }
}
