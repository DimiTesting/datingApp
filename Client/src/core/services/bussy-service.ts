import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BussyService {
  public count = signal(0);

  busy()
  {
    this.count.update(count => count + 1);
  }

  idle()
  {
    this.count.update(count => Math.max(count - 1));
  }

}
