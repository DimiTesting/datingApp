import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { errorInterceptor } from '../../core/interceptors/error-interceptor';

@Component({
  selector: 'app-test-errors',
  imports: [],
  templateUrl: './test-errors.html',
  styleUrl: './test-errors.css'
})
export class TestErrors {
  protected httpClient = inject(HttpClient);
  private baseUrl = "https://localhost:5001/api/";
  validationErrors = signal<string[]>([])

  getServerError()
  {
    this.httpClient.get(this.baseUrl + "buggy/server-error").subscribe({
      next: response => console.log(response),
      error: error=> console.log(error)
    })
  }

  getAuthError()
  {
    this.httpClient.get(this.baseUrl + "buggy/auth").subscribe({
      next: response => console.log(response),
      error: error=> console.log(error)
    })
  }

  getNotFoundError()
  {
    this.httpClient.get(this.baseUrl + "buggy/not-found").subscribe({
      next: response => console.log(response),
      error: error=> console.log(error)
    })
  }
  
  getBadRequest()
  {
    this.httpClient.get(this.baseUrl + "buggy/bad-request").subscribe({
      next: response => console.log(response),
      error: error=> console.log(error)
    })
  }

  getValidationError()
  {
    this.httpClient.post(this.baseUrl + "account/register", {}).subscribe({
      next: response => console.log(response),
      error: error=> {
        this.validationErrors.set(error)
      }
    })
  }
}
