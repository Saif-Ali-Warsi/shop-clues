import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {

  isLoading = signal(false);

  show() {
    this.isLoading.set(true);
    
    if (this.isLoading()) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  hide() {
    this.isLoading.set(false)
    document.body.classList.remove('no-scroll');
  }

}
